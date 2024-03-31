<script>
    import { fade } from 'svelte/transition';
    import { filesLocalCopy, fileToOpen, editorState, width, height, leftPanelWidthSetByUser, filesPanelDisplay, bgColor, textColor, primaryColor, accentColor, runCode } from '$lib/store'
    import ProjectFileCard from '$lib/ProjectFileCard.svelte'
    import CodeEditorMonaco from '$lib/CodeEditorMonaco.svelte';
    import JSZip from 'jszip';

    export let files = []
    export let projectName = ''


    function runEditor(fileName = ''){
        $editorState = !$editorState; 
    }

    let panelWidth = $width * 0.3 + 'px';
    let panelState = true;
    let button, buttonText;

    $: if($leftPanelWidthSetByUser > $width * 0.3){
        panelWidth = $leftPanelWidthSetByUser + 'px';
            if($leftPanelWidthSetByUser > $width * 0.45){
                $leftPanelWidthSetByUser = $width * 0.45
            }
        } else {
            if(panelState){
                panelWidth = $width * 0.3 + 'px';
                if($width * 0.3 < 400){
                    panelWidth = '400px'
                }
            }
        }

    // function changePanelState(){
    //     panelState = !panelState
    //     if(panelState){
    //         if($leftPanelWidthSetByUser > $width * 0.3){                
    //             panelWidth = $leftPanelWidthSetByUser + 'px';
    //         } else {
    //             panelWidth = $width * 0.3 + 'px';
    //             if($width * 0.3 < 400){
    //                 panelWidth = '400px'
    //             }
    //         }
    //     } else {
    //         panelWidth = '40px'
    //     }
    // }
    // // console.log('editor panel', $width, panelWidth)


    // let setUserPanelSize = false;
    // function updateUserPanelSize(event){
    //     event.preventDefault()
    //     if(setUserPanelSize){
    //         $leftPanelWidthSetByUser = event.pageX - 20 // - panel.getBoundingClientRect().left
    //         if($leftPanelWidthSetByUser > $width * 0.45){
    //             $leftPanelWidthSetByUser = $width * 0.45
    //         }
    //         console.log('handle', $leftPanelWidthSetByUser, $width*0.45)
    //     }
    // }

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

{#if $filesPanelDisplay === 'block'}
<div class='panel' style='height: calc({$height}px - 60px); z-index: 2; background: hsl({$bgColor}); border: 1px solid hsl({$textColor + ', 20%'})' >
    <button bind:this={button} class="panelButton" on:click={()=>{$filesPanelDisplay = 'none';}} >    
    <svg xmlns="http://www.w3.org/2000/svg" width='10' height='10' viewBox="0 0 19.02 19.02"><title>icon_quit</title><line x1="0.5" y1="0.5" x2="18.52" y2="18.52" style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/><line x1="0.5" y1="18.52" x2="18.52" y2="0.5" style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/></svg>
    </button>

    
        <!-- <div class='handle' on:pointerdown={()=>{setUserPanelSize = true}} on:pointerup={()=>{setUserPanelSize = false}} on:pointermove={updateUserPanelSize} on:pointerleave={()=>{setUserPanelSize = false}}></div> -->
        <div class='contentContainer' in:fade='{{delay: 125}}' out:fade='{{delay: 0}}'>
            <div>
                <h3 style="margin: 0; font-weight: 300; height: 50px;">{projectName}</h3>
            </div>
            <div class='filesAndEditorWrapper'>
                {#if $editorState}
                    <div style='height: calc(100% - 250px); background: none;'>
                        <CodeEditorMonaco fileName='{$fileToOpen}' readOnly='{false}' editorText='Some code here'/> 
                    </div>
                {:else}
                    <div class='filesContainer'>
                        <p>Click files to open</p>
                        {#each files as file, index}
                            <ProjectFileCard name='{file.fileName}' action={()=>{runEditor(file.fileName)}}/>
                        {/each}
                        <!-- <button class='downloadButton' on:click={downloadFiles} style='color: hsl({$textColor});'>Download files as .zip</button> -->
                    </div>
                    
                {/if}

                
            </div>
            <div class='bottomButtonsWrapper'>
                <!-- <div class='buttonWrapper' style='background: linear-gradient(hsl({$primaryColor}), hsl({$accentColor}))'>
                    <button on:click={downloadFiles} style='background: hsl({$bgColor}); color: hsl({$textColor});'>Download</button>
                </div> -->
                <button style='display: flex; align-items: center; justify-content: center; width: 100px; height: 40px; background: hsl({$primaryColor}); color: #1a1a1a; margin-top: 10px; border: none;' 
                on:click={()=>{
                    $runCode = !$runCode; 
                    console.log($filesLocalCopy)
                }}>{$runCode === false ? 'Run' : 'Stop'}</button>
            </div>
        </div>    
    
    </div>
    {/if}
    
    <style>
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
            transition: all 0.25s;
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
            background: #33dd9920;
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

        /* .downloadButton{
            margin-top: 20px;
            background: none;
            border: none;
            font-family: Roboto, sans-serif;
            font-size: 1.2rem;
            font-weight: 300;
            margin-top: 20px;
            padding: 0 10px 5px 0px;

        }
        .downloadButton:hover{
            text-decoration: underline; 
        }*/

        h3{
            font-weight: 300;
        }

        .bottomButtonsWrapper{
        width: 100%;
        display: flex;
    }
    /* .buttonWrapper{
        width: fit-content;
        height: 40px;
        margin: 10px 10px 0 0;
        padding: 2px;
        box-sizing: border-box;
        border-radius: 10px;
    }
    .buttonWrapper button{
        background: none;
        border: none;
        border-radius: 8px;
    } */
    </style>