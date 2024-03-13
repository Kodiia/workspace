<script>
    import { theme, bgColor, primaryColor, textColor, secondaryColor } from "./store";
    import CodeSnippetMonaco from "./CodeSnippetMonaco.svelte";
    import { getFileLogoURL } from '$lib/utils'

    export let id = 0    
    export let docData = ''

    let isHovered = false;

    // function copyResourcesText(text = '') {
    //     let textToCopy = text;
    //     navigator.clipboard.writeText(textToCopy);
    // }

</script>

<details style='background-color: hsl({$bgColor}); color: hsl({$textColor}); border: none; border-bottom: 1px solid hsl({isHovered ? $primaryColor : $textColor + ', 20%'});' on:pointerenter={()=>{isHovered = !isHovered}} on:pointerleave={()=>{isHovered = !isHovered}}>
    <summary>
        <div class='summaryWrapper'>
            <!-- {id}.  -->
            <img src={getFileLogoURL(docData.technology)} alt='logo' style='width: 20px; margin-right: 5px;'/>
            {docData.heading}
        </div>
    </summary>
    <!-- {#if step.imageUrl}
    <div class='stepImageContainer'>
        <img src='{step.imageUrl}' alt='{step.imageText}' class='stepImage' />
    </div>
    {/if} -->
    <p class='{$theme}'>{@html docData.description}</p>
    <!-- {#if step.link ? step.link : step.linkUrl }
        <a href='{step.link ? step.link : step.linkUrl}' target='_blank' class='link'>{step.linkText}</a>
    {/if} -->
    {#each docData.snippet as snippet}
        {#if snippet.description}
            <p class='{$theme}'>{@html snippet.description}</p>
        {/if}
        {#if snippet.code}
            <CodeSnippetMonaco fileName='{snippet.fileType}' code='{snippet.code}' />
        {/if}
    {/each}
    

    <!-- {#if step.resources}
        <div class='resourcesTextContainer'>
            {#each step.resources as resource}    
                <button class='resourceButton' on:click={()=>{copyResourcesText(resource)}}>{resource}</button>
            {/each}
        </div>
    {/if} -->
    
</details>

<style>
    details{
            width: 100%;
            color: #1a1a1a;
            padding: 15px 0;
            margin-bottom: 10px;
            box-sizing: border-box;

            display: flex;
            align-items: center;
            transition: all 0.25s;

            font-size: 1rem;
        }
        
        details > summary{
            cursor: pointer;
            font-family: 'Montserrat', sans-serif;
            font-weight: 300;
            font-size: 1.17rem;
            list-style-type: none;
            display: flex;
            justify-content: space-between;
        }
        .summaryWrapper{
            display: flex;
            align-items: center;
        }

        details > summary::after {
            content: '+';
            font-size: 1.17rem;
        }

        details[open] > summary::after {
            content: '-';
            font-size: 1.17rem;
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