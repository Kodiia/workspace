<script>
    import { filesLocalCopy, fileToOpen, editorState, width, height, docsPanelState, stylesPanelState, filesPanelDisplay, resourcesPanelDisplay, bgColor, textColor, primaryColor, secondaryColor, accentColor, runCode } from '$lib/store'
    import ProjectPanel from '$lib/ProjectPanel.svelte';
    import NavPanel from '$lib/NavPanel.svelte';
    import FilesPanel from '$lib/FilesPanel.svelte';
    import ResourcesPanel from '$lib/ResourcesPanel.svelte';
    import ProjectFileCard from '$lib/ProjectFileCard.svelte'
    import CodeEditorMonaco from '$lib/CodeEditorMonaco.svelte';
    import JSZip from 'jszip';
    
    export let data
    // console.log(data)
    $runCode = true
    $filesPanelDisplay = 'none'
    let projectName = data.project.name
    let files = data.project.files
    $filesLocalCopy = data.files
    let filesPanelWidth = 400
    $: filesPanelWidth > 0 ? filesPanelWidth : 400

    $editorState = false

    let button, resizeHandle, resizeState = false, resizeCoverDiv
    let editorText = ''
    
    function resize(event){
        resizeCoverDiv.style.display = 'block'
        filesPanelWidth = event.clientX + 10
        if (filesPanelWidth < 400){
            filesPanelWidth = 400
            resizeState = false
        }
    }

    function runEditor(){
        getFileText()
        $editorState = !$editorState;  
    }

    function getFileText(){
        for (let file of $filesLocalCopy){
            if($fileToOpen === file.fileName){
                editorText = file.fileData
            }
        }
    }

    var zip = new JSZip()

    async function downloadFiles(){
        const zipFileName = projectName.replace(/\s/g, '');
        let folder = zip.folder(zipFileName)
        for(let file of $filesLocalCopy){
            folder.file(file.fileName, file.fileData)
        }

        let zipFile = await zip.generateAsync({type:"blob"})

        const hiddenElement = document.createElement('a');
        hiddenElement.download = zipFileName + '.zip';

        const url = URL.createObjectURL(zipFile);
        hiddenElement.href = url
        hiddenElement.click();
        hiddenElement.remove()
    }
</script>

<svelte:window on:pointermove={(e)=>{if(resizeState){resize(e)}}} on:pointerup={()=>{resizeState = false; resizeCoverDiv.style.display = 'none'}}/>

<!-- <NavPanel data='{data}' /> -->

<div class='container' style='width: {$width}px; height:{$height}px;'>

    <div class='panelsContainer'>
        <div style='width: {$width > 700 ? filesPanelWidth + 'px' : '100%'}; position: {$width > 700 ? 'relative' : 'absolute'}; padding: 5px; box-sizing: border-box; display: {$filesPanelDisplay}'>
            <!-- <FilesPanel files='{files}' projectName='{data.project.name}' editorType = 'monaco'/> -->
            {#if $filesPanelDisplay === 'block'}
            <div class='panel' style='height: calc({$height}px - 60px); z-index: 3; background: hsl({$bgColor}); border: 1px solid hsl({$textColor + ', 20%'})' >
                <button bind:this={button} class="panelButton" on:click={()=>{$filesPanelDisplay = 'none';}} >    
                
                <svg xmlns="http://www.w3.org/2000/svg" width='10' height='10' viewBox="0 0 19.02 19.02"><title>icon_quit</title><line x1="0.5" y1="0.5" x2="18.52" y2="18.52" style="fill:none;stroke: hsl({$textColor}); stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/><line x1="0.5" y1="18.52" x2="18.52" y2="0.5" style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/></svg>
                </button>
            
                
                    <!-- <div class='handle' on:pointerdown={()=>{setUserPanelSize = true}} on:pointerup={()=>{setUserPanelSize = false}} on:pointermove={updateUserPanelSize} on:pointerleave={()=>{setUserPanelSize = false}}></div> -->
                    <div class='contentContainer'>
                        <div>
                            <h3 style="margin: 0; font-weight: 300; height: 50px;">{projectName}</h3>
                            <!-- <input type='text' name='projectName' class='formInput' value='{projectName}' style='background: hsl({$secondaryColor}); color: hsl({$textColor});'/> -->
                        </div>
                        <div class='filesAndEditorWrapper'>
                            {#if $editorState}
                                <div style='height: calc(100% - 0px); background: none;'>
                                        <CodeEditorMonaco fileName='{$fileToOpen}' readOnly='{false}' editorText='{editorText}'/> 
                                </div>
                            {:else}
                                <div class='filesContainer'>
                                    <p>Click files to open</p>
                                    {#each data.files as file, index}
                                        <ProjectFileCard name='{file.fileName}' action={runEditor}/>
                                    {/each}
                                    
                                </div>
                                
                            {/if}
                        </div>

                        <div class='bottomButtonsWrapper'>
                            <button type="button" style='border: none; display: flex; justify-content: center; align-items: center; width: 100px; height: 40px; margin-top: 10px; background: hsl({$primaryColor}); color: #1a1a1a;' on:click={()=>{$runCode === true ? $runCode = false : $runCode = true}}>{$runCode === false ? 'Run' : 'Stop'}</button>
                        </div>
                    </div>    
                
                </div>
                {/if}
        
        </div>

        {#if $width > 700 && $filesPanelDisplay === 'block'}
            <div class='resizeHandle' style='background: hsl({$textColor + ', 20%'});' bind:this = {resizeHandle} on:pointerdown={(e)=>{ resizeState = true }}></div>
        {/if}

        <div style='flex: 1; height: 100%; padding: 0px; box-sizing: border-box; margin-left: 0px; background: none; position: relative;' >
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
        /* top: 50px; */
        width: 100%;
        height: calc(100% - 0px);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .resizeHandle{
        width: 5px;
        height: calc(100% - 10px);
        background: #4233fb50;
        border-radius: 5px;
        touch-action: none;
        pointer-events: auto;
        text-align: initial;
		cursor: ew-resize;
    }
    .panel{
            box-sizing: border-box;
            width: 100%;
            position: relative;
            background: #fdfdfd;
            background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border-radius: 15px;
            padding: 10px;
            box-sizing: border-box;
            /* margin: 10px; */
            transition: width 0.25s;
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
        .contentContainer{
            width: 100%;
            height: 100%;
        }
        .filesAndEditorWrapper{
            height: calc(100% - 100px);
            overflow-y: scroll;
        }
        .filesContainer{
            width: 100%;
        }



</style>