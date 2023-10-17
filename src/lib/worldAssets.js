export let availableAssets = [
    {
        type: 'asset',
        number: 0,
        name: 'capsule1',
        url: '/nakagin_capsule_white.glb',
        state: 'selected',
        selected: false,
        color: 'red',
        getRotation(){
            return {x: 0, y: Math.PI/2 * Math.floor(Math.random()*4), z: 0}
        }
    },
    {
        type: 'asset',
        number: 1,
        name: 'capsule2',
        url: '/nakagin_capsule_center_green.glb',
        state: 'notSelected',
        selected: false,
        color: 'green',
        rotation: {x: 0, y: Math.PI/2 * Math.floor(Math.random()*4), z: 0}
    }
]

console.log(availableAssets[0].getRotation())