<script>
    import { fileToOpen, bgColor, textColor, secondaryColor } from '$lib/store'
    import { getFileLogoURL } from '$lib/utils'
    

    export let name = 'file name'
    let fileType = name.split('.')[1]
    let nameWithoutFileId = name.split('_')[0] + '.' + fileType
    let logoPath = getFileLogoURL(fileType)

    let button
    let isHovered = false;
</script>

<button bind:this={button} on:click={()=> { $fileToOpen = nameWithoutFileId }} style='background-color: hsl({$secondaryColor}); color: hsl({$textColor}); border-color: hsl({isHovered ? '245, 96%, 85%, 50%' : $secondaryColor}); box-shadow: {isHovered ? "0 0 15px #3d95ee90" : "0 0 10px #3d95ee50"};' on:pointerenter={()=>{isHovered = !isHovered}} on:pointerleave={()=>{isHovered = !isHovered}}>
    <img src='{logoPath}' alt='logo' />
    <p>{nameWithoutFileId}</p>
</button>

<style>
    button{
        width: 100%;
        background: #fdfdfd;
        /* background: linear-gradient(45deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15));
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px); */
        color: #1a1a1a;
        border: 1px solid #f9f9f9;
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(60, 150, 238, 0.2);
        padding: 10px;
        /* margin: 0 10px 10px 0; */
        box-sizing: border-box;

        display: flex;
        align-items: center;

        cursor: pointer;

        /* transform: scale(1.0); */

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