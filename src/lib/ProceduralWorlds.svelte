<script>
    import { T, useFrame } from '@threlte/core'
    import { OrbitControls, interactivity, InstancedMesh, Instance, useGltf, InstancedMeshes, GLTF, useCursor } from '@threlte/extras'
	import { scale } from 'svelte/transition';
	import { Mesh, BufferGeometry, MeshStandardMaterial, AxesHelper, HemisphereLight } from 'three';
    import { loadedAssetsNumber, width, height, selectedAsset, assetOptionsPanelDisplay, worldData, worldSelectedAssets } from '$lib/store';
    import { spring } from 'svelte/motion'
    import { availableAssets } from './worldAssets';
    import { updateWorld } from './worldCAcaves';
    import { lib } from './worldLib';

    interactivity()


    useFrame((state, delta) => {
        // rotation += delta
        orbitControls.update()

        for (let asset of assetsData){
            if(asset.userLoopCode != ''){
                try {
                    //eval(asset.loop)
                    const executeUserCode = new Function("object",  [...lib].join('\n') + asset.userLoopCode);
                    executeUserCode.call(asset, asset);
                    assetsData = [...assetsData]
                } catch (error) {
                    console.error(error);
                }
            }
        }
    })

    const { onPointerEnter, onPointerLeave } = useCursor('pointer', 'default')

    class Object3D {
        constructor(id = 0, type = 0, position = {}, rotation = {}, color = 'white', name = '') {
            this.id = id;
            this.type = type;
            this.position = position;
            this.rotation = rotation;
            this.color = color;
            this.name = name;
            this.userLoopCode = ''; // Store user-generated code here
        }
    }


    export let assets = []
    let orbitCamerTargetPoint = [5,0,5]

    $loadedAssetsNumber = 0

    async function loadAsset(asset){
        let loadedModel = useGltf(asset.url).then(
                result => {
                    //result.scene.traverse(function(obj) { obj.frustumCulled = false; });
                    // console.log(result.scene.traverse(function(obj) { obj.frustumCulled = false; }))
                    result.scene.frustumCulled = true;
                    console.log(result.scene.frustumCulled)
                    $loadedAssetsNumber++
                    asset.mesh = new Mesh(result.scene.children[0].geometry, result.scene.children[0].material)
                }
        )
        // console.log(asset)
    }

    for(let asset of availableAssets){
        loadAsset(asset)
    }

    

    let assetsData = []
    // for(let i=0; i<10000; i++){
    //     assetsAtPositions.push({
    //         x: Math.floor(Math.random()*100),
    //         y: Math.floor(Math.random()*100),
    //         z: Math.floor(Math.random()*100),
    //         name: availableAssets[Math.floor(Math.random() * availableAssets.length)].name,
    //         color: 'white'
    //     })
    // }

    export function getAssetsData(x = 10, y = 10, z = 10, gens = 3){
        let cells = updateWorld(x, y, z, gens)
        assetsData = []
        let idNumber = 0
        for(let i=0; i<cells.length; i++){
            for(let j=0; j<cells[i].length; j++){
                for(let k=0; k<cells[i][j].length; k++){  
                    if(cells[i][j][k].aliveNow){
                        let selectedAssetNumber = Math.floor(Math.random() * assets.length)
                        // console.log(assets[selectedAssetNumber].getRotation().y)
                        assetsData = [...assetsData, 
                        new Object3D(
                            idNumber,
                            assets[selectedAssetNumber].name,
                            {x: cells[i][j][k].x, y: cells[i][j][k].y, z: cells[i][j][k].z},
                            availableAssets[selectedAssetNumber].getRotation(),
                            '#ffffff',
                            assets[selectedAssetNumber].name
                        )
                    ]
                        idNumber++
                    }
                }
            }
        }
        $worldData.assetsNumber = assetsData.length

        orbitCamerTargetPoint = [x/1, y, z/1]
        console.log(orbitCamerTargetPoint)
    }

    //getAssetsData()

    function selectAsset(x = 0, y = 0, z = 0){
        let selectedAsset
        for (let asset of assetsData){
            if(asset.position.x === x && asset.position.y === y && asset.position.z === z){
                selectedAsset = asset
            }
        }
        return selectedAsset
    }


    export function removeElementfromPoints(){
    for (let i = 0; i < assetsData.length; i++){
        if(assetsData[i].position.x === $selectedAsset.position.x && assetsData[i].position.y === $selectedAsset.position.y && assetsData[i].position.z === $selectedAsset.position.z){
            assetsData.splice(i, 1)
        }
    }

    assetsData = [...assetsData]
    }



    export function setAssetColor(){
    for (let asset of assetsData){
        if(asset.position.x === $selectedAsset.position.x && asset.position.y === $selectedAsset.position.y && asset.position.z === $selectedAsset.position.z){
            asset.color = $selectedAsset.color
        }
    }
    assetsData = [...assetsData]
    }

    export function setAssetPosition(){
    for (let asset of assetsData){
        if(asset.position.x === $selectedAsset.position.x && asset.position.y === $selectedAsset.position.y && asset.position.z === $selectedAsset.position.z){
            asset.position.x = $selectedAsset.position.x
            asset.position.y = $selectedAsset.position.y
            asset.position.z = $selectedAsset.position.z
        }
    }
    assetsData = [...assetsData]
    }

    export function setAssetRotation(){
    console.log($selectedAsset)
    for (let asset of assetsData){
        if(asset.position.x === $selectedAsset.position.x && asset.position.y === $selectedAsset.position.y && asset.position.z === $selectedAsset.position.z){
            asset.rotation.x = $selectedAsset.rotation.x
            asset.rotation.y = $selectedAsset.rotation.y
            asset.rotation.z = $selectedAsset.rotation.z
        }
    }
    assetsData = [...assetsData]
    }


let camera, orbitControls
</script>

<T.PerspectiveCamera
bind:ref = {camera}
    makeDefault
    position={[-5, 0 + 10, -5]}
    on:create={({ ref }) => {
        ref.lookAt(5,5,5)
      }}
    near={0.01}
    
>
<OrbitControls
maxDistance = {20}
minDistance = {10}
enableDamping
bind:ref = {orbitControls}
    on:change={(e) => {
        //console.log(orbitControls)
       // orbitControls.update()
    }}
/>
</T.PerspectiveCamera>

<T.HemisphereLight args={['white', 'skyblue', 3]}/>

{#if $loadedAssetsNumber === availableAssets.length}
    <!-- {#each availableAssets as availableAsset, i}
        <InstancedMesh 
        limit={10000}
        range={10000}
        >
            <T is={availableAsset.mesh.geometry} />
            <T is={availableAsset.mesh.material} />

            {#each assets as asset}
                {#each assetsData as assetData}
                    {#if asset.name === availableAssets[i].name && asset.name === assetData.name}
                        <Instance 
                        position.x = {assetData.position.x}
                        position.y = {assetData.position.y}
                        position.z = {assetData.position.z}
                        rotation.x={assetData.rotation.x}
                        rotation.y={assetData.rotation.y}
                        rotation.z={assetData.rotation.z}
                        color = {assetData.color}
                        on:click={(e) => {e.stopPropagation(); $assetOptionsPanelDisplay = 'block'; $selectedAsset = selectAsset(e.intersections[0].object.position.x, e.intersections[0].object.position.y, e.intersections[0].object.position.z); console.log($selectedAsset.userLoopCode, e);  }}
                        on:pointerover={onPointerEnter}
                        on:pointerleave={onPointerLeave}
                        />
                    {/if}
                {/each}
            {/each}
        </InstancedMesh>
    {/each} -->

    {#each assets as asset}
    <InstancedMesh 
    limit={10000}
    range={10000}
    >
        <T is={asset.mesh.geometry} />
        <T is={asset.mesh.material} />

        {#each assetsData as assetData}
            {#if asset.name === assetData.name}
                <Instance 
                position.x = {assetData.position.x}
                position.y = {assetData.position.y}
                position.z = {assetData.position.z}
                rotation.x={assetData.rotation.x}
                rotation.y={assetData.rotation.y}
                rotation.z={assetData.rotation.z}
                color = {assetData.color}
                on:click={(e) => {e.stopPropagation(); $assetOptionsPanelDisplay = 'block'; $selectedAsset = selectAsset(e.intersections[0].object.position.x, e.intersections[0].object.position.y, e.intersections[0].object.position.z); console.log($selectedAsset.userLoopCode, e);  }}
                on:pointerover={onPointerEnter}
                on:pointerleave={onPointerLeave}
                />
            {/if}
        {/each}
    </InstancedMesh>
    {/each}

{/if}


<!-- {#each availableAssets as availableAsset, i}
    <InstancedMesh >
        <T is={availableAsset.mesh.geometry} />
        <T is={availableAsset.mesh.material} />


        {#each assets as asset}
            {#if asset.name === availableAssets[i].name}
                <Instance 
                position.x = {i * 2}
                />
            {/if}
        {/each}
    </InstancedMesh>
{/each} -->


{#each assetsData as assetData}
<!-- <T.Mesh 
    position.x = {assetData.position.x}
    position.y = {assetData.position.y}
    position.z = {assetData.position.z}
>
    <T.BoxGeometry />
    <T.MeshStandardMaterial />
  </T.Mesh> -->

  <!-- <GLTF 
    url={'/nakagin_capsule_white-transformed.glb'}
    useDraco = {true}
    position = {[assetData.position.x,0,0]}
  /> -->
{/each}