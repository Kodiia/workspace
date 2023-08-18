<script>
    import { Canvas } from '@threlte/core'
    import ProceduralWorlds from '$lib/ProceduralWorlds.svelte';
    import { width, height } from '$lib/store'
</script>

<div class='container' style='width: {$width}px; height: {$height}px;'>
<Canvas>
    <ProceduralWorlds />
</Canvas>
</div>

<style>
    .container{
        background: pink;
    }
</style>