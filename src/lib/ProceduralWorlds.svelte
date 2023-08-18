<script lang="ts">
    import { T } from '@threlte/core'
    import { OrbitControls, interactivity, InstancedMesh, Instance } from '@threlte/extras'
	import { scale } from 'svelte/transition';
	//import { InstancedMesh, PerspectiveCamera } from 'three';

    let thescale = 1.0
    let color = 'white'
    interactivity()
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

<T.Mesh >
   <T.BoxGeometry args={[1, 1, 1]} />
   <T.MeshBasicMaterial color="red" />
</T.Mesh>

<InstancedMesh >
    <T.SphereGeometry args={[0.5]} />
    <T.MeshBasicMaterial color={color} />
    <Instance
        position.x={-2}
        position.y={Math.sin(2)}
        scale={thescale}
        on:pointerenter={() => {thescale = 1.5; color = 'blue'}}
        on:pointerleave={() => {thescale = 1.0; color = 'white'}}
    />
</InstancedMesh>