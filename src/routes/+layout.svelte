<script>
    import { width, height, bgColor, textColor } from '$lib/store'
    import { navigating } from '$app/stores'
    import '../style.css' 
    import paths from '$lib/images/paths.svg'
    import kodiiaLogo from '$lib/logos/kodiia_logo.svg'
    

    $: innerWidth = 0
    $: innerHeight = 0
    $: $width = innerWidth
    $: $height = innerHeight
</script>

<svelte:head>
    <title>Kodiia Workspace</title>
    <meta name="online workspace to learn programming and build projects">
    <script async src="https://analytics.eu.umami.is/script.js" data-website-id="890ca547-7612-43ff-ae55-27e28af65147"></script>
</svelte:head>

<svelte:window bind:innerWidth bind:innerHeight />



<!-- <div class='layout-container' style='width: {$width}px; height: {$height}px; background-image: url({paths}); background-size: 100px; background-color: hsl({$bgColor}); overflow: none;'> -->
<div class='layout-container' style='background-color: hsl({$bgColor}); color: hsl({$textColor});'>
{#if $navigating}
    <!-- <div class='loader'></div>
    <h3>Loading...</h3> -->
    <!-- <div style='display: flex; justify-content: center; align-items: center; width: {$width}px; height: {$height}px;'>
        <div class='logo-card' style='background: url({kodiiaLogo}); background-position: center; background-repeat: no-repeat; background-size: 65px;'></div>
    </div> -->
    <div class='loaderContainer'>
        <div class='loader' style='border-color: hsl({$textColor}) transparent;'></div>
        <p class='loaderText'>loading...</p>
    </div>
{:else}
    {#if $width > 0}
        <slot />
    {:else}
        <div class='loaderContainer'>
            <div class='loader' style='border-color: hsl({$textColor}) transparent;'></div>
            <p class='loaderText'>loading...</p>
        </div>
    {/if}
{/if}
</div>

<style>
    .layout-container{
        position: absolute;
        top: 0;
        width: 100%;
        min-height: 100%;
        /* height: 100vh;
        overflow: hidden; */
        box-sizing: border-box;
        /* padding: 10px; */
        /* display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; */

        transition: all 0.5s;
    }
    /* .loader{
        width: 50px;
        height: 50px;
        border: 2px solid;
        border-color: #1f1f1f transparent #1f1f1f transparent;
        border-radius: 50%;
        animation: infinite loadAnimation 2s;
    } */
    .logo-card{
        width: 80px;
        height: 80px;
        background: #fdfdfd;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15));
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border: 2px solid rgba(255,255,255, 0.5);
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(60, 150, 238, 0.302);
        padding: 15px;
        animation: loadAnimation 2s infinite reverse;
    }

    @keyframes loadAnimation{
        0% {
          transform: rotateZ(-5deg)  
        }
        50%{
            transform: rotateZ(5deg);
        }
        100%{
            transform: rotateZ(-5deg);
        }
    }

    .loaderContainer{
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .loaderText{
        margin: 0;
    }
    .loader{
        width: 20px;
        height: 20px;
        margin: 10px;
        border: 2px solid;
        border-radius: 50%;
        border-color: #1a1a1a transparent;
        animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 

</style>