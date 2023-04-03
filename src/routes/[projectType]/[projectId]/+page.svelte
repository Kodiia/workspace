<script>
    import { fade } from 'svelte/transition';
    import { filesLocalCopy, fileToOpen, editorState, width, height, filesPanelState, docsPanelState, stepsPanelState, resourcesPanelState, stylesPanelState } from '$lib/store'
    import FilesPanel from '$lib/FilesPanel.svelte';
    import ResourcesPanel from '$lib/ResourcesPanel.svelte';
    import { page } from '$app/stores';
	import StylesPanel from '$lib/StylesPanel.svelte';
    
    export let data
    console.log('page data', data, $page.url.href)
    // console.log('DATA TYPE', data.type)
    if(data.type === 'tutorial'){
        docsPanelState.set(false);
        stepsPanelState.set(true);
    }
    if(data.type === 'project'){
        stepsPanelState.set(false);
        docsPanelState.set(true);
    }

    let files = data.project.files
    $filesLocalCopy = data.files

    let userSRCDoc
    // let filesPanelState = true, docsPanelState = true, stepsPanelState = false;

    filesLocalCopy.subscribe(value => {
        // console.log('updated')
        userSRCDoc = `<html>
            <body>${getFileContents('index.html')}</body>
            <style>${getFileContents('style.css')}</style>
            <script type='module'>${getFileContents('script.js')}<\/script>
               
        </html>`
    })

    

    function getFileContents(fileToSearch){
        for(let file of $filesLocalCopy){
            if(file.fileName === fileToSearch){
                console.log('this is ', file.fileData)
                return file.fileData   
            }
        }
    }


    
</script>

<div class='container' style='width: {$width}px; height:{$height}px;'>
    <nav>
        <div class='desktopMenu'>
            <a href='../' aria-label="menu" class='smallMenuButton'>Dashboard</a>
            <button class="smallMenuButton" on:click='{()=>{filesPanelState.set(true)}}'>Files</button>
            {#if data.type === 'project'}
            <button class="smallMenuButton" on:click='{()=>{resourcesPanelState.set(true)}}'>Docs</button>
            {/if}
            {#if data.type === 'tutorial'}
            <button class="smallMenuButton" on:click='{()=>{resourcesPanelState.set(true)}}'>Steps</button>
            {/if}
        </div>
        <div class='desktopMenu'>
            <button class="smallMenuButton" on:click='{()=>{stylesPanelState.set(true)}}'>Set theme</button>
            <button>Sign In</button>
        </div>
    </nav>

    {#if $stylesPanelState}
        <div style='position: absolute; top: 0px; right: 0px; padding: 10px; width: min(300px, 100%);'>
            <StylesPanel />
        </div>
    {/if}
    <div class='panelsContainer'>
        
        <div transition:fade style='box-sizing: border-box; width: {$filesPanelState ? '100%' : '0px'}; padding: {$filesPanelState ? '10px' : '0px'}; transition: all 0.125s;'>
            <FilesPanel files='{files}' projectName='{data.project.name}'/>
        </div>
    
        <div transition:fade style='width: 100%; padding: 10px; transition: all 0.125s;'>
            <iframe srcDoc="{userSRCDoc}" style="width: 100%; height: calc({$height}px - 70px); border-radius: 15px;" allow="accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share" allowfullscreen="true" allowtransparency="true" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation" name="Kodiia workspace" loading="lazy" title="userDoc" class="userContainer"  />
        </div>
        {#if data.type === 'project'}
            <div transition:fade style='box-sizing: border-box; width: {$resourcesPanelState ? '100%' : '0px'}; padding: {$resourcesPanelState ? '10px' : '0px'}; transition: all 0.125s;'>
                <ResourcesPanel docsHTML='{data.docsHTML}' mode='docs' />
            </div>
        {/if}
        {#if data.type === 'tutorial'}
            <div transition:fade style='box-sizing: border-box; width: {$resourcesPanelState ? '100%' : '0px'}; padding: {$resourcesPanelState ? '10px' : '0px'}; transition: all 0.125s;'>
                <ResourcesPanel steps='{data.project.stepsJSON}' mode='tutorial' URLtoShare='{$page.url.href}' />
            </div>
        {/if}
        
        <!-- {#if data.type === 'project'}
            <ResourcesPanel docsHTML='{data.docsHTML}' mode='docs' state='{docsPanelState}'/>
        {/if}
        {#if data.type === 'tutorial'}
            <ResourcesPanel steps='{data.project.stepsJSON}' mode='tutorial' URLtoShare='{$page.url.href}' state='{stepsPanelState}'/>
        {/if} -->
    </div>
</div>


<style>

    div{
        overflow: hidden;
    }   
    .panelsContainer{
        display: flex;
        align-items: center;
        justify-content: center;
        /* padding: 10px; */
        /* grid-auto-columns: 1fr; */
        /* display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
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
      padding: 0 20px 0 0;
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
        height: 40px;
        border-radius: 20px;
        background: #fdfdfd;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15));
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        padding: 0 20px;
        margin: 10px 10px 0 10px;
        box-shadow: 0px 0px 5px rgba(61, 149, 238, 0.3);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .desktopMenu{
        display: flex;
        align-items: center;
    }
</style>
