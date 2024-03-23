<script>
    import { width, height, filesLocalCopy, consoleMessages, textColor, runCode } from '$lib/store'

    let userSRCDoc = ''

    filesLocalCopy.subscribe(value => {
        // console.log('updated')
        userSRCDoc = `<html>
            <body>${getFileContents('index.html')}</body>
            <style>${getFileContents('style.css')}</style>
            <script type='module'>
                console.oldLog = console.log;
                console.log = function(value){
                    console.oldLog(value);
                    window.parent.postMessage({
                        source: 'iframe',
                        message: {text: typeof value === 'string' ? value : JSON.stringify(value), type: 'text'},
                    }, '*');
                };
                window.onerror = function (value) { 
                    window.parent.postMessage({
                        source: 'iframe',
                        message: {text: value, type: 'error'},
                    }, '*');
                }
                ${getFileContents('script.js')}
            <\/script>
               
        </html>`
    }) 

    function getFileContents(fileToSearch){
        if($runCode === true){
            for(let file of $filesLocalCopy){
                if(file.fileName === fileToSearch){
                    return file.fileData   
                }
            }
        }
    }

    function handleMessage(response){
        if(response.data && response.data.source === 'iframe'){
           $consoleMessages = [...$consoleMessages, response.data.message];
        }
    }

</script>

<svelte:window on:message={handleMessage} on:pointerup={()=>{console.log('pointerup')}}/>

<div style="width: 100%; height: 100%;" on:pointerup={()=>{console.log('pointerup')}}>
    <iframe srcDoc="{userSRCDoc}" style="width: 100%; height: 100%; border-radius: 15px; box-sizing: border-box; border: 1px solid hsl({$textColor + ', 20%'});" allow="accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share" allowfullscreen="true" allowtransparency="true" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation" name="Kodiia workspace" loading="lazy" title="userDoc" class="userContainer"  />
</div>

<style>
    .userContainer {
        background: none;
        color: #1a1a1a;
        z-index: 0;
        border: none;
        border-radius: 15px;
        /* margin: 0 17px; */
        /* box-shadow: 0px 0px 10px rgba(61, 149, 238, 0.5); */
    }
</style>