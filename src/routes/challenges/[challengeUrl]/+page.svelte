<script>
    import kodiia_logo_bw from '$lib/logos/kodiia_logo_bw.svg'
    import kodiia_logo_bw_small from '$lib/logos/kodiia_logo_bw_small.svg'
    import { fade } from 'svelte/transition';
    import { filesLocalCopy, fileToOpen, editorState, width, height, docsPanelState, stylesPanelState, filesPanelDisplay, resourcesPanelDisplay, textColor } from '$lib/store'
    import FilesPanel from '$lib/FilesPanel.svelte';
    import ResourcesPanel from '$lib/ResourcesPanel.svelte';
    import { page } from '$app/stores';
	import StylesPanel from '$lib/StylesPanel.svelte';
    import ProjectPanel from '$lib/ProjectPanel.svelte';
    import NavPanel from '$lib/NavPanel.svelte';
    
    export let data
    // console.log(data.challenge.stepsJSON)

    // let files = data.challenge.files
    filesLocalCopy.set([])
    // console.log($filesLocalCopy)
    filesLocalCopy.set(data.files)
    // console.log(data.files, $filesLocalCopy)

    let filesPanelWidth = $width / 3 
    if (filesPanelWidth < 400){
            filesPanelWidth = 400
        }

    $editorState = false

    //console.log(data)
    let resizeHandle, resizeState = false, resizeCoverDiv
    
    function resize(event){
        resizeCoverDiv.style.display = 'block'
        filesPanelWidth = event.clientX + 10
        if (filesPanelWidth < 400){
            filesPanelWidth = 400
            resizeState = false
        }
    }

</script>

<svelte:window on:pointermove={(e)=>{if(resizeState){resize(e)}}} on:pointerup={()=>{resizeState = false; resizeCoverDiv.style.display = 'none'}}/>

<NavPanel data={data}/>

<div class='container' style='width: {$width}px; height:{$height}px;'>
    
    {#if $stylesPanelState}
        <div style='position: absolute; top: 0px; right: 0px; padding: 10px; width: min(300px, 100%);'>
            <StylesPanel />
        </div>
    {/if}
    <div class='panelsContainer'>
        
        <div style='width: {$width > 700 ? filesPanelWidth + 'px' : '100%'}; position: {$width > 700 ? 'relative' : 'absolute'}; padding: 5px; box-sizing: border-box; display: {$filesPanelDisplay}'>
            <FilesPanel files='{data.files}' projectName='{data.challenge.heading}'/>
        </div>

        {#if $width > 700 && $filesPanelDisplay === 'block'}
            <div class='resizeHandle' style='background: hsl({$textColor + ', 20%'});' bind:this = {resizeHandle} on:pointerdown={(e)=>{ resizeState = true }}></div>
        {/if}
    
        <div style='flex: 1; height: 100%; padding: 5px; box-sizing: border-box; margin-left: 0px; background: none; position: relative;' >
            <div bind:this={resizeCoverDiv} style='position: absolute; z-index: 2; top: 5; left: 5; background: #00000005; border-radius: 15px; width: calc(100% - 10px); height: calc(100% - 10px);'></div>
            <ProjectPanel />
        </div>

        <div style='width: {$width > 700 ? '400px' : '100%'}; position: {$width > 700 ? 'static' : 'absolute'}; padding: 5px; box-sizing: border-box; display: {$resourcesPanelDisplay};'>
            <ResourcesPanel steps='{data.challenge.stepsJSON}' mode='tutorial' URLtoShare='{$page.url.href}' />
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
    }
    .resizeHandle{
        /* flex: 0 0 20px; */
        width: 5px;
        height: calc(100% - 10px);
        background: #4233fb50;
        border-radius: 5px;
        touch-action: none;
        pointer-events: auto;
        text-align: initial;
		cursor: ew-resize;
    }
</style>
