/**
 * 该文件用于编写Spawn的相关代码
 */

/**
 * Spawn的Banner
 * @param SpawnName
 * @constructor
 */
export function Spawn_banner(SpawnName){
    if(Game.spawns[SpawnName].spawning){
        Game.spawns[SpawnName].room.visual.text(
            '🛠️' + Game.creeps[Game.spawns[SpawnName].spawning.name].memory.role,
            Game.spawns[SpawnName].pos.x + 1,
            Game.spawns[SpawnName].pos.y,
            {align: 'left', opacity: 0.8});
    }
}

/**
 * Spawn的Creep刷新器，用于刷新creep的寿命
 * @param creep
 * @param SpawnName
 * @constructor
 */
export function RenewCreep(creep, SpawnName) {
    // 如果不在Spawning 那么可以直接开始
    if (Game.spawns[SpawnName].spawning){

    }
}

/**
 * Spawn的创造creep的函数
 * @param role
 */
