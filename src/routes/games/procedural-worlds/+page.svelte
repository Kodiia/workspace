<script>
    import { Canvas } from '@threlte/core'
    import ProceduralWorlds from '$lib/ProceduralWorlds.svelte';
    import { width, height } from '$lib/store'
    import { fade } from 'svelte/transition';
    import kodiia_logo_bw from '$lib/logos/kodiia_logo_bw.svg'
    import kodiia_logo_bw_small from '$lib/logos/kodiia_logo_bw_small.svg'

    let navMenuDisplay = 'none'
    let worldX, worldY, worldZ
    let x = 10, y = 10, z = 10
    let proceduralWorld
    let bgColor1, bgColor1Value = '#bdcdd9', bgColor2, bgColor2Value = '#6a82b4'


    function updateInputValue(name = 'x'){
        switch (name) {
            case 'x':
                if(worldX.value>50){

                }
        }
    }

</script>

<nav>
    {#if $width > 700}
        <div class='desktopMenu' style='height: 50px;'>
            <a href='https://kodiia.com'>
                <img src={kodiia_logo_bw} alt='logo' width='70'>
            </a>
            <button class='smallMenuButton' on:click={()=>{navMenuDisplay === 'none' ? navMenuDisplay = 'block' : navMenuDisplay = 'none'}}>Settings</button>
            <a class='smallMenuButton' href='/'>Home</a>
            <!-- {#if data.user}
            <form action='/logout' method='POST'>
                <button type='submit' class='smallMenuButton'>Log Out</button>
            </form>
                <button class="smallMenuButton" on:click='{()=>{stylesPanelState.set(true)}}'>Set theme</button>
            {:else}
                <a class='smallMenuButton' href='/register'>Sign Up</a>
                <a class='smallMenuButton' href='/login'>Log In</a>
            {/if} -->
        </div>
    {:else}
    <div class='mobileMenu'>
        <a href='https://kodiia.com'>
            <img src={kodiia_logo_bw_small} alt='logo' width='20'>
        </a>
        <!-- <button class='smallMenuButton' on:click={()=>{navMenuDisplay === 'none' ? navMenuDisplay = 'block' : navMenuDisplay = 'none'}}>Settings</button>
        <a class='smallMenuButton' href='/'>Home</a>
    </div>
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
        </button> -->
        <button class='smallMenuButton' on:click={()=>{navMenuDisplay === 'none' ? navMenuDisplay = 'block' : navMenuDisplay = 'none'}}>Settings</button>
        <a class='smallMenuButton' href='/'>Home</a>
    </div>
    {/if}
</nav>

<div class='navMenu' style='display: {navMenuDisplay}; height: calc({$height}px - 60px);' >
    <button class="panelButton" on:click={()=>{navMenuDisplay = 'none';}} >    
        <svg xmlns="http://www.w3.org/2000/svg" width='10' height='10' viewBox="0 0 19.02 19.02"><title>icon_quit</title><line x1="0.5" y1="0.5" x2="18.52" y2="18.52" style="fill:none;stroke:#4233fb;stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/><line x1="0.5" y1="18.52" x2="18.52" y2="0.5" style="fill:none;stroke:#4233fb;stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/></svg>
    </button>
    <div class='setupsContainer'>
    <div class='statisticsContainer' style='margin-top: 0px;'>
        <h2 style='margin-top: 0px;'>World size</h2>
        <p>Minimal size is 1 and maximum is 20 in every direction</p>
        <div class='inputsGroup'>
            <div class='inputContainer'>
                <label for='xSize'>X</label>
                <input bind:this={worldX} name='xSize' id='xSize' type='text' value=10 on:change={()=>{x = parseInt(worldX.value); x > 20 ? x = 20 : x = x; x < 1 ? x = 1 : x = x; worldX.value = x}} />
            </div>
            <div class='inputContainer'>
                <label for='ySize'>Y</label>
                <input bind:this={worldY} name='ySize' id='ySize' type='text' value=10 on:change={()=>{y = parseInt(worldY.value); y > 20 ? y = 20 : y = y; y < 1 ? y = 1 : y = y; worldY.value = y}} />
            </div>
            <div class='inputContainer'>
                <label for='zSize'>Z</label>
                <input bind:this={worldZ} name='zSize' id='zSize' type='text' value=10 on:change={()=>{z = parseInt(worldZ.value); z > 20 ? z = 20 : z = z; z < 1 ? z = 1 : z = z; worldZ.value = z}} />
            </div>
        </div>

        <h2>Background color</h2>
        <p>Setup the background color</p>
        <div class='colorInputsGroup'>
            <div class='colorInputContainer'>
                <label for='color1'>{bgColor1Value}</label>
                <input bind:this={bgColor1} name='color1' id='color1' type='color' value='{bgColor1Value}' on:change={()=>{bgColor1Value = bgColor1.value}} />
            </div>
            <div class='colorInputContainer'>
                <label for='color2'>{bgColor2Value}</label>
                <input bind:this={bgColor2} name='color2' id='color2' type='color' value='{bgColor2Value}' on:change={()=>{bgColor2Value = bgColor2.value}} />
            </div>
        </div>

        <button on:click={proceduralWorld.updateWorld()} style='margin-bottom: 0px;'>Create new world</button>
    </div>
    <div class='challengesContainer'>
    </div>
    </div>
</div>


<div class='container' style='width: {$width}px; height: {$height}px; background: linear-gradient({bgColor1Value}, {bgColor2Value});'>
    <Canvas>
        <ProceduralWorlds bind:this={proceduralWorld} widthNum = {x} depthNum = {z} heightNum = {y}/>
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
        height: 100%;
        position: absolute;
        top: 60px;
        background: linear-gradient( 45deg, #ffffffc3, #ffffff90);
        backdrop-filter: blur(40px);
        -webkit-backdrop-filter: blur(40px);
        border-radius: 10px;
        padding: 10px;
        overflow: hidden;
        box-sizing: border-box;
        z-index: 2;
    }
    .setupsContainer{
        overflow-y: scroll;
        height: calc(100% - 20px);
        margin-top: 20px;
    }
    .desktopMenu{
        height: 100%;
        display: flex;
        align-items: center;
    }
    .mobileMenu{
        /* width: calc(100% - 10px); */
        height: 50px;
        display: flex;
        align-items: center;
        overflow-y: auto;
        /* margin-bottom: 10px; */
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
      padding: 0 0 0 15px;
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
    .inputsGroup{
        display: grid;
        grid-template-columns: repeat(auto-fit, 100px);
        grid-gap: 10px;
        margin-bottom: 20px;
    }
    .inputContainer{
        display: flex;
        align-items: center;
    }
    .colorInputsGroup{
        display: grid;
        grid-template-columns: repeat(auto-fit, 150px);
        grid-gap: 10px;
        margin-bottom: 20px;
    }    
    .colorInputContainer{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #f9f9f9;
        padding: 5px 10px;
        box-sizing: border-box;
        border-radius: 10px;
    }
    input[type='text']{
        margin: 5px 10px;
        max-width: 50px;
        border: 1px solid white;
        border-radius: 10px;
        padding: 10px;
        font-size: 1em;
        background: #f9f9f9;
    }
    input[type='color']{
        flex: 0 0 50px;
        /* margin: 5px 10px; */
        width: 50px;
        height: 50px;
        border: 1px solid #f9f9f9;
        border-radius: 10px;
        padding: 0px;
        font-size: 1em;
        background: #f9f9f9;
    }

    .statisticsContainer, .challengesContainer{
        /* width: 100%; */
        padding: 0px;
    }
    .container{
        background: rgb(189, 205, 217);
        filter: contrast(1.3);
    }
    .panelButton{
        position: fixed;
        top: 5px;
        right: 0px;
        margin-right: 5px;
            
        display: flex;
        align-items: center;
        justify-content: center;
        /* justify-content: space-between; */
        
        width: 20px;
        height: 20px;
        border-radius: 10px;
        border: none;
        background: #4233fb00;
        /* background: radial-gradient(#ca94ff, #4233fb); */
        color: white;
        box-sizing: content-box;
        padding: 0;
            
        cursor: pointer;
        transition: 0.25s;
    }
    .panelButton:hover{
        background: #4233fb20;
    }
</style>