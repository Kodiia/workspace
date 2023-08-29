<script>
    export let title = 'Title'
    export let description = 'Description'
    export let topics = ''
    export let link = ''
    // export let src = ''
    // let imagePath = 'https:/'

    function setProjectId(){
        // $projectId = id
        // console.log($projectId)
        console.log("hi", link)
    }
</script>

<div class='card-container'>
    <!-- <img src='{src}' alt='project'> -->
    <h3>{title}</h3>
    <p>{description}</p>
    {#if topics}
    <p>✔️ Topics: <b>{topics}</b></p>
    {/if}
    <div class="linkContainer">
    <a href={link} on:click={setProjectId}>Start</a>
    </div>
</div>

<style>
    .card-container{
        width: 100%;
        background: #fdfdfd;
        /* background: linear-gradient(45deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15)); */
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border-radius: 10px;
        box-shadow: 0 0 10px #3d95ee50;
        padding: 15px;
        /* margin: 10px; */
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    .card-container:hover{
        background: #f9f9f9;
    }
    h3{
        margin-top: 0;
    }
    a{
    /* width: 200px;
    height: 50px; */
    text-decoration: none;
    padding: 0.4rem 1rem;
    border: 2px solid #4233fb;
    border-radius: 2rem;
    background: none;
    color: #4233fb;
    font-size: 1.2rem;
    font-family: 'Montserrat', sans-serif;
    margin-top: auto;
    }
    a:hover{
        background: #4233fb;
        color: #f9f9f9;
        cursor: pointer;
    }
    .linkContainer{
        margin-top: auto;
        margin-bottom: 10px;
    }
</style>