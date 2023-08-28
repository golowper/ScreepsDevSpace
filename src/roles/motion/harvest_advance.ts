import {Get_container} from "@/structure/container"

function findClosestSourceWithEnergy(creep: Creep): Source | null {
    const sourcesWithEnergy = creep.room.find(FIND_SOURCES, {
        filter: (source: Source) => source.energy > 0
    });

    if (sourcesWithEnergy.length > 0) {
        const closestSource = creep.pos.findClosestByRange(sourcesWithEnergy);
        return closestSource;
    }
    return null;
}

function Harvest_From_Container(creep:Creep):boolean {

    const container = Get_container(creep)
    if (container == undefined || container.store[RESOURCE_ENERGY] == 0){
        return false
    }
    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
}

function Harvest_From_Energy(creep:Creep):boolean {
    if(creep.memory.dst == null){
        const energy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        console.log("Debug:",creep.name,energy)
        if (energy == null || energy.pos.roomName != creep.pos.roomName){
            console.log("Can't find Energy!")
            return false
        }
        // console.log("Debug:",energy)
        creep.memory.dst = energy.id

    }
    console.log("Debug:",creep.name,creep.memory.dst)
    const energy = Game.getObjectById<Resource>(creep.memory.dst)
    console.log("Debug:",creep.name,energy)
    if(energy==undefined){
        // console.log("Can't find creep.dst Energy!")
        return false
    }
    // if (energy.pos != creep.pos) {
    //     creep.moveTo(energy, {visualizePathStyle: {stroke: '#ffaa00'}});
    // }
    // if(energy.pos == creep.pos){
    //     creep.memory.dst = null
    // }
    creep.say("Egy🤤")
    if(creep.pickup(energy) == ERR_NOT_IN_RANGE){
        creep.moveTo(energy, {visualizePathStyle: {stroke: '#ffaa00'}})
    }

}

export function Harvest_From_Storage(creep:Creep):boolean {
    const storage = creep.room.storage
    // console.log("DEBUG:trans",storage)
    if (storage == undefined || storage.store[RESOURCE_ENERGY] == 0){
        return false
    }
    if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
}

// 原始 Harvest 模式
export function Harvest_org(creep:Creep):boolean{
    // const source = creep.pos.findClosestByRange(FIND_SOURCES);
    const source = findClosestSourceWithEnergy(creep)
    if (source == undefined || source.energy == 0){
        return false
    }
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
    return true
}

/**

 *  Harvest 具有优先级
 *  先收集 掉落的energy
 *  再收集 container
 *  最后防止出问题，对resource本身直接harvest

 * **/
export function Harvest_advance(creep:Creep):void{
    if ( Harvest_From_Energy(creep) == false ){
        if( Harvest_From_Container(creep) == false){
            if(Harvest_org(creep)){
                // 触发原始harvest模式 , 报警
                creep.say("❗Warning❗")
                console.log(creep.memory.role,"Warning❗: 触发原始harvest模式")
            }
            // 无法收集资源报错
            creep.say("❗❗ERROR❗❗")
            console.log(creep.memory.role,"Error❗❗: 资源无法获取")

        }

    }

}
export function Harvest_Transporter(creep:Creep):void{
    if ( Harvest_From_Energy(creep) == false ){
        if( Harvest_From_Container(creep) == false){
            if(Harvest_From_Storage(creep) == false){
                if(Harvest_org(creep) == false){
                    // 触发原始harvest模式 , 报警
                    creep.say("❗Warning❗")
                    console.log(creep.memory.role,"Warning❗: 触发原始harvest模式")
                }
            }
            // 无法收集资源报错
            creep.say("❗❗ERROR❗❗")
            console.log(creep.memory.role,"Error❗❗: 资源无法获取")

        }

    }
}





