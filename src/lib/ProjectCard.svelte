<script>
    export let title = 'Title'
    export let description = 'Description'
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
    <div class="linkContainer">
    <a href={link} on:click={setProjectId}>START</a>
    </div>
</div>

<style>
    .card-container{
        width: 25rem;
        background: white;
        border-radius: 20px;
        box-shadow: 0 0 10px rgba(60, 150, 238, 0.2);
        padding: 20px;
        margin: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
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
    font-family: 'Poppins', sans-serif;
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