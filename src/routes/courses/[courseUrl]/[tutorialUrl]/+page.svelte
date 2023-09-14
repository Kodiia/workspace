<script>
    import kodiia_logo_bw from '$lib/logos/kodiia_logo_bw.svg'
    import kodiia_logo_bw_small from '$lib/logos/kodiia_logo_bw_small.svg'
    import { fade } from 'svelte/transition';
    import { filesLocalCopy, fileToOpen, editorState, width, height, docsPanelState, stylesPanelState, filesPanelDisplay, resourcesPanelDisplay } from '$lib/store'
    import FilesPanel from '$lib/FilesPanel.svelte';
    import ResourcesPanel from '$lib/ResourcesPanel.svelte';
    import { page } from '$app/stores';
	import StylesPanel from '$lib/StylesPanel.svelte';
    import ProjectPanel from '$lib/ProjectPanel.svelte';
    
    export let data

    // if(data.type === 'tutorial'){
    //     docsPanelState.set(false);
    //     stepsPanelState.set(true);
    // }
    // if(data.type === 'project'){
    //     stepsPanelState.set(false);
    //     docsPanelState.set(true);
    // }

    let files = data.tutorial.files
    $filesLocalCopy = data.files

    let mobileMenuDisplay = 'none'
    $: filesPanelWidth = $width / 3 
    // let filesPanelDisplay = 'none'
    // let resourcesPanelDisplay = 'none'
    // console.log($page)

    let drag = false
</script>

<nav>
    {#if $width > 700}
        <div class='desktopMenu' style='height: 50px;'>
            <a href='https://kodiia.com'>
                <img src={kodiia_logo_bw} alt='logo' width='70'>
            </a>
            <a class='smallMenuButton' style='padding: 0 0 0 20px;' href='/courses/{$page.params.courseUrl}'>Contents</a>
            <button class="smallMenuButton" on:click='{()=>{$filesPanelDisplay = 'block'}}'>Files</button>
            {#if data.type === 'tutorial'}
                <button class="smallMenuButton" on:click='{()=>{$resourcesPanelDisplay = 'block'}}'>Steps</button>
            {/if}
            <a class='smallMenuButton' href='/'>Home</a>
            {#if data.user}
            <form action='/logout' method='POST'>
                <button type='submit' class='smallMenuButton'>Log Out</button>
            </form>
                <button class="smallMenuButton" on:click='{()=>{stylesPanelState.set(true)}}'>Set theme</button>
            {:else}
                <a class='smallMenuButton' href='/register'>Sign Up</a>
                <a class='smallMenuButton' href='/login'>Log In</a>
            {/if}
        </div>
    {:else}
        <div style='display: flex; align-items: center; justify-content: space-between;'>
            <a href='https://kodiia.com'>
                <img src={kodiia_logo_bw_small} alt='logo' width='20'>
            </a>

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
        <hr style='display: {mobileMenuDisplay}; max-height: calc({$height}px - 70px);'>
        <div class='mobileMenu' style='display: {mobileMenuDisplay}; height: calc({$height}px - 70px);'>
            <a class='smallMenuButton' style='padding: 10px;' href='/courses/{$page.params.courseUrl}'>Contents</a>
            <button class="smallMenuButton" style='padding: 10px;' on:click='{()=>{$filesPanelDisplay = 'block'; $resourcesPanelDisplay = 'none'; mobileMenuDisplay = 'none'}}'>Files</button>
            {#if data.type === 'tutorial'}
                <button class="smallMenuButton" style='padding: 10px;' on:click='{()=>{$resourcesPanelDisplay = 'block'; $filesPanelDisplay = 'none'; mobileMenuDisplay = 'none'}}'>Steps</button>
            {/if}
            <a class='smallMenuButton' style='padding: 10px;' href='/'>Home</a>
            {#if data.user}
            <form action='/logout' method='POST'>
                <button type='submit' class='smallMenuButton' style='padding: 10px;'>Log Out</button>
            </form>
                <button class="smallMenuButton" style='padding: 10px;' on:click='{()=>{stylesPanelState.set(true)}}'>Set theme</button>
            {:else}
                <a class='smallMenuButton' style='padding: 10px;' href='/register'>Sign Up</a>
                <a class='smallMenuButton' style='padding: 10px;' href='/login'>Log In</a>
            {/if}
        </div>
    {/if}
</nav>

<div class='container' style='width: {$width}px; height:{$height}px;'>
    
    {#if $stylesPanelState}
        <div style='position: absolute; top: 0px; right: 0px; padding: 10px; width: min(300px, 100%);'>
            <StylesPanel />
        </div>
    {/if}
    <div class='panelsContainer' on:pointerup={()=>{drag = false; console.log(drag)}}>
        
        <div style='width: {$width > 700 ? filesPanelWidth + 'px' : '100%'}; position: {$width > 700 ? 'static' : 'absolute'}; padding: 5px; box-sizing: border-box; display: {$filesPanelDisplay}'>
            <FilesPanel files='{files}' projectName='{data.tutorial.heading}'/>
        </div>

        {#if $width > 700 && $filesPanelDisplay === 'block'}
            <div class='resizeHandle'>
                <button class='resizeButton' on:click={()=>{filesPanelWidth < $width / 1.5 ? filesPanelWidth += 100 : filesPanelWidth = filesPanelWidth}}>&gt;</button>
                <button class='resizeButton' on:click={()=>{filesPanelWidth > 500 ? filesPanelWidth -= 100 : filesPanelWidth = filesPanelWidth; console.log(filesPanelWidth)}}>&lt;</button>
            </div>
        {/if}
    
        <div class='rightSideContainer' >
        <div style='width: 100%; height: 100%; padding: 5px; box-sizing: border-box;' on:pointerup={()=>{drag = false; console.log(drag)}}>
            <ProjectPanel />
            <!-- <iframe srcDoc="{userSRCDoc}" style="width: 100%; height: calc({$height}px - 70px); border-radius: 15px;" allow="accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share" allowfullscreen="true" allowtransparency="true" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation" name="Kodiia workspace" loading="lazy" title="userDoc" class="userContainer"  /> -->
        </div>

        <div style='width: 100%; max-width: 700px; position: {$width > 700 ? 'static' : 'absolute'}; padding: 5px; box-sizing: border-box; display: {$resourcesPanelDisplay};'>
            <ResourcesPanel steps='{data.tutorial.stepsJSON}' mode='tutorial' URLtoShare='{$page.url.href}' />
        </div>
        </div>


    </div>
</div>


<style>

    div{
        overflow: hidden;
    }   
    .panelsContainer{
        position: absolute;
        top: 50px;
        width: 100%;
        height: calc(100% - 50px);
        display: flex;
        align-items: center;
        justify-content: center;
        /* padding: 10px; */
        /* grid-auto-columns: 1fr; */
        /* display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
    }
    .resizeHandle{
        flex: 0 0 20px;
        width: 20px;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background: none;
    }
    .resizeButton{
        width: 20px;
        height: 20px;
        border: none;
        border-radius: 10px;
        background: #4233fb50;
        color: #f9f9f9;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        touch-action: none;
    }
    .resizeButton:hover{
        background: #4233fb;
    }
    .rightSideContainer{
        /* width: 100%; */
        display: flex;
        height: 100%;
        flex-grow: 1;
    }
    .userContainer {
        background: #fff;
        color: #1a1a1a;
        z-index: 0;
        border: none;
        border-radius: 15px;
        /* margin: 0 17px; */
        box-shadow: 0px 0px 10px rgba(61, 149, 238, 0.5);
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
    .smallMenuButton:hover, .activeSmallMenuButton {
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
    /* .activeSmallMenuButton::after{
        content: ' ';
        display: block;
        background: #3d95ee;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        margin: 5px;
    } */
    nav{
        width: 100%;
        min-height: 50px;
        /* display: flex;
        align-items: center; */
        /* margin-bottom: 10px; */
        position: fixed;
        padding: 0 20px;
        top: 0;
        left: 0;
        background: linear-gradient( 45deg, #ffffffc3, #ffffff90);
        backdrop-filter: blur(40px);
        -webkit-backdrop-filter: blur(40px);
        border-radius: 0 0 10px 10px;
        z-index: 10;
        box-sizing: border-box;
    }
    .mobileMenu{
        /* width: calc(100% - 10px); */
        overflow-y: auto;
        margin-bottom: 10px;
    }
    .desktopMenu{
        height: 100%;
        display: flex;
        align-items: center;
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
</style>
