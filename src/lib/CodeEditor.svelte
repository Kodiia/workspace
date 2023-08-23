<script>
  import { fade } from 'svelte/transition';
  import ConsolePanel from "$lib/ConsolePanel.svelte";
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
    
    import { filesLocalCopy, editorState, consolePanelState, consoleMessages } from './store';
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
      //console.log(ace)
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

      // console.oldLog = console.log;
        // console.log = function(value){
        //     // console.oldLog(value);
        //     typeof value === 'string' ? consoleMessages.push(value) : consoleMessages.push(JSON.stringify(value));
        // };

        // window.onerror = function (e) {
        //     consoleMessages.push(e);
        //     console.log(consoleMessages);
        // }
        


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
            setTimeout(()=>{
              updateFileData(fileName, editor.getValue()),
              consoleMessages.set([])
            }, 500)
        });      
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


    
<main transition:fade style="background: none; height: 100%;">
    <div class="editorMenu">
      {#if !readOnly}
        <button bind:this={button} class="panelButton" on:click={()=>{editorState.set(false);}} >
          <svg xmlns="http://www.w3.org/2000/svg" width='10' height='10' viewBox="0 0 19.02 19.02"><title>icon_quit</title><line x1="0.5" y1="0.5" x2="18.52" y2="18.52" style="fill:none;stroke:#4233fb;stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/><line x1="0.5" y1="18.52" x2="18.52" y2="0.5" style="fill:none;stroke:#4233fb;stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/></svg>
        </button> 
        <!-- <button bind:this={button} class="panelButton" on:click={()=>{editorState.set(false)}} 
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
        </button> -->
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
                <button class="smallMenuButton" on:click={()=>{editor.undo()}}>undo</button>
                <button class="smallMenuButton" on:click={()=>{editor.redo()}}>redo</button>
                {#if mode==='javascript'}
                  <button class="smallMenuButton" on:click={()=>{consolePanelState.set(true)}}>console</button>
                {/if}
                <!-- <button class="smallMenuButton" on:click={max}>{maxButtonText}</button> -->
            </div>
        {/if}
    </div>
    <div style='height: calc(100% - 35px); position: relative;'>
      <div bind:this={editor} class="editor" style="width: 100%; border-radius: 0 0 15px 15px;" ></div>
        {#if $consolePanelState && mode==='javascript' && !readOnly}
        <div style='position: absolute; bottom: 0; width: 100%;'>
          <ConsolePanel />
        </div>
        {/if}
    </div>
</main>
    
<style>
    main{
      /* width: calc(100% - 40px); */
      width: 100%;
      text-align: left;
      background: #fdfdfd;
      /* background: linear-gradient(45deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15));
      backdrop-filter: blur(25px);
      -webkit-backdrop-filter: blur(25px); */
      border-radius: 15px;
      box-shadow: 0 0 10px rgba(60, 150, 238, 0.2);
      /* padding: 10px; */
      /* margin: 10px; */
      box-sizing: content-box;
      position: relative;
      font-family: Roboto, sans-serif;
      font-weight: 300;
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
    .buttonText{
      position: absolute;
      right: 30px;
      transform: scale(0);
      transition: transform 0.25s;
    } 

    .editor{
      height: 100%;
      background: #fdfdfd;
      /* background: linear-gradient(45deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.55)); */
      backdrop-filter: blur(25px);
      -webkit-backdrop-filter: blur(25px);
    }

    .editorMenu{
      background: #fdfdfd;
      /* background: linear-gradient(45deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15));
      backdrop-filter: blur(25px);
      -webkit-backdrop-filter: blur(25px); */
      border-radius: 15px 15px 0 0;
      border-bottom: 1px solid #dfdfdf;
      display: flex;
      flex-direction: column;
      /* justify-content: space-between; */
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
</style>