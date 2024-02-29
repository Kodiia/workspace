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
    import NavPanel from '$lib/NavPanel.svelte';
    
    export let data

    let files = data.template.files
    $filesLocalCopy = data.files

    $: filesPanelWidth = $width / 3 

    console.log(data)
    $editorState = false

    let resizeHandle, resizeState = false, resizeCoverDiv
    
    function resize(event){
        resizeCoverDiv.style.display = 'block'
        filesPanelWidth = event.clientX + 10
        if (filesPanelWidth < 400){
            filesPanelWidth = 400
            resizeState = false
        }
    }

    function getProjectPanelWidth(){
        let projectPanelWidth = $width - 10;
        if($filesPanelDisplay === 'block'){
            projectPanelWidth = $width - filesPanelWidth
        }
        if($resourcesPanelDisplay === 'block'){
            projectPanelWidth = $width - 400
        }
        if($filesPanelDisplay === 'block' && $resourcesPanelDisplay === 'block'){
            projectPanelWidth = $width - filesPanelWidth - 400
        }
        return projectPanelWidth
    }
</script>

<svelte:window on:pointermove={(e)=>{if(resizeState){resize(e)}}} on:pointerup={()=>{resizeState = false; resizeCoverDiv.style.display = 'none'}}/>

<NavPanel data={data} />

<div class='container' style='width: {$width}px; height:{$height}px;'>
    
    {#if $stylesPanelState}
        <div style='position: absolute; top: 0px; right: 0px; padding: 10px; width: min(300px, 100%);'>
            <StylesPanel />
        </div>
    {/if}
    <div class='panelsContainer'>
        
        <div style='width: {$width > 700 ? filesPanelWidth + 'px' : '100%'}; position: {$width > 700 ? 'relative' : 'absolute'}; padding: 5px; box-sizing: border-box; display: {$filesPanelDisplay}'>
            <FilesPanel files='{files}' projectName='{data.template.name}' editorType = 'monaco'/>

            
        </div>

        {#if $width > 700 && $filesPanelDisplay === 'block'}
            <div class='resizeHandle' bind:this = {resizeHandle} on:pointerdown={(e)=>{ resizeState = true }}></div>
        {/if}
    
        <div style='flex: 1; height: 100%; padding: 5px; box-sizing: border-box; margin-left: 0px; background: none; position: relative;' >
            <div bind:this={resizeCoverDiv} style='position: absolute; z-index: 2; top: 5; left: 5; background: #00000005; border-radius: 15px; width: calc(100% - 10px); height: calc(100% - 10px);'></div>
            <ProjectPanel />
        </div>

        <div style='width: {$width > 700 ? '400px' : '100%'}; position: {$width > 700 ? 'static' : 'absolute'}; padding: 5px; box-sizing: border-box; display: {$resourcesPanelDisplay};'>
            <ResourcesPanel steps='{data.template.hints}' mode='template' URLtoShare='{$page.url.href}' />
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
        /* justify-content: center; */
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
    .resizeHandle{
        /* flex: 0 0 20px; */
        width: 5px;
        height: 100px;
        background: #4233fb50;
        border-radius: 5px;
        touch-action: none;
        pointer-events: auto;
        text-align: initial;
        /* display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background: none; */

        /* position: absolute;
        top: 0;
		right: 0; */
		/* margin-right: -20px; */
		/* width: 20px;
		height: 100%;
		background: grey; */
		cursor: ew-resize;
    }
    /* .resizeButton{
        width: 20px;
        height: 100px;
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
    } */
</style>
