<script>
  import { T, useFrame } from '@threlte/core'
  import { interactivity, OrbitControls, InstancedMesh, Instance, useGltf, useCursor } from '@threlte/extras'
  import { updateWorld } from './worldCAcaves';
  import { availableAssets } from './worldAssets';
  import { Mesh, BufferGeometry, MeshStandardMaterial, AxesHelper, HemisphereLight } from 'three';
  import { loadedAssetsNumber, selectedAssets, selectedAsset, assetOptionsPanelDisplay, worldData, worldType } from './store';
  import { lib } from './worldLib';

  let libCommands = []
  for(let command of lib){
    libCommands.push(command.code)
  }

  interactivity()
  useFrame((state, delta) => {
    for (let asset of assetsData){
      if(asset.userLoopCode != ''){
        try {
          //eval(asset.loop)
          const executeUserCode = new Function("object",  [...libCommands].join('\n') + asset.userLoopCode);
          executeUserCode.call(asset, asset);
          assetsData = [...assetsData]
          } catch (error) {
          console.error(error);
          }
      }
    }
  })
  const { onPointerEnter, onPointerLeave } = useCursor('pointer', 'default')

  let mesh = ''

  $loadedAssetsNumber = 0

  const gltf = useGltf('/nakagin_capsule_white.glb', {
    useDraco: true
  }).then(result =>{
    mesh = result
    //console.log(mesh.scene)
  })

  async function loadAsset(asset){
    const gltf = useGltf(asset.url, {
    useDraco: true
  }).then(result =>{
    $loadedAssetsNumber++
    asset.mesh = new Mesh(result.scene.children[0].geometry, result.scene.children[0].material)
    // console.log($loadedAssetsNumber, availableAssets.length)
  })
  }

  for(let asset of availableAssets){
    loadAsset(asset)
  }

  // let assets = $selectedAssets
  

  class Object3D {
        constructor(id = 0, position = {}, rotation = {}, name = '', color = '#ffffff', speed = 0 ) {
          this.id = id;
          this.position = position;
          this.rotation = rotation;
          this.name = name;
          this.color = color;
          this.userLoopCode = '';
          this.speed = speed;
        }
    }
  
  function createFlatWorld(x = 5, y = 5){
    let cells = []
    for(let i=0; i<x; i++){
        cells[i] = []
        for(let j=0; j<y; j++){
            cells[i][j] = []
            for(let k=0; k<1; k++){
              cells[i][j][k] = {
                aliveNow: true,
                aliveNext: false,
                liveNeighbors: 0,
                x: i,
                y: k, 
                z: j,
              }
            }
        }
    }

    return cells
  }

  function createHillsWorld(x = 5, y = 5){
    let cells = []
    for(let i=0; i<x; i++){
        cells[i] = []
        for(let j=0; j<y; j++){
            cells[i][j] = []
            for(let k=0; k<1; k++){
              cells[i][j][k] = {
                aliveNow: true,
                aliveNext: false,
                liveNeighbors: 0,
                x: i,
                y: Math.floor(Math.floor(Math.sin(i) + Math.cos(j))*1), 
                z: j,
              }
            }
        }
    }

    return cells
  }

  let assetsData = []
  export function getAssetsData(x = 10, y = 10, z = 10, gens = 3){
    assetsData = []
    //console.log($selectedAssets)
    let cells
    if($worldType === 'flat'){
      cells = createFlatWorld(x, y)
    }
    if($worldType === 'hill'){
      cells = createHillsWorld(x, y)
    }
    if($worldType === 'cave'){
      cells = updateWorld(x, y, z, gens)
    }
    let id = 0
    for(let i=0; i<cells.length; i++){
      for(let j=0; j<cells[i].length; j++){
        for(let k=0; k<cells[i][j].length; k++){  
          if(cells[i][j][k].aliveNow){
            let selectedAssetNumber = Math.floor(Math.random() * $selectedAssets.length)
            // console.log(availableAssets[selectedAssetNumber].getRotation())
            
            assetsData = [...assetsData,
            new Object3D(
              id,
              {x: cells[i][j][k].x, y: cells[i][j][k].y, z: cells[i][j][k].z},
              availableAssets[selectedAssetNumber].getRotation(),
              $selectedAssets[selectedAssetNumber].name,
              '#ffffff',
              $selectedAssets[selectedAssetNumber].speed,
            )
            ]
            id++;
          }
        }
      }
    }
    $worldData.assetsNumber = assetsData.length
  }

  getAssetsData()
  // console.log(assetsData)

  // console.log(assetsData)

  function selectAsset(x = 0, y = 0, z = 0){
    let selectedAsset
    for (let asset of assetsData){
      if(asset.position.x === x && asset.position.y === y && asset.position.z === z){
        selectedAsset = asset
      }
    }
    console.log(selectedAsset)
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

  export function setAssetSpeed(){
    console.log('speed', $selectedAsset)
    for (let asset of assetsData){
        if(asset.position.x === $selectedAsset.position.x && asset.position.y === $selectedAsset.position.y && asset.position.z === $selectedAsset.position.z){
            asset.speed = $selectedAsset.speed
        }
    }
    assetsData = [...assetsData]
  }

</script>


<T.PerspectiveCamera
  makeDefault
  position={[-5, 0 + 10, -5]}
  on:create={({ ref }) => {
      ref.lookAt(5,5,5)
    }}
  near={0.01}
>
  <OrbitControls
    maxDistance = {40}
    minDistance = {10}
    target = {[5,5,5]}
  />
</T.PerspectiveCamera>

<T.HemisphereLight args={['white', 'skyblue', 3]}/>


<!-- <T.Mesh>
  <T.BoxGeometry args={[1, 1, 1]} />
  <T.MeshBasicMaterial color="red" />
</T.Mesh> -->

{#if $loadedAssetsNumber === availableAssets.length}
{#each $selectedAssets as asset}
    <InstancedMesh 
    limit={10000}
    range={10000}
    frustumCulled = {false}
    >
        <T is={asset.mesh.geometry} />
        <T is={asset.mesh.material} />

        {#each assetsData as assetData}
            {#if asset.name === assetData.name}
                <Instance 
                position.x = {assetData.position.x}
                position.y = {assetData.position.y}
                position.z = {assetData.position.z}
                rotation.x = {assetData.rotation.x}
                rotation.y = {assetData.rotation.y}
                rotation.z = {assetData.rotation.z}
                color = {assetData.color}
                on:click={(e) => {e.stopPropagation(); $assetOptionsPanelDisplay = 'block'; $selectedAsset = selectAsset(e.intersections[0].object.position.x, e.intersections[0].object.position.y, e.intersections[0].object.position.z); console.log($selectedAsset.userLoopCode, $selectedAsset.speed);}}
                on:create = {()=>{}}
                on:pointerover={onPointerEnter}
                on:pointerleave={onPointerLeave}
                />
            {/if}
        {/each}
    </InstancedMesh>
    {/each}
{/if}