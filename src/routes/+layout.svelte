<script>
    import { width, height } from '$lib/store'
    import { navigating } from '$app/stores'
    import '../style.css' 

    let innerWidth = 0
    let innerHeight = 0
    $: {
        $width = innerWidth;
        $height = innerHeight;
    }
</script>

<svelte:head>
    <title>Kodiia Workspace</title>
    <meta name="online workspace to learn programming and build projects">
</svelte:head>

<svelte:window bind:innerWidth bind:innerHeight />



{#if $navigating}
<p>Loading...</p>
{:else}
<slot />
{/if}
