<script>
    import { fileToOpen } from '$lib/store'
    import { getFileLogoURL } from '$lib/utils'
    

    export let name = 'file name'
    let fileType = name.split('.')[1]
    let nameWithoutFileId = name.split('_')[0] + '.' + fileType
    let logoPath = getFileLogoURL(fileType)

    let button
</script>

<button bind:this={button} on:click={()=> { $fileToOpen = nameWithoutFileId }}>
    <img src='{logoPath}' alt='logo' />
    <p>{nameWithoutFileId}</p>
</button>

<style>
    button{
        width: 100%;
        background: #fff;
        color: #1a1a1a;
        border: none;
        border-radius: 20px;
        box-shadow: 0 0 10px rgba(60, 150, 238, 0.2);
        padding: 10px;
        /* margin: 0 10px 10px 0; */
        box-sizing: border-box;

        display: flex;
        align-items: center;

        cursor: pointer;
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