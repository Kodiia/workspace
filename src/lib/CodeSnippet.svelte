<script>

    import hljs from 'highlight.js/lib/core';
    import 'highlight.js/styles/vs.min.css';
    import javascript from 'highlight.js/lib/languages/javascript';
    import html from 'highlight.js/lib/languages/xml';
    import css from 'highlight.js/lib/languages/css';
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('html', html);
    hljs.registerLanguage('css', css);

    import * as prettier from 'prettier';
    import parserBabel from "prettier/plugins/babel";
    import parserHTML from "prettier/plugins/html";
    import parserEstree from "prettier/plugins/estree";
    import parserCSS from "prettier/plugins/postcss";

    import {getFileLogoURL} from '$lib/utils'

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
    let highlightedCode = ''
    let codeContainer

    formatText(code).then( result =>{
        highlightedCode = hljs.highlight(
        result,
        { language: mode }
        ).value

        // const highlightedCode = Prism.highlight(code, Prism.languages.javascript, 'javascript');

        console.log(highlightedCode)

        codeContainer.innerHTML = highlightedCode
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

    
</script>


<div class='codeSnippetContainer' >
  <div class='snippetMenu'>
    <div style="display: flex; justify-content: center; align-items: center;">
      <img src="{logoPath}" width="20" height="20" style="margin-right: 0px;" alt="file logo">
      <h5>{fileName}</h5>
    </div>
    <div style="display: flex; align-items: center;">
      <button class="smallMenuButton" on:click={copy}>{copyButtonText}</button>
    </div>
  </div>
  <div class='codeSnippet' bind:this = {codeContainer}></div>
  <div class='snippetBottom'></div>
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
</style>