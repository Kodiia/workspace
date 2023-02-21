<script>
    import { filesLocalCopy, fileToOpen, editorState, width, height } from '$lib/store'
    import EditorPanel from '$lib/EditorPanel.svelte';
    import InfoPanel from '$lib/InfoPanel.svelte';
    
    export let data
    console.log('page data', data)
    // console.log('DATA TYPE', data.type)
    // if(data.type === 'tutorial'){
    //     console.log('JSON', data, data.project.stepsJSON)
    // }

    let files = data.project.files
    $filesLocalCopy = data.files

    let userSRCDoc

    filesLocalCopy.subscribe(value => {
        // console.log('updated')
        userSRCDoc = `<html>
            <style>${getFileContents('style.css')}</style>
            <script>${getFileContents('script.js')}<\/script>
            <body>${getFileContents('index.html')}</body>   
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



<div style="display: flex; align-items: center; width: {$width}px; height:{$height}px">
    <EditorPanel files='{files}' projectName='{data.project.name}'/>
    <iframe srcDoc="{userSRCDoc}" style="flex: 1 1 100%; height: calc({$height}px - 20px); border-radius: 25px;" allow="accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share" allowfullscreen="true" allowtransparency="true" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation" name="Kodiia workspace" loading="lazy" title="userDoc" class="userContainer"  />
    {#if data.type === 'project'}
        <InfoPanel docsHTML='{data.docsHTML}' state='docs'/>
    {/if}
    {#if data.type === 'tutorial'}
        <InfoPanel steps='{data.project.stepsJSON}' state='tutorial'/>
    {/if}
</div>


<style>
    div{
        overflow: hidden;
    }   
    .userContainer {
        background: #fff;
        color: #1a1a1a;
        z-index: 0;
        border: none;
        border-radius: 25px;
        margin: 0 17px;
        box-shadow: 0px 0px 5px rgba(61, 149, 238, 0.3);
    }
</style>
