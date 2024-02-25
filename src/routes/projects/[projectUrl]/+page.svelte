<script>
    import { filesLocalCopy, fileToOpen, editorState, width, height, docsPanelState, stylesPanelState, filesPanelDisplay, resourcesPanelDisplay } from '$lib/store'
    import ProjectPanel from '$lib/ProjectPanel.svelte';
    import NavPanel from '$lib/NavPanel.svelte';
    
    export let data

    let files = data.tutorial.files
    $filesLocalCopy = data.files

    $: filesPanelWidth = $width / 3 

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
</script>

<NavPanel data='{data}' />

<div class='container' style='width: {$width}px; height:{$height}px;'>

    <div class='panelsContainer'>
        <div style='flex: 1; height: 100%; padding: 5px; box-sizing: border-box; margin-left: 0px; background: none; position: relative;' >
            <div bind:this={resizeCoverDiv} style='position: absolute; z-index: 2; top: 5; left: 5; background: #00000005; border-radius: 15px; width: calc(100% - 10px); height: calc(100% - 10px);'></div>
            <ProjectPanel />
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
    }
    .resizeHandle{
        width: 5px;
        height: 100px;
        background: #4233fb50;
        border-radius: 5px;
        touch-action: none;
        pointer-events: auto;
        text-align: initial;
		cursor: ew-resize;
    }
</style>