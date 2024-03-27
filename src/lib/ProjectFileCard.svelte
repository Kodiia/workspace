<script>
    import { fileToOpen, bgColor, textColor, secondaryColor, primaryColor } from '$lib/store'
    import { getFileLogoURL } from '$lib/utils'

    export let name = 'file name'
    export let fileFullName = ''
    export let filePath = ''
    // let containsUnderscore = name.includes("_");
    console.log(name)
    let fileType = name.split('.')[1]
    // let nameWithoutFileId = name.split('_')[0] + '.' + fileType
    let logoPath = getFileLogoURL(fileType)

    let button
    let isHovered = false;

    export let action = function () {}
</script>

<button type='button' bind:this={button} on:click={()=> { 
    if(fileType != 'jpeg'){
        $fileToOpen = name; 
        action();   
    } 
    }} style='background-color: hsl({$bgColor}); color: hsl({$textColor}); border: none; border-bottom: 1px solid hsl({isHovered ? $primaryColor : $textColor + ', 20%'});' on:pointerenter={()=>{isHovered = !isHovered}} on:pointerleave={()=>{isHovered = !isHovered}}>
    
    {#if fileType === 'jpeg' || fileType === 'jpg' || fileType === 'png' || fileType === 'webp'}
        <img src='{filePath + '?thumb=40x40'}' alt='image_file'/>
        <p>{name}</p>
    {:else}
        <img src='{logoPath}' alt='logo' />
        <p>{name}</p>
    {/if}
</button>

<style>
    button{
        width: calc(100% - 10px);
        background: #fdfdfd;
        /* background: linear-gradient(45deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15));
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px); */
        color: #1a1a1a;
        border: none;
        border-radius: 0;
        padding: 10px;
        /* margin: 0 10px 10px 0; */
        box-sizing: border-box;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all 0.25s;
    }
    button:hover{
        background: #f9f9f9;
        border: 1px solid #4233fb20;
        /* transform: scale(1.05); */
    }
    img{
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
    }
    p{
        margin: 0;
        font-size: 1rem;
        font-family: 'Roboto', sans-serif;
    }
</style>