import capsule_white_axo from '$lib/images/games/worlds/images/capsule_white_axo.webp'
import capsule_color_axo from '$lib/images/games/worlds/images/capsule_color_axo.webp'
import capsule_color_pink_axo from '$lib/images/games/worlds/images/capsule_color_pink_axo.webp'
import cube_white_axo from '$lib/images/games/worlds/images/cube_white_axo.webp'
import river_white_axo from '$lib/images/games/worlds/images/river_white_axo.webp'

export let availableAssets = [
    {
        type: 'asset',
        number: 0,
        name: 'capsule1',
        url: '/nakagin_capsule_white.glb',
        imageUrl: capsule_white_axo,
        state: 'notSelected',
        selected: false,
        color: 'red',
        getRotation(){
            return {x: 0, y: Math.PI/2 * Math.floor(Math.random()*4), z: 0}
        },
        speed: 0
    },
    {
        type: 'asset',
        number: 1,
        name: 'capsule2',
        url: '/nakagin_capsule_color.glb',
        imageUrl: capsule_color_axo,
        state: 'notSelected',
        selected: false,
        color: 'green',
        getRotation(){
            return {x: 0, y: Math.PI/2 * Math.floor(Math.random()*4), z: 0}
        },
        speed: 0
    },
    {
        type: 'asset',
        number: 2,
        name: 'capsule3',
        url: '/nakagin_capsule_color_pink_trees.glb',
        imageUrl: capsule_color_pink_axo,
        state: 'notSelected',
        selected: false,
        color: 'pink',
        getRotation(){
            return {x: 0, y: Math.PI/2 * Math.floor(Math.random()*4), z: 0}
        },
        speed: 0
    },
    {
        type: 'asset',
        number: 0,
        name: 'cube1',
        url: '/cube_white.glb',
        imageUrl: cube_white_axo,
        state: 'selected',
        selected: true,
        color: 'red',
        getRotation(){
            return {x: 0, y: Math.PI/2 * Math.floor(Math.random()*4), z: 0}
        },
        speed: 0
    },
    {
        type: 'asset',
        number: 0,
        name: 'river1',
        url: '/river_white.glb',
        imageUrl: river_white_axo,
        state: 'notSelected',
        selected: false,
        color: 'red',
        getRotation(){
            return {x: 0, y: Math.PI/2 * Math.floor(Math.random()*4), z: 0}
        },
        speed: 0
    }
]

// console.log(availableAssets[0].getRotation())