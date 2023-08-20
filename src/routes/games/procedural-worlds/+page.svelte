<script>
    import { Canvas } from '@threlte/core'
    import ProceduralWorlds from '$lib/ProceduralWorlds.svelte';
    import { width, height } from '$lib/store'
    import { fade } from 'svelte/transition';

    let navMenuDisplay = 'none'
    let worldWidth, worldDepth, worldHeight
    let x = 10, y = 10, z = 10

</script>

<nav>
    <div class='navButtons'>
        <button class='menuButton' on:click={()=>{navMenuDisplay === 'none' ? navMenuDisplay = 'block' : navMenuDisplay = 'none'}}>
            {#if navMenuDisplay === 'none'}
                <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10" y1="20" x2="40" y2="20" stroke="#1a1a1a" stroke-width='2' />
                    <line x1="10" y1="30" x2="40" y2="30" stroke="#1a1a1a" stroke-width='2' />
                </svg>
            {:else}
                <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <line x1="15" y1="15" x2="35" y2="35" stroke="#1a1a1a" stroke-width='2' />
                    <line x1="15" y1="35" x2="35" y2="15" stroke="#1a1a1a" stroke-width='2' />
                </svg>
            {/if}
        </button>
        <!-- <img src='{habitat}' width='100' alt='habitat'/> -->
        <a class='smallMenuButton' href='/'>Home</a>
    </div>
    <hr style='display: {navMenuDisplay}'>
    <div class='navMenu' style='display: {navMenuDisplay}; max-height: calc({$height}px - 70px);' >
        
        <div class='statisticsContainer' style='margin-top: 10px;'>
            <h2>Some setups</h2>
            <input bind:this={worldWidth} type='text' value=10 on:change={()=>{x = parseInt(worldWidth.value); console.log(x)}} />
        </div>
        <div class='challengesContainer'>
        </div>
    </div>
</nav>


<div class='container' style='width: {$width}px; height: {$height}px;'>
    <Canvas>
        <ProceduralWorlds widthNum = {x} />
    </Canvas>
</div>

<style>
    nav{
        width: calc(100% - 10px);
        min-height: 50px;
        /* display: flex; */
        /* margin-bottom: 10px; */
        position: fixed;
        padding: 5px;
        top: 0;
        left: 0;
        background: linear-gradient( 45deg, #ffffffc3, #ffffff90);
        backdrop-filter: blur(40px);
        -webkit-backdrop-filter: blur(40px);
        border-radius: 0 0 10px 10px;
        z-index: 10;
    }
    .navButtons{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .navMenu{
        /* width: calc(100% - 10px); */
        overflow-y: scroll;
        margin-bottom: 10px;
    }
    .smallMenuButton {
      background: none;
      border: none;
      color: #1a1a1a;
      font-family: Roboto, sans-serif;
      font-weight: 300;
      font-size: 1rem;
      text-decoration: none;
      display: flex;
      align-items: center;
      padding: 0 20px 0 0;
    }
    .smallMenuButton:hover {
      background: none;
      border: none;
      font-family: Roboto, sans-serif;
      font-weight: 300;
      font-size: 1rem;
      color: #3d95ee;
      text-decoration: underline;
      display: flex;
      align-items: center;
    }
    .menuButton, .assetsMenuButton{
        padding: 5px;
        width: 50px;
        height: 50px;
        border: none;
        transform: scale(1.0);
    }
    .menuButton:hover, .assetsMenuButton:hover{
        background: none;
        transform: scale(1.1);
    }
    .statisticsContainer, .challengesContainer{
        /* width: 100%; */
        padding: 10px;
    }
    .container{
        background: pink;
    }
</style>