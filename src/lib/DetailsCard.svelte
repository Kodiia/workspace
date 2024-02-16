<script>
    import { theme, textColor, secondaryColor } from "./store";
    import CodeSnippetMonaco from "./CodeSnippetMonaco.svelte";

    export let id = 0    
    export let step = ''

    let isHovered = false;

    function copyResourcesText(text = '') {
        let textToCopy = text;
        navigator.clipboard.writeText(textToCopy);
    }

</script>

<details style='background-color: hsl({$secondaryColor}); color: hsl({$textColor}); border-color: hsl({isHovered ? '245, 96%, 85%, 50%' : $secondaryColor}); box-shadow: {isHovered ? "0 0 15px #3d95ee90" : "0 0 10px #3d95ee50"};' on:pointerenter={()=>{isHovered = !isHovered}} on:pointerleave={()=>{isHovered = !isHovered}}>
    <summary>{id}. {step.step ? step.step : step.hint }</summary>
    {#if step.imageUrl}
    <div class='stepImageContainer'>
        <img src='{step.imageUrl}' alt='{step.imageText}' class='stepImage' />
    </div>
    {/if}
    <p class='{$theme}'>{@html step.text}</p>
    {#if step.link ? step.link : step.linkUrl }
        <a href='{step.link ? step.link : step.linkUrl}' target='_blank' class='link'>{step.linkText}</a>
    {/if}
    
    {#if step.code != 'false'}
        
        <!-- <CodeEditor fileName='{step.mode}' readOnly='{true}' editorText='{step.code}'/> -->
        <!-- <CodeSnippet fileName='{step.mode}' code='{step.code}' /> -->
        <CodeSnippetMonaco fileName='{step.mode}' code='{step.code}' />
        
    {/if}

    {#if step.resources}
        <div class='resourcesTextContainer'>
            {#each step.resources as resource}    
                <button class='resourceButton' on:click={()=>{copyResourcesText(resource)}}>{resource}</button>
            {/each}
        </div>
    {/if}
    
</details>

<style>
    details{
            width: 100%;
            background: #fdfdfd;
            /* background: linear-gradient(45deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15));
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px); */
            color: #1a1a1a;
            border: 1px solid #f9f9f9;
            border-radius: 15px;
            box-shadow: 0 0 10px rgba(60, 150, 238, 0.2);
            padding: 15px;
            /* padding-bottom: 35px; */
            margin-bottom: 10px;
            /* margin: 0 10px 10px 0; */
            box-sizing: border-box;

            display: flex;
            align-items: center;
            /* transform: scale(1.0); */
            transition: all 0.5s;
        }
        
        details summary{
            cursor: pointer;
            font-family: 'Montserrat', sans-serif;
            font-weight: bold;
            font-size: 1.17rem;
        }

        details a{
            color: #3d95ee;
        }

        .stepImageContainer{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items:center;
            background: #f9f9f9;
            border-radius: 10px;
            margin-top: 10px;
        }
        .stepImage{
            width: 100%;
            max-width: 700px;
            border-radius: 10px;
        }

        .resourcesTextContainer{
            display: grid;
            grid-template-columns: repeat(auto-fill, 50px);
            gap: 10px;
        }
        .resourceButton{
            margin: 0;
            padding: 5px;
            width: 50px;
            height: 50px;
            font-size: 30px;
            background-color: #f9f9f9;
            border: 1px solid #4233fb20;
            border-radius: 10px;
            cursor: pointer;
        }
        .resourceButton:hover{
            background-color: #4233fb20;
        }

        .buttonText{
            transform: scale(0);
            transition: transform 0.25s, width 0.25s;

            font-size: 0.8rem;
            font-family: 'Roboto', sans-serif;
        }

        :global(p.dark code) {
            background: rgb(120, 120, 120); /* default background color */
        }

        :global(p.light code) {
            background: rgb(220, 220, 220); /* background color for dark theme */
        }
</style>