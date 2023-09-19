<script>
    import { Canvas } from '@threlte/core'
    import ProceduralWorlds from '$lib/ProceduralWorlds.svelte';
    import { width, height, selectedAsset, assetOptionsPanelDisplay, worldData } from '$lib/store'
    import { fade } from 'svelte/transition';
    import kodiia_logo_bw from '$lib/logos/kodiia_logo_bw.svg'
    import kodiia_logo_bw_small from '$lib/logos/kodiia_logo_bw_small.svg'

    let navMenuDisplay = 'none'
    let mobileMenuDisplay = 'none'
    let optionsPanelDisplay = 'block'
    let worldX, worldY, worldZ, assetX, assetY, assetZ, assetXRot, assetYRot, assetZRot
    let x = 10, y = 10, z = 10
    let proceduralWorld
    let bgColor1, bgColor1Value = '#bdcdd9', bgColor2, bgColor2Value = '#6a82b4'

    
    let assetColor, assetColorValue = '#ffffff'



    function updateInputValue(name = 'x'){
        switch (name) {
            case 'x':
                if(worldX.value>50){

                }
        }
    }


    let item

</script>

<nav>
    {#if $width > 700}
        <div class='desktopMenu' style='height: 50px;'>
            <a href='https://kodiia.com'>
                <img src={kodiia_logo_bw} alt='logo' width='70'>
            </a>
            <button class='smallMenuButton' on:click={()=>{optionsPanelDisplay === 'none' ? optionsPanelDisplay = 'block' : optionsPanelDisplay = 'none'}}>Options</button>
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
    <div style='display: flex; align-items: center; justify-content: space-between;'>
        <a href='https://kodiia.com'>
            <img src={kodiia_logo_bw_small} alt='logo' width='20'>
        </a>
        <!-- <button class='smallMenuButton' on:click={()=>{optionsPanelDisplay === 'none' ? optionsPanelDisplay = 'block' : optionsPanelDisplay = 'none'}}>Settings</button>
        <a class='smallMenuButton' href='/'>Home</a> -->
    
        <div class='navButtons'>
            <button class='menuButton' on:click={()=>{mobileMenuDisplay === 'none' ? mobileMenuDisplay = 'block' : mobileMenuDisplay = 'none'}}>
                {#if mobileMenuDisplay === 'none'}
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
        </div>
    </div>
        <hr style='display: {mobileMenuDisplay}; margin: 0;'>
        <div class='mobileMenu' style='display: {mobileMenuDisplay}; height: calc({$height}px - 60px);'>
            <button class='smallMenuButton' style='padding: 5px 10px;' on:click={()=>{optionsPanelDisplay === 'none' ? optionsPanelDisplay = 'block' : optionsPanelDisplay = 'none'; mobileMenuDisplay = 'none'}}>Options</button>
            <a class='smallMenuButton' style='padding: 5px 10px;' href='/'>Home</a>
        </div>

    {/if}
</nav>

<div class='optionsPanel' style='width: {$width > 700 ? "400px" : "calc(100% - 10px)"}; display: {optionsPanelDisplay}; height: calc({$height}px - 60px); ' >
    <button class="panelButton" on:click={()=>{optionsPanelDisplay = 'none';}} >    
        <svg xmlns="http://www.w3.org/2000/svg" width='10' height='10' viewBox="0 0 19.02 19.02"><title>icon_quit</title><line x1="0.5" y1="0.5" x2="18.52" y2="18.52" style="fill:none;stroke:#4233fb;stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/><line x1="0.5" y1="18.52" x2="18.52" y2="0.5" style="fill:none;stroke:#4233fb;stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/></svg>
    </button>
    <h2 style='margin: 0 0 0 10px; height: 40px;'>World Options</h2>
    <div class='setupsContainer'>
    <div class='statisticsContainer' style='margin-top: 0px;'>

        <p style='margin-left: 10px;'>Assets number: {$worldData.assetsNumber}</p>
        
        <div class='setupsBlock'>
            <h3 style='margin-top: 0px;'>World size</h3>
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
        </div>

        <div class='setupsBlock'>
            <h3 style='margin-top: 0px;'>Background color</h3>
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
        </div>

        <button on:click={proceduralWorld.updateWorld()} style='margin: 20px 0 0 10px;'>Create new world</button>
    </div>
    <div class='challengesContainer'>
    </div>
    </div>
</div>


<div class='assetOptionsPanel' style='display: {$assetOptionsPanelDisplay}; width: {$width > 700 ? "400px" : "calc(100% - 10px)"}; height: calc({$height}px - 60px);'>
    <button class="panelButton" on:click={()=>{$assetOptionsPanelDisplay = 'none';}} >    
        <svg xmlns="http://www.w3.org/2000/svg" width='10' height='10' viewBox="0 0 19.02 19.02"><title>icon_quit</title><line x1="0.5" y1="0.5" x2="18.52" y2="18.52" style="fill:none;stroke:#4233fb;stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/><line x1="0.5" y1="18.52" x2="18.52" y2="0.5" style="fill:none;stroke:#4233fb;stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/></svg>
    </button>
    

    <!-- <button on:click={()=>{item = proceduralWorld.getAssetData(); console.log(proceduralWorld.getAssetData())}} style='margin: 0 0 0 10px;'>Create new world</button> -->
    <h2 style='margin: 0 0 0 10px; height: 40px;'>Asset Options</h2>
    <div class='setupsContainer'>
    <div class='setupsBlock'>
        <h3 style='margin-top: 0px;'>Position</h3>
        <p>Change position of the asset</p>
        <div class='inputsGroup'>
            <div class='inputContainer'>
                <label for='xPos'>X</label>
                <input name='xPos' bind:this={assetX} id='xPos' type='text' value={$selectedAsset.x} on:change={()=>{$selectedAsset.x = parseInt(assetX.value); console.log(assetX.value); $selectedAsset.x > 20 ? $selectedAsset.x = 20 : $selectedAsset.x = $selectedAsset.x; $selectedAsset.x < 0 ? $selectedAsset.x = 0 : $selectedAsset.x = $selectedAsset.x; assetX.value = $selectedAsset.x; proceduralWorld.setAssetPosition()}} />
            </div>
            <div class='inputContainer'>
                <label for='yPos'>Y</label>
                <input name='yPos' bind:this={assetY} id='yPos' type='text' value={$selectedAsset.y} on:change={()=>{$selectedAsset.y = parseInt(assetY.value); $selectedAsset.y > 20 ? $selectedAsset.y = 20 : $selectedAsset.y = $selectedAsset.y; $selectedAsset.y < 0 ? $selectedAsset.y = 0 : $selectedAsset.y = $selectedAsset.y; assetY.value = $selectedAsset.y; proceduralWorld.setAssetPosition()}} />
            </div>
            <div class='inputContainer'>
                <label for='zPos'>Z</label>
                <input name='zPos' bind:this={assetZ} id='zPos' type='text' value={$selectedAsset.z} on:change={()=>{$selectedAsset.z = parseInt(assetZ.value); $selectedAsset.z > 20 ? $selectedAsset.z = 20 : $selectedAsset.z = $selectedAsset.z; $selectedAsset.z < 0 ? $selectedAsset.z = 1 : $selectedAsset.z = $selectedAsset.z; assetZ.value = $selectedAsset.z; proceduralWorld.setAssetPosition()}} />
            </div>
        </div>
    </div>

    <div class='setupsBlock'>
        <h3 style='margin-top: 0px;'>Rotation</h3>
        <p>Change rotation of the asset</p>
        <div class='inputsGroup'>
            <div class='inputContainer'>
                <label for='xRot'>X</label>
                <input name='xRot' bind:this={assetXRot} id='xRot' type='text' value={Math.floor(($selectedAsset.rotX * 180)/Math.PI)} on:change={()=>{$selectedAsset.rotX = parseInt(assetXRot.value) * Math.PI / 180; proceduralWorld.setAssetRotation()}} />
            </div>
            <div class='inputContainer'>
                <label for='yRot'>Y</label>
                <input name='yRot' bind:this={assetYRot} id='yRot' type='text' value={Math.floor(($selectedAsset.rotY * 180)/Math.PI)} on:change={()=>{$selectedAsset.rotY = parseInt(assetYRot.value) * Math.PI / 180; proceduralWorld.setAssetRotation()}} />
            </div>
            <div class='inputContainer'>
                <label for='zRot'>Z</label>
                <input name='zRot' bind:this={assetZRot} id='zRot' type='text' value={Math.floor(($selectedAsset.rotZ * 180)/Math.PI)} on:change={()=>{$selectedAsset.rotZ = parseInt(assetZRot.value) * Math.PI / 180; proceduralWorld.setAssetRotation()}} />
            </div>
        </div>
    </div>

    <div class='setupsBlock'>
        <h3 style='margin-top: 0px;'>Color</h3>
        <p>Change color of the asset</p>
        <div class='colorInputsGroup'>
            <div class='colorInputContainer'>
                <label for='assetColor'>{$selectedAsset.assetColor}</label>
                <input bind:this={assetColor} name='assetColor' id='assetColor' type='color' value='{$selectedAsset.assetColor}' on:change={()=>{$selectedAsset.assetColor = assetColor.value; assetColorValue = assetColor.value; proceduralWorld.setAssetColor()}} />
            </div>
        </div>
    </div>


    <button on:click={proceduralWorld.removeElementfromPoints()} style='margin: 20px 0 0 10px;'>Remove Asset</button>

    </div>

</div>


<div class='container' style='width: {$width}px; height: {$height}px; background: linear-gradient({bgColor1Value}, {bgColor2Value});'>
    <Canvas>
        <ProceduralWorlds bind:this={proceduralWorld} widthNum = {x} depthNum = {z} heightNum = {y}/>
    </Canvas>
</div>

<style>
    nav{
        width: 100%;
        min-height: 50px;
        /* display: flex; */
        /* margin-bottom: 10px; */
        position: fixed;
        padding: 0 20px;
        top: 0;
        left: 0;
        background: linear-gradient( 45deg, #ffffffc3, #ffffff90);
        backdrop-filter: blur(40px);
        -webkit-backdrop-filter: blur(40px);
        border-radius: 0 0 10px 10px;
        box-sizing: border-box;
        z-index: 10;
    }
    .navButtons{
        display: flex;
        justify-content: space-between;
    }
    .mobileMenu{
        /* width: calc(100% - 10px); */
        overflow-y: auto;
        margin-bottom: 10px;
    }
    .menuButton{
        padding: 5px;
        width: 50px;
        height: 50px;
        border: none;
        transform: scale(1.0);
    }
    .menuButton:hover{
        background: none;
        transform: scale(1.1);
    }
    .optionsPanel, .assetOptionsPanel{
        width: 400px;
        margin: 5px;
        height: 100%;
        position: absolute;
        top: 50px;
        background: linear-gradient( 45deg, #ffffffc3, #ffffff90);
        backdrop-filter: blur(40px);
        -webkit-backdrop-filter: blur(40px);
        border-radius: 10px;
        padding: 10px;
        overflow: hidden;
        box-sizing: border-box;
        z-index: 2;
    }
    .assetOptionsPanel{
        right: 0;
    }
    .setupsContainer{
        overflow-y: scroll;
        height: calc(100% - 60px);
        margin-top: 20px;
        position: relative;
    }
    .setupsBlock{
        margin: 10px;
        padding: 10px;
        background: #fdfdfd;
        border-radius: 10px;
        box-shadow: 0 0 10px #3295ee50;
        box-sizing: border-box;
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
    /* .menuButton, .assetsMenuButton{
        padding: 5px;
        width: 50px;
        height: 50px;
        border: none;
        transform: scale(1.0);
    }
    .menuButton:hover, .assetsMenuButton:hover{
        background: none;
        transform: scale(1.1);
    } */
    .inputsGroup{
        display: grid;
        grid-template-columns: repeat(auto-fit, 100px);
        grid-gap: 10px;
        /* margin-bottom: 20px; */
    }
    .inputContainer{
        display: flex;
        align-items: center;
    }
    .colorInputsGroup{
        display: grid;
        grid-template-columns: repeat(auto-fit, 150px);
        grid-gap: 10px;
        /* margin-bottom: 20px; */
    }    
    .colorInputContainer{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #ededed;
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
        background: #ededed;
    }
    input[type='color']{
        flex: 0 0 50px;
        /* margin: 5px 10px; */
        width: 50px;
        height: 50px;
        border: 1px solid #ededed;
        border-radius: 10px;
        padding: 0px;
        font-size: 1em;
        background: #ededed;
        cursor: pointer;
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
        position: absolute;
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