<script lang="ts">
    import { T } from '@threlte/core'
    import { OrbitControls, interactivity, InstancedMesh, Instance } from '@threlte/extras'
	import { scale } from 'svelte/transition';
	import { HemisphereLight } from 'three';
	//import { InstancedMesh, PerspectiveCamera } from 'three';

    let thescale = 1.0
    let color = 'white'
    interactivity()


    let points = []
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
                        liveNeighbors: 0
                    }
                } else {
                    cells[i][j][k] = {
                        aliveNow: false,
                        aliveNext: false,
                        liveNeighbors: 0
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
            cells[i][j][k].liveNeighbours = 0

                if(typeof cells[i-1] != 'undefined' && cells[i-1][j][k].aliveNow){
                cells[i][j][k].liveNeighbours++
                }
                if(typeof cells[i+1] != 'undefined' && cells[i+1][j][k].aliveNow){
                cells[i][j][k].liveNeighbours++
                }
                if(typeof cells[i][j-1] != 'undefined' && cells[i][j-1][k].aliveNow){
                cells[i][j][k].liveNeighbours++
                }
                if(typeof cells[i][j+1] != 'undefined' && cells[i][j+1][k].aliveNow){
                cells[i][j][k].liveNeighbours++
                }
                if(typeof cells[i][j][k-1] != 'undefined' && cells[i][j][k-1].aliveNow){
                cells[i][j][k].liveNeighbours++
                }
                if(typeof cells[i][j][k+1] != 'undefined' && cells[i][j][k+1].aliveNow){
                cells[i][j][k].liveNeighbours++
                }

            if(cells[i][j][k].liveNeighbours <= 2 || cells[i][j][k].liveNeighbours >= 5){
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


    function getPointsCoords(){
    for(let i=0; i<cells.length; i++){
        for(let j=0; j<cells[i].length; j++){
            for(let k=0; k<cells[i][j].length; k++){  
        
            if(cells[i][j][k].aliveNow){          
                points.push({
                x: i,
                y: k,
                z: j,
                thiscolor: k>5 ? 'grey' : 'white',
                scale: 1
                })
            }
            }
        }
    }
    }

    function updateWorld(){
        cells = []
        generateCells(widthNum, depthNum, heightNum)

        for(let i=0; i<10; i++){
            cellIsAliveNextGeneration()
            resetGeneration()
        }

        getPointsCoords()
    }

    updateWorld()

    function removeElementfromPoints(x = 0, y = 0, z = 0){
        for(let i=0; i<points.length; i++){
            if(points[i].x === x && points[i].y === y && points[i].z === z){
                console.log(points[i], x, y, z)
                points.splice(i, 1)
            }
        }
        
    }

    function updateInstanceGeometry(){

    }
</script>



<T.PerspectiveCamera
    makeDefault
    position={[10, 10, 10]}
    on:create={({ ref }) => {
      ref.lookAt(0, 0, 0)
    }}
>
<OrbitControls />
</T.PerspectiveCamera>

<T.HemisphereLight args={['white', 'skyblue']}/>

<!-- <T.Mesh >
   <T.BoxGeometry args={[1, 1, 1]} />
   <T.MeshBasicMaterial color="red" />
</T.Mesh> -->


<InstancedMesh >
    <T.BoxGeometry args={[1, 1, 1]} />
    <T.MeshStandardMaterial color={'white'} />

    {#each points as {x, y, z, thiscolor, scale}}
        {#if z>5}
            <Instance
                position.x={x}
                position.y={y}
                position.z={z}
                scale={scale}
                color={thiscolor}
                on:click={(e) => {e.stopPropagation(); removeElementfromPoints(e.intersections[0].object.position.x, e.intersections[0].object.position.y, e.intersections[0].object.position.z); console.log(e, e.normal, e.object.position)}}
                on:pointerover={(e) => {thiscolor = 'pink'; e.stopPropagation()}}
                on:pointerout={() => {thiscolor = 'white'}}
            />
        {/if}
    {/each}
    
</InstancedMesh>

<InstancedMesh >
    <T.SphereGeometry args={[0.5]} />
    <T.MeshStandardMaterial color={'white'} />

    {#each points as {x, y, z, thiscolor, scale}}
        {#if z<=5}
            <Instance
                position.x={x}
                position.y={y}
                position.z={z}
                scale={scale}
                color={thiscolor}
                on:click={(e) => {e.stopPropagation(); removeElementfromPoints(x, y, z); console.log(e, e.normal, e.object.position)}}
                on:pointerover={(e) => {thiscolor = 'pink'; e.stopPropagation()}}
                on:pointerout={() => {thiscolor = 'white'}}
            />
        {/if}
    {/each}
    
</InstancedMesh>
