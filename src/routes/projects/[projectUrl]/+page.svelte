<script>
    import { filesLocalCopy, fileToOpen, editorState, width, height, docsPanelState, stylesPanelState, filesPanelDisplay, resourcesPanelDisplay } from '$lib/store'
    import ProjectPanel from '$lib/ProjectPanel.svelte';
    
    export let data

    let files = data.tutorial.files
    $filesLocalCopy = data.files

    let mobileMenuDisplay = 'none'
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


<div style='flex: 1; height: 100%; padding: 5px; box-sizing: border-box; margin-left: 0px; background: none; position: relative;' >
    <div bind:this={resizeCoverDiv} style='position: absolute; z-index: 2; top: 5; left: 5; background: #00000005; border-radius: 15px; width: calc(100% - 10px); height: calc(100% - 10px);'></div>
    <ProjectPanel />
    <!-- <iframe srcDoc="{userSRCDoc}" style="width: 100%; height: calc({$height}px - 70px); border-radius: 15px;" allow="accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share" allowfullscreen="true" allowtransparency="true" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation" name="Kodiia workspace" loading="lazy" title="userDoc" class="userContainer"  /> -->
</div>