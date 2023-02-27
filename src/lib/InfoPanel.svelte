<script>
    import { filesLocalCopy, fileToOpen, editorState, width, height } from '$lib/store'
    import ProjectFileCard from '$lib/ProjectFileCard.svelte'
    import CodeEditor from '$lib/CodeEditor.svelte';

    export let docsHTML = ''
    export let steps = ''
    export let state = '' //docs, tutorial, quiz, challenge, etc
    export let URLtoShare = 'url'

    let panelWidth = '30rem';
    let panelState = true;
    let button, buttonText;

    function changePanelState(){
        panelState = !panelState
        if(panelState){
            panelWidth = '30rem'
        } else {
            panelWidth = '40px'
        }
    }

</script>

<div class='panel' style='flex: 0 0 {panelWidth}; width: {panelWidth}; height: calc({$height}px - 20px)'>
    <button bind:this={button} class="panelButton" on:click={changePanelState} 
    on:pointerover={()=>{
      if(!panelState){
        button.style.width = "95px"; 
        button.style.marginLeft = "-80px"; 
        buttonText.style.transform = "scale(1)"
        buttonText.style.width = "auto"
        buttonText.style.margin = "5px 0 5px 5px"
      } else {
        button.style.width = "30px"; 
        button.style.marginLeft = "-15px"; 
        buttonText.style.transform = "scale(0)"
        buttonText.style.width = "0"
        buttonText.style.margin = "0"
      }
      }} 
      on:pointerleave={()=>{
        button.style.width = "30px"; 
        button.style.marginLeft = "-15px"; 
        buttonText.style.transform = "scale(0)"
        buttonText.style.width = "0"
        buttonText.style.margin = "0"
        }}>
    
    {#if !panelState}
    <svg xmlns="http://www.w3.org/2000/svg" style="margin: 5px;" width="15" height="15" viewBox="0 0 123.54 125.58"><title>data</title><path d="M15.45,43.45q-.12,37.58-.1,75.15" transform="translate(-10.35 -8.07)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px"/><path d="M15.35,118.6a10.12,10.12,0,0,1,10.13-10.13" transform="translate(-10.35 -8.07)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px"/><line x1="15.13" y1="100.4" x2="108.31" y2="100.4" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px"/><path d="M118.66,108.47a10.13,10.13,0,0,0,10.13-10.12" transform="translate(-10.35 -8.07)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px"/><path d="M128.79,98.34q0-37.57.1-75.14" transform="translate(-10.35 -8.07)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px"/><path d="M128.89,23.2a10.13,10.13,0,0,0-10.13-10.13" transform="translate(-10.35 -8.07)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px"/><line x1="108.42" y1="5" x2="15.23" y2="5" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px"/><path d="M25.58,13.07A10.12,10.12,0,0,0,15.45,23.2" transform="translate(-10.35 -8.07)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px"/><line x1="5.1" y1="15.13" x2="5.1" y2="35.39" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px"/><path d="M15.35,118.6q.06,10.13,10.2,10.05h93.11q10.13,0,10.13-10.13,0-12.48,0-20.18" transform="translate(-10.35 -8.07)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px"/><line x1="21.21" y1="31.52" x2="102.24" y2="31.52" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px"/><line x1="21.21" y1="51.78" x2="102.24" y2="51.78" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px"/><line x1="21.21" y1="72.04" x2="102.24" y2="72.04" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px"/></svg>
    {:else}
    <svg style="flex: 0 0 20px; margin: 5px; transform: rotate(180deg);" width="20" height="20" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg" id="leftPanelArrow"><path d="M0.585785 13.5858C-0.195263 14.3668 -0.195263 15.6332 0.585785 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857863C15.3611 0.076814 14.0948 0.0768139 13.3137 0.857863L0.585785 13.5858ZM34 13L2 13L2 17L34 17L34 13Z" fill="white"/></svg>
    {/if}
    <p bind:this={buttonText} style="width: 0; margin: 0; padding: 0;" class="buttonText">resources</p>
    </button>

    {#if panelState}
        {#if state == 'docs'}
            <div>
                <h3 style="margin-top: 4px; margin-left: 10px;">Docs</h3>
            </div>
            <div class='container'>
                {#each docsHTML as tag}
                    <details>
                        <summary>{tag.tag}</summary>
                        <p>{tag.description}</p>
                        <div style='height: 7rem'>
                            <CodeEditor fileName='.html' readOnly='{true}' editorText='{tag.snippet}'/>
                        </div>
                    </details>
                {/each}
            </div>
        {/if}
        {#if state == 'tutorial'}
            <div>
                <h3 style="margin-top: 4px; margin-left: 10px;">📖 Steps</h3>
            </div>
            <div class='container'>
                {#each steps.steps as step, id}
                    <details>
                        <summary>{id}. {step.step}</summary>
                        <p>{step.text}</p>
                        {#if step.code != 'false'}
                            <div style='height: calc(({step.codeLines} * 1.2rem) + 6rem)'>
                                <CodeEditor fileName='{step.mode}' readOnly='{true}' editorText='{step.code}'/>
                            </div>
                        {/if}
                    </details>
                {/each}
                <h3>🐈 Share this tutorial: </h3>
                <div class='socialLinks'>
                <button id="copyURL" style="width: 30px; height: 30px; border: none; border-radius: 15px; background: #4233fb; padding: 0; margin-left: 5px; cursor: pointer; display: flex; justify-content: center; align-items: center;" on:click={()=>{navigator.clipboard.writeText(window.location.href);}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 137.58 137.58"><title>copy link</title><path d="M70.31,90A23.85,23.85,0,0,1,58.24,83.4" transform="translate(-1.62 -2.44)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px"/><path d="M58.24,83.4Q41,66.2,58.24,49" transform="translate(-1.62 -2.44)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px"/><path d="M58.24,49,91.18,16.05" transform="translate(-1.62 -2.44)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px"/><path d="M91.18,16.05q17.2-17.21,34.41,0" transform="translate(-1.62 -2.44)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px"/><path d="M125.59,16.05q17.21,17.2,0,34.41" transform="translate(-1.62 -2.44)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px"/><path d="M125.59,50.46,104.87,70.87" transform="translate(-1.62 -2.44)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px"/><path d="M36.36,70.87,15.22,92" transform="translate(-1.62 -2.44)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px"/><path d="M15.22,92q-17.21,17.2,0,34.42" transform="translate(-1.62 -2.44)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px"/><path d="M15.22,126.42q17.21,17.2,34.41,0" transform="translate(-1.62 -2.44)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px"/><path d="M49.63,126.42,82.57,93.48" transform="translate(-1.62 -2.44)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px"/><path d="M82.57,93.48q17.21-17.2,0-34.41" transform="translate(-1.62 -2.44)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px"/><path d="M82.57,59.07A23.78,23.78,0,0,0,70.5,52.49" transform="translate(-1.62 -2.44)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px"/></svg>
                </button>
                <a style="width: 30px; height: 30px; border: none; background: none; padding: 0; margin-left: 10px;" href="https://t.me/share/url?url={URLtoShare}%2F&text=Kodiia.com&utm_source=share2" target="_blank" rel="noreferrer">
                    <svg width="30" height="30" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.675 0.58252C11.5378 0.58252 0.0742188 12.0461 0.0742188 26.1891C0.0742188 40.3263 11.532 51.7841 25.6635 51.7841H25.6865C39.818 51.7841 51.2758 40.3263 51.2758 26.1891C51.2758 12.0461 39.8123 0.58252 25.675 0.58252Z" fill="#4233fb"/>
                    <path d="M36.3843 15.7006L12.0687 24.9093C10.7376 25.2937 10.7835 26.6076 11.7646 26.9231L17.8579 28.828L20.1873 35.9769C20.4685 36.7572 20.7037 37.0556 21.1856 37.0613C21.6963 37.0671 21.8913 36.8835 22.4192 36.413C23.0388 35.8335 23.9798 34.9155 25.4658 33.4697L31.8058 38.1515C32.9705 38.7941 33.8139 38.4613 34.1065 37.0671L38.0769 17.4104C38.5014 15.7006 37.4974 15.1957 36.3843 15.7006ZM18.816 28.3862L32.6664 19.6939C33.3492 19.2349 33.5614 19.7455 33.2573 20.1013L21.7594 30.446L21.1684 35.6097L18.816 28.3919V28.3862Z" fill="white"/>
                    </svg>
                </a>
                </div>
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
            left: 0px;
            margin-left: -15px;
            
            display: flex;
            flex-direction: row-reverse; 
            align-items: center;
            justify-content: center;
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
            transition: transform 0.25s, width 0.25s;

            font-size: 0.8rem;
            font-family: 'Roboto', sans-serif;
        } 
        .container{
            width: 100%;
            height: calc(100% - 3rem);
            overflow-y: scroll;
            padding: 10px;
            box-sizing: border-box;
        }
        details{
            width: 100%;
            background: #fff;
            color: #1a1a1a;
            border: none;
            border-radius: 20px;
            box-shadow: 0 0 10px rgba(60, 150, 238, 0.2);
            padding: 20px;
            margin-bottom: 10px;
            /* margin: 0 10px 10px 0; */
            box-sizing: border-box;

            display: flex;
            align-items: center;
        }
        details summary{
            cursor: pointer;
            font-family: Poppins, sans-serif;
            font-weight: bold;
            font-size: 1.17rem;
        }
        .socialLinks{
            display: flex;
        }
    </style>