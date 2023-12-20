<script>
  import { T, useFrame } from '@threlte/core'
  import { interactivity, OrbitControls, InstancedMesh, Instance, useGltf, useCursor } from '@threlte/extras'
  import { updateWorld } from './worldCAcaves';
  import { availableAssets } from './worldAssets';
  import { Mesh, BufferGeometry, MeshStandardMaterial, AxesHelper, HemisphereLight } from 'three';
  import { loadedAssetsNumber, selectedAssets, selectedAsset, assetOptionsPanelDisplay, worldData, worldType, worldAddAsset } from './store';
  import { lib } from './worldLib';

  export let startAssets = ''
  console.log(startAssets)

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

  const gltf = useGltf('/cube_white.glb', {
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
  // if(startAssets){
  //   assetsData = startAssets.assetsData
  //   console.log(startAssets.assetsData)
  // }

  function updateInitialWorld(){
    for(let asset of startAssets.assetsData){
      assetsData = [...assetsData,
      new Object3D(
              asset.id,
              {x: asset.position.x, y: asset.position.y, z: asset.position.z},
              asset.rotation,
              asset.name,
              asset.color,
              asset.speed,
            )
    ]
    }
    console.log(assetsData)
  }

  if(startAssets.assetsData){
  updateInitialWorld()
  }


  export function getAssetsData(x = 5, y = 5, z = 5, gens = 3){
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
    //console.log(assetsData[0])
    $worldData.assetsNumber = assetsData.length
    $worldData.assets = assetsData
  }

  //getAssetsData()
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
    $worldData.assetsNumber = assetsData.length
    $worldData.assets = assetsData
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

  function addAsset(intPointX = 0, intPointY = 0, intPointZ = 0, objectX = 0, objectY = 0, objectZ = 0){
    let selectedAssetNumber = 3
    console.log(intPointX - objectX)
    let newX = 0, newY = 0, newZ = 0
    if( intPointX - objectX === -0.5 ){
      newX = objectX - 1
      newY = objectY
      newZ = objectZ
    }
    if( intPointX - objectX === 0.5 ){
      newX = objectX + 1
      newY = objectY
      newZ = objectZ
    }
    if( intPointY - objectY === -0.5 ){
      newX = objectX
      newY = objectY - 1
      newZ = objectZ
    }
    if( intPointY - objectY === 0.5 ){
      newX = objectX
      newY = objectY + 1
      newZ = objectZ
    }
    if( intPointZ - objectZ === -0.5 ){
      newX = objectX
      newY = objectY
      newZ = objectZ - 1
    }
    if( intPointZ - objectZ === 0.5 ){
      newX = objectX
      newY = objectY
      newZ = objectZ + 1
    }
          
    assetsData = [...assetsData,
    new Object3D(
      assetsData.length,
      {x: newX, y: newY, z: newZ},
      availableAssets[selectedAssetNumber].getRotation(),
      availableAssets[selectedAssetNumber].name,
      '#ffffff',
      availableAssets[selectedAssetNumber].speed,
      )
    ]
    // for (let asset of assetsData){
    //     if(asset.position.x === x && asset.position.y === y && asset.position.z === z){
          
    //     }
    // }
    assetsData = [...assetsData]
    $worldData.assetsNumber = assetsData.length
    $worldData.assets = assetsData
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
                on:click={(e) => {
                  e.stopPropagation(); 
                  if ( $worldAddAsset === false ){ $assetOptionsPanelDisplay = 'block' }; 
                  $selectedAsset = selectAsset(e.intersections[0].object.position.x, e.intersections[0].object.position.y, e.intersections[0].object.position.z); 
                  //addAsset(e.intersections[0].object.position.x + e.normal.z, e.intersections[0].object.position.y + e.normal.y, e.intersections[0].object.position.z + e.normal.x); 
                  if ( $worldAddAsset === true ){ addAsset(e.point.x, e.point.y, e.point.z, e.intersections[0].object.position.x, e.intersections[0].object.position.y, e.intersections[0].object.position.z); };
                  console.log(e.point, $selectedAsset.userLoopCode, $selectedAsset.speed);
                  console.log($worldData.assets)
                  }}
                on:create = {()=>{}}
                on:pointerover={onPointerEnter}
                on:pointerleave={onPointerLeave}
                />
            {/if}
        {/each}
    </InstancedMesh>
    {/each}
{/if}