<script lang="ts">
    import { T, useFrame } from '@threlte/core'
    import { OrbitControls, interactivity, InstancedMesh, Instance, useGltf, InstancedMeshes, GLTF } from '@threlte/extras'
	import { scale } from 'svelte/transition';
	import { Mesh, BufferGeometry, MeshStandardMaterial, AxesHelper, HemisphereLight } from 'three';
    import { width, height, selectedAsset, assetOptionsPanelDisplay, worldData } from '$lib/store';

    import { spring } from 'svelte/motion'
	//import { InstancedMesh, PerspectiveCamera } from 'three';
    // import nakagin_wall from '$lib/models/nakagin_wall.glb'

    interactivity()

    let rotation = 0
    useFrame((state, delta) => {
        // rotation += delta

        for (let asset of assetsData){
            if(asset.loop != ''){
                try {
                    eval(asset.loop);
                } catch (error) {
                    console.error(error);
                }
            }
        }
    })


    let selectedModels = [
        {
            type: 'asset',
            number: 0,
            url: '/nakagin_capsule_center.glb'
        },
        {
            type: 'asset',
            number: 1,
            url: '/nakagin_capsule_center_green.glb'
        }
    ]

    let assetsMeshes = []
    let loadedAssets = 0
    let modelsLoaded = false

    let walls = []
    let roofs = []
    let slabs = []
    
    let loadedWallModels = 0
    let loadedRoofModels = 0
    let loadedSlabModels = 0

    async function loadModels(){
        for(let model of selectedModels){
            let loadedModel = useGltf(model.url).then(
                result => {
                    // if(model.type === 'wall'){
                    //     loadedWallModels++
                    //     walls.push(new Mesh(result.scene.children[0].geometry, result.scene.children[0].material))
                    // } else if (model.type === 'roof'){
                    //     loadedRoofModels++
                    //     roofs.push(new Mesh(result.scene.children[0].geometry, result.scene.children[0].material))
                    // } else if (model.type === 'slab'){
                    //     loadedSlabModels++
                    //     slabs.push(new Mesh(result.scene.children[0].geometry, result.scene.children[0].material))
                    // }
                    loadedAssets++
                    // assets.push(new Mesh(result.scene.children[0].geometry, result.scene.children[0].material))
                    assetsMeshes = [...assetsMeshes, new Mesh(result.scene.children[0].geometry, result.scene.children[0].material)]
                }
            )
        }
        
    }
    loadModels()

    let thescale = 1.0
    let color = 'white'
    


    let assetsData = []
    export let cells = []
    export let widthNum = 100
    export let depthNum = 10
    export let heightNum = 10

    function generateCells(widthNum, depthNum, heightNum){
    for(let i=0; i<widthNum; i++){
        cells[i] = []
        for(let j=0; j<depthNum; j++){
            cells[i][j] = []
            for(let k=0; k<heightNum; k++){
                if(Math.random()>0.5){
                    cells[i][j][k] = {
                        aliveNow: true,
                        aliveNext: false,
                        liveNeighbors: 0,
                        aliveNeighborXpos: false,
                        aliveNeighborXneg: false,
                        aliveNeighborYpos: false,
                        aliveNeighborYneg: false,
                        aliveNeighborZpos: false,
                        aliveNeighborZneg: false,
                        x: i,
                        y: k, 
                        z: j,
                        thisColor: '#ffffff',
                        roofType: Math.floor(Math.random()*roofs.length),
                        xPosWallType: Math.floor(Math.random()*walls.length),
                        xNegWallType: Math.floor(Math.random()*walls.length),
                        zPosWallType: Math.floor(Math.random()*walls.length),
                        zNegWallType: Math.floor(Math.random()*walls.length),
                        slabType: Math.floor(Math.random()*slabs.length),
                        asset: Math.floor(Math.random()*selectedModels.length),
                    }
                } else {
                    cells[i][j][k] = {
                        aliveNow: false,
                        aliveNext: false,
                        liveNeighbors: 0,
                        aliveNeighborXpos: false,
                        aliveNeighborXneg: false,
                        aliveNeighborYpos: false,
                        aliveNeighborYneg: false,
                        aliveNeighborZpos: false,
                        aliveNeighborZneg: false,
                        x: i,
                        y: k, 
                        z: j,
                        thisColor: '#ffffff',
                        roofType: Math.floor(Math.random()*roofs.length),
                        xPosWallType: Math.floor(Math.random()*walls.length),
                        xNegWallType: Math.floor(Math.random()*walls.length),
                        zPosWallType: Math.floor(Math.random()*walls.length),
                        zNegWallType: Math.floor(Math.random()*walls.length),
                        slabType: Math.floor(Math.random()*slabs.length),
                        asset: Math.floor(Math.random()*selectedModels.length),
                    }
                }
            }
        
        // if(Math.random() > 0.5){
        //   cells[i][j] = {
        //     aliveNow: true,
        //     aliveNext: false,
        //     liveNeighbours: 0
        //   }
        // } else {
        //   cells[i][j] = {
        //     aliveNow: false,
        //     aliveNext: false,
        //     liveNeighbours: 0
        //   }
        // }
        
        // if(i == 0 && j == 0 || i === width-1 && j === height-1 || i === 0 && j === height-1 || i === width-1 && j === 0){
        //     cells[i][j] = {
        //     aliveNow: true,
        //     aliveNext: false,
        //     liveNeighbours: 0
        //     }
        // } else {
        //     cells[i][j] = {
        //     aliveNow: false,
        //     aliveNext: false,
        //     liveNeighbours: 0
        //     }
        // }

        }
    }
    }


    function cellIsAliveNextGeneration(){
    for(let i=0; i<cells.length; i++){
        for(let j=0; j<cells[i].length; j++){
            for(let k=0; k<cells[i][j].length; k++){
            cells[i][j][k].liveNeighbors = 0

            if(typeof cells[i-1] != 'undefined'){
                if(typeof cells[i-1][j-1] != 'undefined'){
                    if(typeof cells[i-1][j-1][k-1] != 'undefined' && cells[i-1][j-1][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i-1][j-1][k] != 'undefined' && cells[i-1][j-1][k].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i-1][j-1][k+1] != 'undefined' && cells[i-1][j-1][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                }

                if(typeof cells[i-1][j] != 'undefined'){
                    if(typeof cells[i-1][j][k-1] != 'undefined' && cells[i-1][j][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i-1][j][k] != 'undefined' && cells[i-1][j][k].aliveNow){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborXneg = true
                    } else {
                        cells[i][j][k].aliveNeighborXneg = false
                    }
                    if(typeof cells[i-1][j][k+1] != 'undefined' && cells[i-1][j][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                }

                if(typeof cells[i-1][j+1] != 'undefined'){
                    if(typeof cells[i-1][j+1][k-1] != 'undefined' && cells[i-1][j+1][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i-1][j+1][k] != 'undefined' && cells[i-1][j+1][k].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i-1][j+1][k+1] != 'undefined' && cells[i-1][j+1][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                }
            }

            if(typeof cells[i] != 'undefined'){
                if(typeof cells[i][j-1] != 'undefined'){
                    if(typeof cells[i][j-1][k-1] != 'undefined' && cells[i][j-1][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i][j-1][k] != 'undefined' && cells[i][j-1][k].aliveNow){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborZneg = true
                    } else {
                        cells[i][j][k].aliveNeighborZneg = false
                    }
                    if(typeof cells[i][j-1][k+1] != 'undefined' && cells[i][j-1][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                }

                if(typeof cells[i][j] != 'undefined'){
                    if(typeof cells[i][j][k-1] != 'undefined' && cells[i][j][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborYneg = true
                    } else {
                        cells[i][j][k].aliveNeighborYneg = false
                    }
                    // if(typeof cells[i][j][k] != 'undefined' && cells[i][j][k].aliveNow){
                    //     cells[i][j][k].liveNeighbors++
                    // }
                    if(typeof cells[i][j][k+1] != 'undefined' && cells[i][j][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborYpos = true
                    } else {
                        cells[i][j][k].aliveNeighborYpos = false
                    }
                }

                if(typeof cells[i][j+1] != 'undefined'){
                    if(typeof cells[i][j+1][k-1] != 'undefined' && cells[i][j+1][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i][j+1][k] != 'undefined' && cells[i][j+1][k].aliveNow){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborZpos = true
                    } else {
                        cells[i][j][k].aliveNeighborZpos = false
                    }
                    if(typeof cells[i][j+1][k+1] != 'undefined' && cells[i][j+1][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                }
            }

            if(typeof cells[i+1] != 'undefined'){
                if(typeof cells[i+1][j-1] != 'undefined'){
                    if(typeof cells[i+1][j-1][k-1] != 'undefined' && cells[i+1][j-1][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i+1][j-1][k] != 'undefined' && cells[i+1][j-1][k].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i+1][j-1][k+1] != 'undefined' && cells[i+1][j-1][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                }

                if(typeof cells[i+1][j] != 'undefined'){
                    if(typeof cells[i+1][j][k-1] != 'undefined' && cells[i+1][j][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i+1][j][k] != 'undefined' && cells[i+1][j][k].aliveNow){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborXpos = true
                    } else {
                        cells[i][j][k].aliveNeighborXpos = false
                    }
                    if(typeof cells[i+1][j][k+1] != 'undefined' && cells[i+1][j][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                }

                if(typeof cells[i+1][j+1] != 'undefined'){
                    if(typeof cells[i+1][j+1][k-1] != 'undefined' && cells[i+1][j+1][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i+1][j+1][k] != 'undefined' && cells[i+1][j+1][k].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i+1][j+1][k+1] != 'undefined' && cells[i+1][j+1][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                }
            }

                // if(typeof cells[i-1] != 'undefined' && cells[i-1][j][k].aliveNow){
                //     cells[i][j][k].liveNeighbors++
                //     cells[i][j][k].aliveNeighborXneg = true
                // } else {
                //     cells[i][j][k].aliveNeighborXneg = false
                // }
                // if(typeof cells[i+1] != 'undefined' && cells[i+1][j][k].aliveNow){
                //     cells[i][j][k].liveNeighbors++
                //     cells[i][j][k].aliveNeighborXpos = true
                // } else {
                //     cells[i][j][k].aliveNeighborXpos = false
                // }
                // if(typeof cells[i][j-1] != 'undefined' && cells[i][j-1][k].aliveNow){
                //     cells[i][j][k].liveNeighbors++
                //     cells[i][j][k].aliveNeighborZneg = true
                // } else {
                //     cells[i][j][k].aliveNeighborZneg = false
                // }
                // if(typeof cells[i][j+1] != 'undefined' && cells[i][j+1][k].aliveNow){
                //     cells[i][j][k].liveNeighbors++
                //     cells[i][j][k].aliveNeighborZpos = true
                // } else {
                //     cells[i][j][k].aliveNeighborZpos = false
                // }
                // if(typeof cells[i][j][k-1] != 'undefined' && cells[i][j][k-1].aliveNow){
                //     cells[i][j][k].liveNeighbors++
                //     cells[i][j][k].aliveNeighborYneg = true
                // } else {
                //     cells[i][j][k].aliveNeighborYneg = false
                // }
                // if(typeof cells[i][j][k+1] != 'undefined' && cells[i][j][k+1].aliveNow){
                //     cells[i][j][k].liveNeighbors++
                //     cells[i][j][k].aliveNeighborYpos = true
                // } else {
                //     cells[i][j][k].aliveNeighborYpos = false
                // }

                

            if(cells[i][j][k].liveNeighbors <= 8 || cells[i][j][k].liveNeighbors >= 15){
                cells[i][j][k].aliveNext = false
            } else {
                cells[i][j][k].aliveNext = true
            }
            
            }
    }
    }
    }

    function resetGeneration(){
        for(let i=0; i<cells.length; i++){
            for(let j=0; j<cells[i].length; j++){
                for(let k=0; k<cells[i][j].length; k++){  
                    cells[i][j][k].aliveNow = cells[i][j][k].aliveNext
                }
            }
        }
    }

    function getAssetsData(){
        assetsData = []
        for(let i=0; i<cells.length; i++){
            for(let j=0; j<cells[i].length; j++){
                for(let k=0; k<cells[i][j].length; k++){  
                    if(cells[i][j][k].aliveNow){
                        assetsData = [...assetsData, {
                            x: cells[i][j][k].x,
                            y: cells[i][j][k].y,
                            z: cells[i][j][k].z,
                            rotX: 0,
                            rotY: Math.floor(Math.random()*4) * Math.PI/2,
                            rotZ: Math.PI/2,
                            assetColor: cells[i][j][k].thisColor,
                            assetType: cells[i][j][k].asset,
                            loop: ''
                        }]
                    }
                }
            }
        }

        $worldData = {
            assetsNumber: assetsData.length
        }
    }

    export function updateWorld(){
        cells = []

        generateCells(widthNum, depthNum, heightNum)
        cellIsAliveNextGeneration()
        // resetGeneration()
        // cellIsAliveNextGeneration()
        //console.log(cells)

        for(let i=0; i<10; i++){
            resetGeneration()
            cellIsAliveNextGeneration()
        }

        getAssetsData()

    }

    updateWorld()

    export function removeElementfromPoints(){

        for (let i = 0; i < assetsData.length; i++){
            if(assetsData[i].x === $selectedAsset.x && assetsData[i].y === $selectedAsset.y && assetsData[i].z === $selectedAsset.z){
                assetsData.splice(i, 1)
            }
        }

        assetsData = [...assetsData]
    }



    export function setAssetColor(){
        for (let asset of assetsData){
            if(asset.x === $selectedAsset.x && asset.y === $selectedAsset.y && asset.z === $selectedAsset.z){
                asset.assetColor = $selectedAsset.assetColor
            }
        }
        assetsData = [...assetsData]
    }

    export function setAssetPosition(){
        for (let asset of assetsData){
            if(asset.x === $selectedAsset.x && asset.y === $selectedAsset.y && asset.z === $selectedAsset.z){
                asset.x = $selectedAsset.x
                asset.y = $selectedAsset.y
                asset.z = $selectedAsset.z
            }
        }
        assetsData = [...assetsData]
    }

    export function setAssetRotation(){
        console.log($selectedAsset)
        for (let asset of assetsData){
            if(asset.x === $selectedAsset.x && asset.y === $selectedAsset.y && asset.z === $selectedAsset.z){
                asset.rotX = $selectedAsset.rotX
                asset.rotY = $selectedAsset.rotY
                asset.rotZ = $selectedAsset.rotZ
            }
        }
        assetsData = [...assetsData]
    }

    function selectAsset(x = 0, y = 0, z = 0){
        let selectedAsset
        for (let asset of assetsData){
            if(asset.x === x && asset.y === y && asset.z === z){
                selectedAsset = asset
            }
        }
        return selectedAsset
    }

    function rotateY(num = 1){
        let asset = selectAsset($selectedAsset.x, $selectedAsset.y, $selectedAsset.z)
        asset.rotY += num

        assetsData = [...assetsData]
    }

    // export let assetOptionsPanelDisplay = 'block'

    // removeElementfromPoints(e.intersections[0].object.position.x, e.intersections[0].object.position.y, e.intersections[0].object.position.z);
</script>




<T.PerspectiveCamera
    makeDefault
    position={[-10, heightNum + 5, -10]}
    on:create={({ ref }) => {
      ref.lookAt(widthNum/2, heightNum / 1.2, depthNum/2)
    }}
>
<OrbitControls target={[widthNum/2, heightNum / 1.2, depthNum/2]}/>
</T.PerspectiveCamera>

<T.HemisphereLight args={['white', 'skyblue', 3]}/>







<!-- <T.AxesHelper args={[20]}/> -->


{#if loadedAssets > 0}

    {#each assetsMeshes as assetMesh, i}
        <InstancedMesh >
            <T is={assetMesh.geometry} />
            <T is={assetMesh.material} />

            {#each assetsData as asset}
                {#if asset.assetType === i}
                    <Instance 
                        rotation.x={asset.rotX}
                        rotation.y={asset.rotY}
                        rotation.z={asset.rotZ}    
                        position.x={asset.x}
                        position.y={asset.y}
                        position.z={asset.z} 
                        color = {asset.assetColor}
                        on:click={(e) => {e.stopPropagation(); $assetOptionsPanelDisplay = 'block'; $selectedAsset = selectAsset(e.intersections[0].object.position.x, e.intersections[0].object.position.y, e.intersections[0].object.position.z); console.log($selectedAsset) }}
                        on:pointerover={(e) => {asset.assetColor = '#ff00ff'; e.stopPropagation()}}
                        on:pointerout={() => {asset.assetColor = '#ffffff'}}
                    />
                {/if}
            {/each}
        </InstancedMesh>
    {/each}
{/if}
