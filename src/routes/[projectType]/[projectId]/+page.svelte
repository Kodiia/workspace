<script>
    import { fade, fly } from 'svelte/transition';
    import { filesLocalCopy, fileToOpen, editorState, width, height, filesPanelState, docsPanelState, stepsPanelState, resourcesPanelState } from '$lib/store'
    import FilesPanel from '$lib/FilesPanel.svelte';
    import ResourcesPanel from '$lib/ResourcesPanel.svelte';
    import { page } from '$app/stores';
    
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
        <button>Sign In</button>
    </nav>
    <div class='panelsContainer'>
        {#if $filesPanelState}
        <div transition:fade style='width: 100%; padding: 10px; transition: all 2s'>
            <FilesPanel files='{files}' projectName='{data.project.name}'/>
        </div>
        {/if}
        <div transition:fade style='width: 100%; padding: 10px; transition: all 2s;'>
            <iframe srcDoc="{userSRCDoc}" style="width: 100%; height: calc({$height}px - 70px); border-radius: 20px;" allow="accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share" allowfullscreen="true" allowtransparency="true" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation" name="Kodiia workspace" loading="lazy" title="userDoc" class="userContainer"  />
        </div>
        {#if data.type === 'project' && $resourcesPanelState}
            <div transition:fade style='width: 100%; padding: 10px;'>
                <ResourcesPanel docsHTML='{data.docsHTML}' mode='docs' />
            </div>
        {/if}
        {#if data.type === 'tutorial' && $resourcesPanelState}
            <div transition:fade style='width: 100%; padding: 10px;'>
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
        /* grid-auto-columns: 1fr; */
        /* display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
    }
    .userContainer {
        background: #fff;
        color: #1a1a1a;
        z-index: 0;
        border: none;
        border-radius: 25px;
        /* margin: 0 17px; */
        box-shadow: 0px 0px 5px rgba(61, 149, 238, 0.5);
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
