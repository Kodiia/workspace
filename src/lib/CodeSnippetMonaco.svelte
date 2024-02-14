<script>
  import { onDestroy, onMount } from 'svelte';
    // import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
    // import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
    // import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
    // import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
    // import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

    import * as prettier from 'prettier';
    import parserBabel from "prettier/plugins/babel";
    import parserHTML from "prettier/plugins/html";
    import parserEstree from "prettier/plugins/estree";
    import parserCSS from "prettier/plugins/postcss";

    import {getFileLogoURL} from '$lib/utils'

    import { theme, bgColor, textColor } from '$lib/store'
 
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

    const formatOptions = {
          parser: parserMode,
          plugins: [ parserBabel, parserHTML, parserEstree, parserCSS ]
    }

    async function formatText(text = ''){
       let formattedEditorText = await prettier.format(text, formatOptions)
       return formattedEditorText
    }


    export let code = 'console.log("hi")'
    let codeContainer

    let monaco;

    onMount(async ()=>{
      let editorTheme = 'vs-dark'
        $theme === 'dark' ? editorTheme = 'vs-dark' : editorTheme = 'vs-light'

      monaco = await import('monaco-editor');
      monaco.editor.setTheme(editorTheme)

      formatText(code).then( result =>{
        monaco.editor.colorize(result, mode, { })
        .then(html =>  codeContainer.innerHTML = html);
      })
    })


    let copyButtonText = "copy"
    function copy() {
        let textToCopy = code;
        navigator.clipboard.writeText(textToCopy);
        copyButtonText = "copied";
        setTimeout(function() {
        copyButtonText = "copy";
        }, 1500);
    }

    // theme.subscribe(()=>{
    //         if($theme === 'dark'){
    //             monaco.editor.setTheme('vs-dark')
    //         } else {
    //             monaco.editor.setTheme('vs-light')
    //         }
           
    //     })

</script>


<div class='codeSnippetContainer' style='background: hsl({$bgColor}); color: hsl({$textColor}); border: 1px solid hsl({$textColor});'>
    <div class='snippetMenu' style='background: hsl({$bgColor}); color: hsl({$textColor});'>
      <div style="display: flex; justify-content: center; align-items: center;">
        <img src="{logoPath}" width="20" height="20" style="margin-right: 0px;" alt="file logo">
        <h5>{fileName}</h5>
      </div>
      <div style="display: flex; align-items: center;">
        <button class="smallMenuButton" on:click={copy}>{copyButtonText}</button>
      </div>
    </div>
    <pre class='codeSnippet' bind:this = {codeContainer} data-lang='text/{mode}'></pre>
    <div class='snippetBottom' style='background: hsl({$bgColor}); color: hsl({$textColor});'></div>
  </div>
  
  <style>
  .codeSnippetContainer{
      height: 100%;
      background: #fdfdfd;
      font-family: 'Consolas','Source Code Pro', monospace !important;
      font-size: 1rem;
      
      display: flex;
      flex-direction: column;
  
      box-shadow: 0 0 10px #3d95ee50;
      border-radius: 10px;
  }
  .codeSnippet{
    padding: 10px;
    white-space: pre;
    overflow-x: auto;
    margin: 0;
    }
  
  .snippetMenu{
        position: relative;
        background: #fdfdfd;
        border-radius: 15px 15px 0 0;
        border-bottom: 1px solid #dfdfdf;
        display: flex;
        flex-direction: column;
        align-items: start;
        /* height: 55px; */
        padding: 0 20px 0 10px;
        box-sizing: border-box;
      }
      .snippetMenu h5{
        margin: 5px;
        font-weight: 500;
      }
  
      .snippetBottom{
          height: 15px;
          background: #fdfdfd;
          border-top: 1px solid #1a1a1a20;
          border-radius: 0 0 15px 15px;
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