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

    import {height, editorState, consolePanelState, consoleMessages, filesLocalCopy} from '$lib/store'
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
    }
    let logoPath = getFileLogoURL(fileName.split('.')[1])
    export let readOnly = false
    export let editorText = "Some code here"

    const formatOptions = {
          parser: parserMode,
          plugins: [ parserBabel, parserHTML, parserEstree, parserCSS ]
    }

    async function formatText(text = ''){
       let formattedEditorText = await prettier.format(text, formatOptions)
       return formattedEditorText
    }


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

        Monaco = await import('monaco-editor');
        editor = Monaco.editor.create(editorContainer, {
            value: editorText,
            language: mode,
            theme: 'vs-light',
            scrollbar: {
                verticalScrollbarSize: 5,
                horizontalScrollbarSize: 5
            },
            automaticLayout: true
        });
        console.log(editorCreated)
        editorCreated = true
        console.log(editorCreated)

        editor.onDidChangeModelContent(function (e) {
            console.log(e);
            setTimeout(async ()=>{
              const formattedCode = await prettier.format(editor.getValue(), formatOptions)
              updateFileData(fileName, formattedCode);
              consoleMessages.set([]);
            }, 500)
        });

        console.log(editor)

        formatText(editorText).then(result => {editor.setValue(result)})

        return () => {
            editor.dispose();
        };


    })


    let button

    function updateFileData(fileNameLocal = '', value = ''){
        for (let file of $filesLocalCopy){
            if (file.fileName === fileNameLocal ){
              $filesLocalCopy = [...$filesLocalCopy, 
              file.fileData = value
            ]
            }
        }
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

<div class='container' style='height: {$height - 120}px'>
    
    <div class='editorContainer' style='height: {$consolePanelState && mode==='javascript' && !readOnly ? "calc(100% - 130px)" : "calc(100% - 0px)"}'>
        
        <div class='editorMenu'>
            {#if !readOnly}
                <button bind:this={button} class="panelButton" on:click={()=>{editorState.set(false);}} >
                    <svg xmlns="http://www.w3.org/2000/svg" width='10' height='10' viewBox="0 0 19.02 19.02"><title>icon_quit</title><line x1="0.5" y1="0.5" x2="18.52" y2="18.52" style="fill:none;stroke:#4233fb;stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/><line x1="0.5" y1="18.52" x2="18.52" y2="0.5" style="fill:none;stroke:#4233fb;stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/></svg>
                </button>
            {/if}
            <div style="display: flex; justify-content: center; align-items: center;">
                <img src="{logoPath}" width="20" height="20" style="margin-right: 0px;" alt="file logo">
                <h5>{fileName}</h5>
            </div>
            {#if readOnly}
                <div style="display: flex; align-items: center;">
                    <button class="smallMenuButton" on:click={copy}>{copyButtonText}</button>
                </div>
            {:else}
                <div style="display: flex; align-items: center;">
                    <button class="smallMenuButton" on:click={paste}>paste</button>
                    <button class="smallMenuButton" on:click={()=>{undo()}}>undo</button>
                    <button class="smallMenuButton" on:click={()=>{redo()}}>redo</button>
                    <button class="smallMenuButton" on:click={async ()=>{formatText(editor.getValue()).then(result => {editor.setValue(result)})}}>prettify</button>
                    {#if mode==='javascript'}
                    <button class="smallMenuButton" on:click={()=>{consolePanelState.set(true);}}>console</button>
                    {/if}
                    <!-- <button class="smallMenuButton" on:click={max}>{maxButtonText}</button> -->
                </div>
            {/if}
        </div>

        <div class="editor" bind:this={editorContainer} style='height: {$consolePanelState && mode==='javascript' && !readOnly ? 'calc(100% - 70px)' : 'calc(100% - 70px)'}'>
            {#if !editorCreated}
            <p class='editorLoadingText'>loading editor...</p>
            {/if}
        </div>
        
        <div class='editorBottom'></div>

        
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
        box-shadow: 0 0 10px #3d95ee50;
    }
    .editor {
        width: 100%;
        height: 100%;
        border-radius: 0 0 15px 15px;
        background: #fdfdfd;
    }
    .editorBottom{
        height: 15px;
        background: #fdfdfd;
        border-top: 1px solid #1a1a1a20;
        border-radius: 0 0 15px 15px;
    }
    .editorLoadingText{
        width: 100%;
        padding-top: 20px;
        margin: 0;
        display: flex;
        justify-content: center;
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
      font-weight: 500;
    }

    .smallMenuButton {
      background: none;
      border: none;
      color: #1a1a1a;
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

    .monaco-scrollable-element editor-scrollable vs-dark .slider{
        border-radius: 15px !important;
    }
</style>