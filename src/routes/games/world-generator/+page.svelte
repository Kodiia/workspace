<script>
    import * as THREE from 'three'
    import { onMount } from 'svelte';
    import { width, height } from '$lib/store'
 
    let appCanvas, scene, camera, renderer
    let inputValue, bgColor = 'skyblue'
    let gridSize = 50
    onMount(()=>{
        scene = new THREE.Scene();
        scene.background = new THREE.Color(bgColor)
        camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.z = 5
        renderer = new THREE.WebGLRenderer({ canvas: appCanvas, antialias: true });

        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial({color: 'green'})
        const cube = new THREE.Mesh(geometry, material)

        scene.add(cube)

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

    function generatePoints(){
        for (let i=0; i<gridSize; i++){
            for (let j=0; j<gridSize; j++){
                for (let k=0; k<gridSize; k++){
                    points.push({
                        x: i,
                        y: k,
                        z: j,
                        material: ground,
                        aliveNow: false,
                        aliveNext: false
                    })
                }
            }
        }
    }

    function updateWorld(){

    }
</script>

<div class='container' style='width: {$width}px; height: {$height}px;'>
    <div class='setupsContainer'>
        <div class='setupsDetailsContainer'>
            <h3>World Size</h3>
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
        <button class='exploreButton'>Explore</button>
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