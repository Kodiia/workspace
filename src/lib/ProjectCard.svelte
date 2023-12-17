<script>
    export let title = 'Title'
    export let description = 'Description'
    export let topics = ''
    export let link = ''
    export let imageUrl = '/api/images/courses/8vuzxx3aug1e42w/caYTNNOM8q7V_wHy79LH0FW.webp'
    // export let src = ''
    // let imagePath = 'https:/'

    function setProjectId(){
        // $projectId = id
        // console.log($projectId)
        console.log(link)
    }
</script>

<div class='card-container'>
    <!-- <img src='{src}' alt='project'> -->
    {#if imageUrl}
    <div class='imageContainer' style='background-image: url({imageUrl})'></div>
    {/if}
    <div class='textContainer'>
        <h3>{title}</h3>
        <p>{description}</p>
        {#if topics}
        <p>✔️ Topics: <b>{topics}</b></p>
        {/if}
        <a href={link} on:click={setProjectId}>Start</a>
    </div>
</div>

<style>
    .card-container{
        width: 100%;
        min-height: 300px;
        background: #fdfdfd;
        /* background: linear-gradient(45deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15)); */
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border-radius: 10px;
        box-shadow: 0 0 10px #3d95ee50;
        padding: 5px;
        /* margin: 10px; */
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 1fr 1fr;
        /* flex-direction: column; */
    }
    .card-container:hover{
        background: #f9f9f9;
    }
    .imageContainer{
        width: 100%;
        background: lightgrey;
        background-position: center;
        background-size: cover;
        border-radius: 5px;
    }
    .textContainer{
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    h3{
        margin-top: 0;
    }
    a{
    width: fit-content;
    text-decoration: none;
    background: none;
    color: #3d95ee;
    font-size: 1.2rem;
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
    }
    a:hover{
        text-decoration: underline;
    }
</style>