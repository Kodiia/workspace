<script lang="ts">
    import { T } from '@threlte/core'
    import { OrbitControls, interactivity, InstancedMesh, Instance, useGltf, InstancedMeshes, GLTF } from '@threlte/extras'
	import { scale } from 'svelte/transition';
	import { Mesh, BufferGeometry, MeshStandardMaterial, AxesHelper, HemisphereLight } from 'three';
	//import { InstancedMesh, PerspectiveCamera } from 'three';
    // import nakagin_wall from '$lib/models/nakagin_wall.glb'


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

    let assets = []
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
                    assets = [...assets, new Mesh(result.scene.children[0].geometry, result.scene.children[0].material)]
                }
            )
        }
        
    }
    loadModels()
    // loadModels().then(result => {
    //     modelsLoaded = true
    //     updateWorld()
    //     console.log(modelsLoaded, assets, result)
    // })

    // const nakagin_wall = useGltf('/nakagin_wall.glb').then(result => {
    //     loadedWallModels++
    //     walls.push(new Mesh(result.scene.children[0].geometry, result.scene.children[0].material))
    //     console.log(walls[0].geometry)
    // })
    // const nakagin_wall_no_window = useGltf('/nakagin_wall_no_window.glb').then(result => {
    //     loadedWallModels++
    //     walls.push(new Mesh(result.scene.children[0].geometry, result.scene.children[0].material))
    //     roofs.push(new Mesh(result.scene.children[0].geometry, result.scene.children[0].material))
    //     console.log(walls[0].geometry)
    // })


    // const nakagin_roof = useGltf('/nakagin_roof.glb')
    
    // let meshes = [
    //     new Mesh(nakagin_wall.scene.children[0].geometry, nakagin_wall.scene.children[0].material)
    // ]

    let thescale = 1.0
    let color = 'white'
    interactivity()


    // let points = []
    let cells = []
    export let widthNum = 100
    export let depthNum = 10
    export let heightNum = 10

    console.log('width: ' + widthNum)

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
                        thiscolor: 'white',
                        roofType: Math.floor(Math.random()*roofs.length),
                        xPosWallType: Math.floor(Math.random()*walls.length),
                        xNegWallType: Math.floor(Math.random()*walls.length),
                        zPosWallType: Math.floor(Math.random()*walls.length),
                        zNegWallType: Math.floor(Math.random()*walls.length),
                        slabType: Math.floor(Math.random()*slabs.length),
                        asset: Math.floor(Math.random()*assets.length),
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
                        thiscolor: 'white',
                        roofType: Math.floor(Math.random()*roofs.length),
                        xPosWallType: Math.floor(Math.random()*walls.length),
                        xNegWallType: Math.floor(Math.random()*walls.length),
                        zPosWallType: Math.floor(Math.random()*walls.length),
                        zNegWallType: Math.floor(Math.random()*walls.length),
                        slabType: Math.floor(Math.random()*slabs.length),
                        asset: Math.floor(Math.random()*assets.length),
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

    }

    updateWorld()

    function removeElementfromPoints(i = 0, j = 0, k = 0){
        // for(let i=0; i<points.length; i++){
        //     if(points[i].x === x && points[i].y === y && points[i].z === z){
        //         console.log(points[i], x, y, z)
        //         points.splice(i, 1)
        //     }
        // }
        console.log(cells[i][k][j])
        cells[i][k][j].aliveNow = false
    }

    function updateInstanceGeometry(){

    }
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

<!-- <T.Mesh >
   <T.BoxGeometry args={[1, 1, 1]} />
   <T.MeshBasicMaterial color="red" />
</T.Mesh> -->






<!-- <T.AxesHelper args={[20]}/> -->


{#if loadedAssets > 0}

    
        <InstancedMesh >
            <T is={assets[0].geometry} />
            <T is={assets[0].material} />

            {#each cells as cellI}
                {#each cellI as cellJ}
                    {#each cellJ as {aliveNow, x, y, z, thiscolor, aliveNeighborXpos, aliveNeighborXneg, aliveNeighborYpos, aliveNeighborYneg, aliveNeighborZpos, aliveNeighborZneg, asset}}
                        {#if aliveNow}
                        <Instance 
                            rotation.y={Math.floor(Math.random()*4) * Math.PI/2}
                            rotation.z={Math.PI/2}    
                            position.x={x}
                            position.y={y}
                            position.z={z} 
                            color = {thiscolor}
                            on:click={(e) => {e.stopPropagation(); removeElementfromPoints(e.intersections[0].object.position.x, e.intersections[0].object.position.y, e.intersections[0].object.position.z);}}
                            on:pointerover={(e) => {thiscolor = 'pink'; e.stopPropagation()}}
                            on:pointerout={() => {thiscolor = 'white'}}
                        />
                            <!-- {#if aliveNeighborXpos || aliveNeighborXneg || aliveNeighborYpos || aliveNeighborYneg || aliveNeighborZpos || aliveNeighborZneg}
                                
                                    <Instance 
                                        rotation.y={Math.floor(Math.random()*4) * Math.PI/2}
                                        rotation.z={Math.PI/2}
                                        
                                        position.x={x}
                                        position.y={y}
                                        position.z={z} 
                                        color = {thiscolor}
                                        on:click={(e) => {e.stopPropagation(); removeElementfromPoints(e.intersections[0].object.position.x, e.intersections[0].object.position.y, e.intersections[0].object.position.z);}}
                                        on:pointerover={(e) => {thiscolor = 'pink'; e.stopPropagation()}}
                                        on:pointerout={() => {thiscolor = 'white'}}
                                    />
                                
                            {/if} -->

                            <!-- {#if aliveNeighborYpos === false}
                                <Instance 
                                position.x={x}
                                position.y={y}
                                position.z={z} />
                            {/if} -->
                        {/if}
                    {/each}
                {/each}
            {/each}
        </InstancedMesh>

        <!-- <InstancedMesh >
            <T is={assets[1].geometry} />
            <T is={assets[1].material} />

            {#each cells as cellI}
                {#each cellI as cellJ}
                    {#each cellJ as {aliveNow, x, y, z, thiscolor, aliveNeighborXpos, aliveNeighborXneg, aliveNeighborYpos, aliveNeighborYneg, aliveNeighborZpos, aliveNeighborZneg, asset}}
                        {#if aliveNow}
                            {#if aliveNeighborXpos || aliveNeighborXneg || aliveNeighborYpos || aliveNeighborYneg || aliveNeighborZpos || aliveNeighborZneg}
                                {#if asset === 1}
                                    <Instance 
                                        rotation.y={Math.floor(Math.random()*4) * Math.PI/2}
                                        rotation.z={Math.PI/2}
                                        
                                        position.x={x}
                                        position.y={y}
                                        position.z={z} 
                                        color = {thiscolor}
                                        on:click={(e) => {e.stopPropagation(); removeElementfromPoints(e.intersections[0].object.position.x, e.intersections[0].object.position.y, e.intersections[0].object.position.z);}}
                                        on:pointerover={(e) => {thiscolor = 'pink'; e.stopPropagation()}}
                                        on:pointerout={() => {thiscolor = 'white'}}
                                    />
                                {/if}
                            {/if}


                        {/if}
                    {/each}
                {/each}
            {/each}
        </InstancedMesh> -->

        

{/if}




