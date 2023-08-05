<script>
    import * as THREE from 'three'
    import { onMount } from 'svelte';

    let appCanvas, scene, camera, renderer
    let inputValue, bgColor
    onMount(()=>{
        scene = new THREE.Scene();
        scene.background = new THREE.Color(bgColor.value)
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
        
            cube.rotateY(inputValue.value)
        }
        animate()

    })

    function updateBgColor(){
        scene.background = new THREE.Color(bgColor.value)
    }
</script>

<input bind:this={inputValue} value='0.1' style='position: absolute'/>
<input bind:this={bgColor} type='color' value='black' style='position: absolute; top: 30px;' on:change={updateBgColor}/>
<canvas bind:this={appCanvas}></canvas>