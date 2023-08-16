<script>
    import * as THREE from 'three'
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import { onMount } from 'svelte';
    import { width, height } from '$lib/store'
 
    let appCanvas, scene, camera, renderer
    let inputValue, bgColor = 'skyblue'
    let gridSize = 10
    onMount(()=>{
        scene = new THREE.Scene();
        scene.background = new THREE.Color(bgColor)
        camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
        
        renderer = new THREE.WebGLRenderer({ canvas: appCanvas, antialias: true });

        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial({color: 'green'})
        const cube = new THREE.Mesh(geometry, material)
        cube.position.x = -5
        scene.add(cube)

        const light = new THREE.HemisphereLight('white', 'blue')
        scene.add(light)


        const controls = new OrbitControls( camera, renderer.domElement );
        camera.position.z = 5
        // camera.position.set(widthNum/2, 10, heightNum*1.5);
        // controls.target = new THREE.Vector3(widthNum/2, 3, heightNum/2)
        controls.target = new THREE.Vector3(0,0,0)
        controls.maxDistance = 50
        controls.update();

        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        
            // cube.rotateY(inputValue.value)
        }
        animate()

        //resize()

    })

    //resize function
    function resize(){  
        // Update sizes
        let canvasWidth = $width;
        let canvasHeight = $height;
        // Update camera
        camera.aspect = canvasWidth / canvasHeight;
        camera.updateProjectionMatrix();
        // Update renderer
        renderer.setSize(canvasWidth, canvasHeight);  
    }

    width.subscribe((value)=>{
        if(scene){
            resize()
        }
    })

    height.subscribe((value)=>{
        if(scene){
            resize()
        }
    })

    function updateBgColor(){
        scene.background = new THREE.Color(bgColor.value)
    }

    let worldSize = 'small'
    function getWorldSize(num = 'small'){
        if(num === 'small'){
            gridSize = 10
        } else if(num === 'medium'){
            gridSize = 50
        } else if(num === 'large'){
            gridSize = 100
        }
    }

    let points = []
    const ground = new THREE.MeshStandardMaterial( { color: '#56bf72' } );

    // function generatePoints(){
    //     for (let i=0; i<gridSize; i++){
    //         points[i] = []
    //         for (let j=0; j<gridSize; j++){
    //             points[i][j] = []
    //             for (let k=0; k<gridSize; k++){
    //                 points[i][j][k] = {
    //                     x: i,
    //                     y: k,
    //                     z: j,
    //                     material: ground,
    //                     aliveNow: false,
    //                     aliveNext: false
    //                 }
    //             }
    //         }
    //     }
    //     console.log(points.length, points)
    //     return points
    // }

    // let planeGeometry = new THREE.PlaneGeometry(1.0, 1.0, 1, 1)

    // function drawLandscapePlane(x, y, z, rotX, rotY, rotZ, selectedMaterial){
    //     let plane = new THREE.Mesh(planeGeometry, selectedMaterial);
    //     plane.rotation.set(rotX, rotY, rotZ);
    //     plane.position.set(x, y, z);
    //     plane.name = x+','+y+','+z;
    //     //landscapeGeometry.push(plane)
    //     scene.add(plane);
    // }

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshStandardMaterial( { color: 'pink' } );
    const cube = new THREE.Mesh( geometry, material );

    let cells = []
    const widthNum = 10
    const heightNum = 10

    function generateCells(gridSize){
    for(let i=0; i<gridSize; i++){
        cells[i] = []
        for(let j=0; j<gridSize; j++){
            cells[i][j] = []
            for(let k=0; k<gridSize; k++){
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

            if(cells[i][j][k].liveNeighbours === 4 || cells[i][j][k].liveNeighbours >= 5){
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
                z: j
                })
            }
            }
        }
    }
    }


    function createCells(){
        let cubeInstance = new THREE.InstancedMesh( geometry, material, points.length)
        cubeInstance.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame
        scene.add( cubeInstance )

        const dummy = new THREE.Object3D()
        for (let i=0; i<points.length; i++){
            dummy.position.x = points[i].x
            dummy.position.y = points[i].y
            dummy.position.z = points[i].z

            dummy.updateMatrix()
            cubeInstance.setMatrixAt(i, dummy.matrix)
        }
    }


    

    // for(let i=0; i<10; i++){  
    //     cellIsAliveNextGeneration()
    //     getPointsCoords()
    //     resetGeneration()
    // }

    // createCells()

    function removeInstances(){
        // scene.traverse((child)=>{
            
        //     if(child.isInstancedMesh){
        //         // scene.remove(child)
        //         console.log(child, scene.remove(child))
        //         scene.remove(child)
        //     }
        // })
        // for (let child of scene.children){
        //     if(child.isInstancedMesh){
        //         console.log(child)
        //         // console.log(child.scale)
        //         // child.scale.set(0,0,0)
        //         // console.log(child.scale)
        //         scene.remove(child)
        //         renderer.renderLists.dispose();
        //         // for (let i=0; i<points.length; i++){
        //         //     child.removeInstance(i)
        //         // }
        //     }

        const meshes = [];

			scene.traverse( function ( object ) {

				if ( object.isMesh ) meshes.push( object );

			} );

			for ( let i = 0; i < meshes.length; i ++ ) {

				const mesh = meshes[ i ];
				mesh.material.dispose();
				mesh.geometry.dispose();

				scene.remove( mesh );

			}
        // scene.traverse((child)=>{
        //     if(child.isMesh){
        //         scene.remove(child)
        //     }
        // }
    }




    function updateWorld(){
        removeInstances()
        
        getWorldSize(worldSize)
        cells = []
        generateCells(gridSize)

        for(let i=0; i<10; i++){
            cellIsAliveNextGeneration()
            resetGeneration()
        }

        getPointsCoords()

        // console.log(scene)
    }
</script>

<div class='container' style='width: {$width}px; height: {$height}px;'>
    <div class='setupsContainer'>
        <div class='setupsDetailsContainer'>
            <h3>World Size {worldSize}</h3>
            <div style='display: flex; align-items: center'>
                <input bind:group={worldSize} type='radio' name="smallWorld" value='small' />
                <label for='smallWorld'>Small</label>

                <input bind:group={worldSize} type='radio' name="mediumWorld" value='medium' />
                <label for='mediumWorld'>Medium</label>

                <input bind:group={worldSize} type='radio' name="largeWorld" value='large' />
                <label for='largeWorld'>Large</label>
            </div>
        </div>
        <!-- <div>
            <button>small</button>
            <button>medium</button>
            <button>large</button>
        </div> -->
        <button class='exploreButton' on:click={()=>{updateWorld(); createCells();}}>Explore</button>
    </div>
    <canvas bind:this={appCanvas}></canvas>
</div>

<style>
    .container{
        overflow: hidden;
    }
    .setupsContainer{
        width: min(700px, 100%);
        height: 100%;
        position: absolute;
        padding: 10px;
        background: linear-gradient(#ffffff20, #ffffff90);
        backdrop-filter: blur(40px);
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    canvas{
        touch-action: none;
        width: 100%;
        height: 100%;
    }
    .exploreButton{
        max-width: 200px;
    }
    .setupsDetailsContainer label{
        margin-right: 10px;
    }
    input[type=radio]{
        background-color: #ffffff30;
        border-radius: 5px;
        border: 1px solid #4233fb;
        cursor: pointer;
        display: inline-block;
        height: 20px;
        margin-right: 5px;
        position: relative;
        width: 20px;
        -webkit-appearance: none;
    }
    input[type=radio]:checked{
        background-color: #4233fb;
    }
</style>