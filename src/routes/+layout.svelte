<script>
    import { width, height } from '$lib/store'
    import { navigating } from '$app/stores'
    import '../style.css' 

    // let innerWidthValue = 0
    // let innerHeightValue = 0
    // $: {
    //     $width = innerWidthValue;
    //     $height = innerHeightValue;
    // }
    $: innerWidth = 0
    $: innerHeight = 0
    $: $width = innerWidth
    $: $height = innerHeight
    // $: console.log('width and height', $width, $height, innerWidth, innerHeight)
</script>

<svelte:head>
    <title>Kodiia Workspace</title>
    <meta name="online workspace to learn programming and build projects">
</svelte:head>

<svelte:window bind:innerWidth bind:innerHeight />



{#if $navigating}
<div class='container'>
    <div class='loader'></div>
    <h3>Loading...</h3>
</div>
{:else}
<slot />
{/if}

<style>
    .container{
        width: max(1044px);
        height: 100svh;
        box-sizing: border-box;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .loader{
        width: 50px;
        height: 50px;
        border: 2px solid;
        border-color: #1f1f1f transparent #1f1f1f transparent;
        border-radius: 50%;
        animation: infinite loadAnimation 2s;
    }

    @keyframes loadAnimation{
        0% {
          transform: rotate(0deg)  
        }
        100%{
            transform: rotate(360deg);
        }
    }

</style>