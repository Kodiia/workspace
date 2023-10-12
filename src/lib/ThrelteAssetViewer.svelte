<script>
    import { T, useFrame } from '@threlte/core'
    import { OrbitControls, GLTF } from '@threlte/extras'

    export let url = '/nakagin_capsule_center.glb'
</script>


<T.PerspectiveCamera
  makeDefault
  position={[0, 2, 5]}
  fov={25}
>
  <OrbitControls
    autoRotate
    enableDamping
    target={[0, 0, 0]}
  />
</T.PerspectiveCamera>

<T.AmbientLight 
    intensity = {2}
/>

<GLTF
  castShadow
  receiveShadow
  url={url}
  position={[0, 0, 0]}
  scale={1}
/>