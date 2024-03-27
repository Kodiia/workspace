<script>
	import { onDestroy, onMount } from 'svelte';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

    import ConsolePanel from "$lib/ConsolePanel.svelte";
    import * as prettier from 'prettier';
    import parserBabel from "prettier/plugins/babel";
    import parserHTML from "prettier/plugins/html";
    import parserEstree from "prettier/plugins/estree";
    import parserCSS from "prettier/plugins/postcss";
    import parserMarkdown from "prettier/plugins/markdown";

    import {height, editorState, consolePanelState, consoleMessages, filesLocalCopy, theme, bgColor, textColor, runCode} from '$lib/store'
    import {getFileLogoURL} from '$lib/utils'

	let editorContainer;
	let editor;
	let model;
    let Monaco;
    let editorCreated = false;

    export let fileName = 'index.html'
    let mode = fileName.split('.')[1]
    let parserMode = mode
    if(mode == 'js'){
      mode = 'javascript'
      parserMode = 'babel'
    }
    if (mode == 'md'){
      mode = 'text'
      parserMode = 'markdown'
    }
    let logoPath = getFileLogoURL(fileName.split('.')[1])
    export let readOnly = false
    export let editorText = "Some code here"

    const formatOptions = {
          parser: parserMode,
          plugins: [ parserBabel, parserHTML, parserEstree, parserCSS, parserMarkdown ]
    }

    async function formatText(text = ''){
       let formattedEditorText = await prettier.format(text, formatOptions)
       return formattedEditorText
    }

    runCode.subscribe(async ()=>{
        const formattedCode = await prettier.format(editor.getValue(), formatOptions)
        updateFileData(fileName, formattedCode);
        consoleMessages.set([]);
    })


    onMount(async () => {
        self.MonacoEnvironment = {
            getWorker: function (_moduleId, label) {
                if (label === 'json') {
                    return new jsonWorker();
                }
                if (label === 'css' || label === 'scss' || label === 'less') {
                    return new cssWorker();
                }
                if (label === 'html' || label === 'handlebars' || label === 'razor') {
                    return new htmlWorker();
                }
                if (label === 'typescript' || label === 'javascript') {
                    return new tsWorker();
                }
                return new editorWorker();
            }
        };
        
        let editorTheme = 'vs-dark'
        $theme === 'dark' ? editorTheme = 'vs-dark' : editorTheme = 'vs-light'
        

        Monaco = await import('monaco-editor');
        editor = Monaco.editor.create(editorContainer, {
            value: editorText,
            language: mode,
            fontSize: 14,
            theme: editorTheme,
            scrollbar: {
                verticalScrollbarSize: 5,
                horizontalScrollbarSize: 5
            },
            automaticLayout: true
        });
        editorCreated = true

        editor.onDidChangeModelContent(async function (e) {
            $runCode = false;
            const formattedCode = await prettier.format(editor.getValue(), formatOptions)
            updateFileData(fileName, formattedCode);
            // console.log($filesLocalCopy)
        });

        theme.subscribe(()=>{
            if($theme === 'dark'){
                Monaco.editor.setTheme('vs-dark')
            } else {
                Monaco.editor.setTheme('vs-light')
            }
           
        })

        console.log(editor)

        formatText(editorText).then(result => {editor.setValue(result)})

        return () => {
            editor.dispose();
        };


    })


    let button

    function updateFileData(fileNameLocal = '', value = ''){
        // console.log(fileNameLocal, value)
        for (let file of $filesLocalCopy){
            if (file.fileName === fileNameLocal ){
                file.fileData = value
                $filesLocalCopy = [...$filesLocalCopy]
            }
        }
        // console.log('files are here: ',$filesLocalCopy)
    }

    async function paste(){
      let text = await navigator.clipboard.readText();
      var selection = editor.getSelection();
        var id = { major: 1, minor: 1 };             
        var op = {identifier: id, range: selection, text: text, forceMoveMarkers: true};
        editor.executeEdits("my-source", [op]);
    }

    let copyButtonText = "copy"
    function copy() {
        let textToCopy = editor.getValue();
        navigator.clipboard.writeText(textToCopy);
        copyButtonText = "copied";
        setTimeout(function() {
        copyButtonText = "copy";
        }, 1500);
    }

    function undo() {
		editor.trigger('aaaa', 'undo', 'aaaa');
		editor.focus();
	}

    function redo() {
		editor.trigger('aaaa', 'redo', 'aaaa');
		editor.focus();
	}
</script>

<div class='container' style='height: {$height - 185}px'>
    
    <div class='editorContainer' style='height: {$consolePanelState && mode==='javascript' && !readOnly ? "calc(100% - 130px)" : "calc(100% - 0px)"}; background: hsl({$bgColor}); color: hsl({$textColor}); border: 1px solid hsl({$textColor + ', 20%'});'>
        
        <div class='editorMenu' style='background: hsl({$bgColor}); color: hsl({$textColor}); border-bottom:  1px solid hsl({$textColor + ', 20%'})'>
            {#if !readOnly}
                <button bind:this={button} class="panelButton" on:click={()=>{editorState.set(false);}} >
                    <svg xmlns="http://www.w3.org/2000/svg" width='10' height='10' viewBox="0 0 19.02 19.02"><title>icon_quit</title><line x1="0.5" y1="0.5" x2="18.52" y2="18.52" style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/><line x1="0.5" y1="18.52" x2="18.52" y2="0.5" style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/></svg>
                </button>
            {/if}
            <div style="display: flex; justify-content: center; align-items: center;">
                <img src="{logoPath}" width="20" height="20" style="margin-right: 0px;" alt="file logo">
                <h5>{fileName}</h5>
            </div>
            {#if readOnly}
                <div style="display: flex; align-items: center;">
                    <button class="smallMenuButton" style='color: hsl({$textColor});' on:click={copy}>{copyButtonText}</button>
                </div>
            {:else}
                <div style="display: flex; align-items: center;">
                    <button class="smallMenuButton" type="button" style='color: hsl({$textColor});' on:click={paste}>paste</button>
                    <button class="smallMenuButton" type="button" style='color: hsl({$textColor});' on:click={()=>{undo()}}>undo</button>
                    <button class="smallMenuButton" type="button" style='color: hsl({$textColor});' on:click={()=>{redo()}}>redo</button>
                    <button class="smallMenuButton" type="button" style='color: hsl({$textColor});' on:click={async ()=>{formatText(editor.getValue()).then(result => {editor.setValue(result)})}}>prettify</button>
                    {#if mode==='javascript'}
                    <button class="smallMenuButton" type="button" style='color: hsl({$textColor});' on:click={()=>{consolePanelState.set(true);}}>console</button>
                    {/if}
                    <!-- <button class="smallMenuButton" on:click={max}>{maxButtonText}</button> -->
                </div>
            {/if}
        </div>

        <div class="editor" bind:this={editorContainer} style='height: {$consolePanelState && mode==='javascript' && !readOnly ? 'calc(100% - 70px)' : 'calc(100% - 70px)'}'>
            {#if !editorCreated}
            <div class='editorLoaderContainer' style='background: hsl({$bgColor}); color: hsl({$textColor});'>
                <div class='editorLoader' style='border-color: hsl({$textColor}) transparent'></div>
                <p class='editorLoadingText'>loading editor...</p>
            </div>
            {/if}
        </div>
        
        <div class='editorBottom' style='background: hsl({$bgColor}); color: hsl({$textColor}); border-top: 1px solid hsl({$textColor + ', 20%'});'></div>

        
    </div>
    
    {#if $consolePanelState && mode==='javascript' && !readOnly}
        <div style='width: 100%; margin-top: 10px;'>
            <ConsolePanel />
        </div>
    {/if}
</div>

<style>
    .container{

    }
    .editorContainer{
        height: 100%;
        border-radius: 15px;
        position: relative;
    }
    .editor {
        width: calc(100% - 1px);
        height: 100%;
        border-radius: 0 0 15px 15px;
        /* background: #fdfdfd; */
    }
    .editorBottom{
        /* height: 15px; */
        background: #fdfdfd;
        border-top: 1px solid #1a1a1a20;
        border-radius: 0 0 15px 15px;
    }
    .editorLoaderContainer{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .editorLoadingText{
        margin: 0;
    }
    .editorLoader{
        width: 20px;
        height: 20px;
        border: 2px solid;
        border-radius: 50%;
        border-color: #1a1a1a transparent;
        animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 

    .panelButton{
      position: absolute;
      top: 5px;
      right: 0px;
      margin-right: 5px;
            
      display: flex;
      align-items: center;
      justify-content: center;
            
      width: 20px;
      height: 20px;
      border-radius: 10px;
      border: none;
      background: #4233fb00;
      color: white;
      box-sizing: content-box;
      padding: 0;
            
      cursor: pointer;
      transition: 0.25s;
    }
    .panelButton:hover{
      background: #4233fb20;
    }

    .editorMenu{
      position: relative;
      background: #fdfdfd;
      border-radius: 15px 15px 0 0;
      border-bottom: 1px solid #dfdfdf;
      display: flex;
      flex-direction: column;
      align-items: start;
      height: 55px;
      padding: 0 20px 0 10px;
    }
    .editorMenu h5{
      margin: 5px;
      /* font-family: Montserrat, sans-serif; */
      font-weight: 300;
    }

    .smallMenuButton {
      background: none;
      border: none;
      color: #3d95ee;
      font-family: Roboto, sans-serif;
      font-size: 1rem;
      font-weight: 300;
      margin: 0;
      padding: 0 10px 5px 0px;
    }
    .smallMenuButton:hover {
      color: #3d95ee;
      text-decoration: underline;
    }

</style>