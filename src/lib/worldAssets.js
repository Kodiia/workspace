export let availableAssets = [
    {
        type: 'asset',
        number: 0,
        name: 'capsule1',
        url: '/nakagin_capsule_white.glb',
        imageUrl: '/worlds/images/capsule_white_axo.webp',
        state: 'selected',
        selected: true,
        color: 'red',
        getRotation(){
            return {x: 0, y: Math.PI/2 * Math.floor(Math.random()*4), z: 0}
        }
    },
    {
        type: 'asset',
        number: 1,
        name: 'capsule2',
        url: '/nakagin_capsule_color.glb',
        imageUrl: '/worlds/images/capsule_color_axo.webp',
        state: 'notSelected',
        selected: false,
        color: 'green',
        getRotation(){
            return {x: 0, y: Math.PI/2 * Math.floor(Math.random()*4), z: 0}
        }
    },
    {
        type: 'asset',
        number: 2,
        name: 'capsule3',
        url: '/nakagin_capsule_color_pink_trees.glb',
        imageUrl: '/worlds/images/capsule_color_pink_axo.webp',
        state: 'notSelected',
        selected: false,
        color: 'pink',
        getRotation(){
            return {x: 0, y: Math.PI/2 * Math.floor(Math.random()*4), z: 0}
        }
    }
]

console.log(availableAssets[0].getRotation())