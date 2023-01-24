<script>

    // import * as ace from 'ace-builds/src-noconflict/ace';
    // import 'ace-builds/src-noconflict/theme-textmate';
    // import 'ace-builds/src-noconflict/theme-monokai';
    // import 'ace-builds/src-noconflict/theme-chrome';
    // // import 'ace-builds/src-noconflict/mode/javascript';
    
    
    // import * as ace from 'brace';
    // import 'brace/mode/javascript';
    // import 'brace/mode/html';
    // import 'brace/mode/css';
    // import 'brace/theme/monokai';
    // import 'brace/theme/dracula';
    // import 'brace/theme/vibrant_ink';
    // import 'brace/theme/sqlserver';
    // import 'brace/theme/chrome';
    // import 'brace/ext/language_tools';
    // import 'brace/snippets/javascript';
    
    import { filesLocalCopy, editorState } from './store';
    import { getFileLogoURL } from '$lib/utils'
    // import {editorState, filesData, CSSthemeClass, userSRCDoc} from "./stores";
    
    
    import { onMount } from 'svelte';
    
    export let fileName = 'index.html'
    let mode = fileName.split('.')[1]
    if(mode == 'js'){
      mode = 'javascript'
    }
    if (mode == 'md'){
      mode = 'text'
    }
    let logoPath = getFileLogoURL(fileName.split('.')[1])
    export let readOnly = false
    export let editorText = "Some code here"
    let modePath = "ace/mode/" + mode
    let editorName = mode.toUpperCase()
    // export let fileIndex = 0
    let themeValue = "chrome"
    let editorTheme = "ace/theme/" + themeValue
    let editor

    onMount(async () => {
      const ace = await import('brace')
      console.log(ace)
      await import('brace/mode/javascript');
      await import('brace/mode/html');
      await import('brace/mode/css');
    // import 'brace/theme/monokai';
    // import 'brace/theme/dracula';
    // import 'brace/theme/vibrant_ink';
    // import 'brace/theme/sqlserver';
      await import('brace/theme/chrome');
      await import('brace/ext/language_tools');
      // await import('brace/snippets/javascript');

      
        //ace.require("brace/ext/language_tools");
        editor = ace.edit(editor, {
            mode: modePath,
            selectionStyle: "text"    
        });
        editor.setValue(editorText)
        editor.getSession().setMode(modePath);
        editor.setTheme(editorTheme);
        editor.setOption("enableSnippets", false);
        editor.setOption("enableBasicAutocompletion", true);
        editor.setOption("enableLiveAutocompletion", true);
        editor.session.setTabSize(2);
        editor.setReadOnly(readOnly);
        editor.session.on('change', function(e) {
            // console.log(e, 'looking for changes...')
            updateFileData(fileName, editor.getValue())
            // getFile(fileIndex)
            // runUserCode()
        });
        // console.log(editorText)
      
    })

    function updateFileData(fileNameLocal, value){
        for (let file of $filesLocalCopy){
            if (file.fileName === fileNameLocal ){
              $filesLocalCopy = [...$filesLocalCopy, 
              file.fileData = value
            ]
            }
        }
    }

    // function getFile(fileIndex){
    //     console.log($filesData[fileIndex].text)
    //     $filesData[fileIndex].text = editor.getValue()
    // }

    
    function runUserCode() {
    //     let htmlText, cssText, jsText
    //   for(let file of $filesData){
    //     if (file.type == "html"){htmlText = file.text}
    //     if (file.type == "css"){cssText = file.text}
    //     if (file.type == "js"){jsText = file.text}
    //   }
    //   console.log(`<html>` + htmlText + `<style>` + cssText + `</style><script>` + jsText + `<\/script></html>`)
    //   userSRCDoc.set(`<html>` + htmlText + `<style>` + cssText + `</style><script>` + jsText + `<\/script></html>`);
    }

    // let iconName = mode
    // if(mode == 'javascript'){iconName = 'js'}

    
    
    // let themeValue = "chrome", editorTheme, CSSclass
    // // let textColor = $darkColor
    // // let bgColor = $lightColor
    // CSSthemeClass.subscribe(value=>{
    //   if(value == "dark-theme"){
    //     themeValue = "vibrant_ink"
    //     // CSSclass = "dark-theme"
    //   } else if(value == "light-theme"){
    //     themeValue = "chrome"
    //     // CSSclass = "dark-theme"
    //   }
    //   switchTheme()
    // })
    
    
    // function switchTheme(){
    //   editorTheme = "ace/theme/" + themeValue
    //   if(editor){
    //   editor.setTheme(editorTheme);
    //   }
    // }
    
    async function paste(){
      let text = await navigator.clipboard.readText();
      editor.session.insert(editor.getCursorPosition(), text)
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

  let button, buttonText
</script>
    
<main style="background: none; height: calc(100% - 3.7rem);">
    <div class="editorMenu">
        <button bind:this={button} class="panelButton" on:click={()=>{editorState.set(false)}} 
            on:pointerover={()=>{
              button.style.width = "80px"; 
              button.style.marginRight = "-15px"; 
              buttonText.style.transform = "scale(1)"
              }} 
            on:pointerleave={()=>{
              button.style.width = "30px"; 
              button.style.marginRight = "-15px"; 
              buttonText.style.transform = "scale(0)"
              }}>
      
              <p bind:this={buttonText} style="margin: 5px 5px 5px 0; padding: 0;" class="buttonText">quit</p>    
              <svg style="flex: 0 0 20px; margin: 5px;" width="18" height="18" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.80807 0.793951L14.5001 11.486L25.1481 0.837951C25.3347 0.639329 25.5595 0.480439 25.809 0.370808C26.0585 0.261177 26.3276 0.203063 26.6001 0.199951C27.1835 0.199951 27.7431 0.431736 28.1557 0.844316C28.5683 1.2569 28.8001 1.81647 28.8001 2.39995C28.8052 2.66968 28.7552 2.9376 28.653 3.18729C28.5509 3.43698 28.3988 3.66316 28.2061 3.85195L17.4481 14.5L28.2061 25.2579C28.5687 25.6127 28.7813 26.093 28.8001 26.5999C28.8001 27.1834 28.5683 27.743 28.1557 28.1556C27.7431 28.5682 27.1835 28.7999 26.6001 28.7999C26.3197 28.8116 26.04 28.7648 25.7786 28.6625C25.5173 28.5603 25.2801 28.4048 25.0821 28.2059L14.5001 17.514L3.83007 28.1839C3.64418 28.3759 3.42211 28.5292 3.17667 28.635C2.93123 28.7407 2.66729 28.7968 2.40007 28.7999C1.81659 28.7999 1.25701 28.5682 0.84443 28.1556C0.43185 27.743 0.200065 27.1834 0.200065 26.5999C0.194936 26.3302 0.244979 26.0623 0.347124 25.8126C0.449269 25.5629 0.601361 25.3367 0.794065 25.1479L11.5521 14.5L0.794065 3.74195C0.431472 3.38722 0.218852 2.90686 0.200065 2.39995C0.200065 1.81647 0.43185 1.2569 0.84443 0.844316C1.25701 0.431736 1.81659 0.199951 2.40007 0.199951C2.92807 0.206551 3.43407 0.419951 3.80807 0.793951Z" fill="white" /></svg>  
        </button>
        <div style="display: flex; justify-content: center; align-items: center;">
          <img src="{logoPath}" width="20rem" height="20rem" style="margin-right: 5px;" alt="file logo">
          <h4>{fileName}</h4>
        </div>
        {#if readOnly}
            <div style="display: flex; align-items: center;">
                <button class="smallMenuButton" on:click={copy}>{copyButtonText}</button>
            </div>
        {:else}
            <div style="display: flex; align-items: center;">
                <button class="smallMenuButton" on:click={paste}>paste</button>
                <button class="smallMenuButton" on:click={()=>{editor.undo()}}>undo</button>
                <button class="smallMenuButton" on:click={()=>{editor.redo()}}>redo</button>
                <!-- <button class="smallMenuButton" on:click={max}>{maxButtonText}</button> -->
            </div>
        {/if}
    </div>
    <div bind:this={editor} class="editor" style="width: 100%; height: calc(100% - 4.5rem); border-radius: 0 0 20px 20px;" />
    
</main>
    
<style>
    main{
      /* width: calc(100% - 40px); */
      width: 100%;
      text-align: left;
      background: #fff;
      border-radius: 20px;
      box-shadow: 0 0 10px rgba(60, 150, 238, 0.2);
      /* padding: 10px; */
      /* margin: 10px; */
      box-sizing: content-box;
      position: relative;
    }
    
    .panelButton{
      position: absolute;
      right: 0px;
      margin-right: -15px;
        
      display: flex;
      align-items: center;
      justify-content: flex-end;
        
      width: 30px;
      height: 30px;
      border-radius: 20px;
      border: 1px solid #4233fb;
      background: #4233fb;
      /* background: radial-gradient(#ca94ff, #4233fb); */
      color: white;
      box-sizing: content-box;
      padding: 0;
      font-size: 1rem;
      font-family: 'Roboto', sans-serif;
        
      cursor: pointer;
      transition: margin 0.25s, width 0.25s;
    }
    .buttonText{
      position: absolute;
      right: 30px;
      transform: scale(0);
      transition: transform 0.25s;
    } 

    .editorMenu{
      background:#fff;
      border-radius: 20px 20px 0 0;
      border-bottom: 1px solid #dfdfdf;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 4.5rem;
      padding: 0 40px 0 20px;
    }

    .smallMenuButton {
      background: none;
      border: none;
      color: #1a1a1a;
      font-family: Roboto, sans-serif;
      font-size: 1rem;
    }
    .smallMenuButton:hover {
      color: #3d95ee;
      text-decoration: underline;
    }
</style>