<script>
    import { filesLocalCopy, fileToOpen, editorState, width, height } from '$lib/store'
    import ProjectFileCard from '$lib/ProjectFileCard.svelte'
    import CodeEditor from '$lib/CodeEditor.svelte';

    export let files
    export let projectName

    let editorText = 'hi'
    function getFileText(){
        // console.log($fileToOpen)
        for (let file of $filesLocalCopy){
            if($fileToOpen === file.fileName){
                editorText = file.fileData
                // console.log(editorText)
            }
        }
    }

    function runEditor(){
        $editorState = !$editorState; 
        // $fileToOpen = this.children[0].innerHTML; 
        // console.log($fileToOpen, this.children); 
        getFileText()
    }

    let panelWidth = $width * 0.3 + 'px';
    let panelState = true;
    let button, buttonText;

    function changePanelState(){
        panelState = !panelState
        if(panelState){
            panelWidth = $width * 0.3 + 'px'
        } else {
            panelWidth = '40px'
        }
    }
</script>

<div class='panel' style='flex: 0 0 {panelWidth}; width: {panelWidth}; height: calc({$height}px - 20px)'>
    <button bind:this={button} class="panelButton" on:click={changePanelState} 
    on:pointerover={()=>{
      if(!panelState){
      button.style.width = "80px"; 
      button.style.marginRight = "-45px"; 
      buttonText.style.transform = "scale(1)"
      } else {
        button.style.width = "30px"; 
        button.style.marginRight = "-15px"; 
        buttonText.style.transform = "scale(0)"
      }
      }} 
      on:pointerleave={()=>{
        button.style.width = "30px"; 
        button.style.marginRight = "-15px"; 
        buttonText.style.transform = "scale(0)"
        }}>
    {#if !panelState}
    <svg style="flex: 0 0 20px; margin: 5px;" width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" id="gears"><g clip-path="url(#clip0_23:5192)"><path d="M31.5631 32.1314C31.6744 30.9614 31.6408 29.7958 31.4717 28.6578L34.1023 27.4853C33.8538 26.2109 33.463 24.9539 32.9212 23.7374C32.3793 22.5217 31.7064 21.3906 30.9264 20.3527L28.2941 21.5243C27.5616 20.6382 26.7178 19.8341 25.7739 19.1335L26.8058 16.4451C25.7282 15.7204 24.5634 15.1078 23.3201 14.6307C22.082 14.1553 20.8103 13.8266 19.517 13.6445L18.4842 16.3355C17.3143 16.2242 16.1487 16.2579 15.0107 16.427L13.8451 13.8093C11.2412 14.321 8.80814 15.4253 6.71934 17.0033L7.8772 19.6038C6.98939 20.3363 6.18528 21.1809 5.4847 22.1239L2.80318 21.0955C2.07154 22.1705 1.4581 23.3362 0.98012 24.5786C0.506453 25.821 0.182047 27.0962 0 28.3808L2.68843 29.4127C2.57713 30.5827 2.61078 31.7483 2.77988 32.8863L0.149261 34.0579C0.397742 35.3331 0.788583 36.5893 1.33041 37.8059C1.8731 39.0224 2.54521 40.1526 3.32602 41.1906L5.95664 40.0189C6.68915 40.9058 7.53295 41.71 8.47769 42.4105L7.44581 45.1007C8.52342 45.8263 9.68818 46.438 10.9314 46.9151C12.1695 47.3905 13.4413 47.7192 14.7346 47.9013L15.7673 45.2103C16.9373 45.3207 18.1029 45.287 19.2409 45.1179L20.4065 47.7348C23.0104 47.2231 25.4452 46.1188 27.5331 44.5407L26.3744 41.9403C27.2613 41.2078 28.0663 40.364 28.7669 39.4201L31.4467 40.4486C32.1783 39.3735 32.7917 38.2079 33.2697 36.9664C33.7468 35.724 34.0704 34.4479 34.2524 33.1624L31.5631 32.1314ZM24.4167 33.5696C22.8715 37.5971 18.3548 39.6074 14.3265 38.0621C10.3033 36.5177 8.29047 32.0019 9.83485 27.9753C11.3801 23.9487 15.8968 21.9385 19.9225 23.482C23.9491 25.0263 25.9611 29.5439 24.4167 33.5696Z" fill="white"/><path d="M46.1287 10.6935C46.1287 10.1724 46.0752 9.66246 45.9837 9.16722L48.0001 8.00246C47.5117 6.14576 46.542 4.48318 45.2159 3.17002L43.1944 4.33737C42.423 3.67648 41.5292 3.15881 40.5517 2.81369V0.481594C39.6613 0.237427 38.7286 0.0976562 37.7632 0.0976562C36.7977 0.0976562 35.8659 0.239153 34.9746 0.481594V2.81456C33.9971 3.15967 33.1041 3.6782 32.3319 4.33823L30.3096 3.17089C28.9852 4.48404 28.0146 6.14662 27.5254 8.00333L29.5426 9.16808C29.4511 9.66418 29.3968 10.1724 29.3968 10.6943C29.3968 11.2163 29.4511 11.7254 29.5426 12.2206L27.5254 13.3854C28.0146 15.2421 28.9852 16.9055 30.3096 18.2178L32.3311 17.0505C33.1033 17.7113 33.9963 18.229 34.9738 18.5741V20.9071C35.865 21.1504 36.7968 21.291 37.7623 21.291C38.7277 21.291 39.6613 21.1495 40.5508 20.9071V18.5741C41.5283 18.229 42.4222 17.7105 43.1935 17.0505L45.215 18.2178C46.5411 16.9046 47.5109 15.2421 47.9992 13.3854L45.9829 12.2206C46.0752 11.7236 46.1287 11.2155 46.1287 10.6935ZM37.764 14.5984C35.6071 14.5984 33.8582 12.8504 33.8582 10.6943C33.8582 8.53825 35.6071 6.78939 37.764 6.78939C39.9184 6.78939 41.6672 8.53739 41.6672 10.6935C41.6672 12.8496 39.9184 14.5984 37.764 14.5984Z" fill="white"/></g><defs><clipPath id="clip0_23:5192"><rect width="48" height="48" fill="white" transform="translate(0 -0.000976562)"/></clipPath></defs></svg>
    {:else}
    <svg style="flex: 0 0 20px; margin: 5px;" width="20" height="20" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg" id="leftPanelArrow"><path d="M0.585785 13.5858C-0.195263 14.3668 -0.195263 15.6332 0.585785 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857863C15.3611 0.076814 14.0948 0.0768139 13.3137 0.857863L0.585785 13.5858ZM34 13L2 13L2 17L34 17L34 13Z" fill="white"/></svg>
    {/if}
    <p bind:this={buttonText} style="margin: 5px 5px 5px 0; padding: 0;" class="buttonText">options</p>
    </button>

    {#if panelState}
        <div>
            <h3 style="margin-top: 0;">{projectName}</h3>
        </div>
        {#if $editorState}
            <div style='height: calc(100% - 3.7rem)'>
                <CodeEditor fileName='{$fileToOpen}' readOnly='{false}' editorText='{editorText}'/>
            </div>
        {:else}
            <div class='filesGrid'>
                {#each files as file, index}
                    <div on:click={runEditor}>
                        <ProjectFileCard name='{file}' />
                    </div>
                {/each}
            </div>
        {/if}
    {/if}
    </div>
    
    <style>
        .panel{
            position: relative;
            background: #f9f9f9;
            border-radius: 20px;
            box-shadow: 0 0 10px rgba(60, 150, 238, 0.2);
            padding: 20px;
            margin: 10px;
            box-sizing: border-box;
            transition: width 0.25s;
        }
        .panelButton{
            position: absolute;
            top: 25px;
            right: 0px;
            margin-right: -15px;
            
            display: flex;
            align-items: center;
            /* justify-content: space-between; */
            
            width: 30px;
            height: 30px;
            border-radius: 20px;
            border: 1px solid #4233fb;
            background: #4233fb;
            /* background: radial-gradient(#ca94ff, #4233fb); */
            color: white;
            box-sizing: content-box;
            padding: 0;
            
            cursor: pointer;
            transition: margin 0.25s, width 0.25s;
        }
        .buttonText{
            transform: scale(0);
            transition: transform 0.25s;

            font-size: 0.8rem;
            font-family: 'Roboto', sans-serif;
        } 
        .filesGrid{
            width: 100%;
            display: grid;
            grid-template-columns: auto auto;
            gap: 10px;
        }
    </style>