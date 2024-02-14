<script>

    import { bgColor, textColor, secondaryColor } from "./store"
    import { createSVG } from "./createSVG";
    import ClippedWithSvg from "./ClippedWithSVG.svelte";
	import { onMount } from "svelte";

    // let cardImageContainer
    // let cardImageWidth
    // let contour
    // onMount(()=>{
    //     contour = createSVG(cardImageContainer)
    // })

    // export let id = 'test'
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
    
    let isHovered = false;
</script>

<div class='card-container' style='background-color: hsl({$secondaryColor}); color: hsl({$textColor}); border-color: hsl({isHovered ? '245, 96%, 85%, 50%' : $secondaryColor}); box-shadow: {isHovered ? "0 0 15px #3d95ee90" : "0 0 10px #3d95ee50"};' on:pointerenter={()=>{isHovered = !isHovered}} on:pointerleave={()=>{isHovered = !isHovered}}>
    <!-- <img src='{src}' alt='project'> -->
    {#if imageUrl}
        <!-- <div class='imageContainer' style='background-image: url({imageUrl}); clip-path: {contour};'></div> -->
        <ClippedWithSvg imageUrl = {imageUrl}/>
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
        max-width: 400px;
        min-height: 300px;
        background: #fdfdfd;
        /* background: linear-gradient(45deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15)); */
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border-radius: 10px;
        border: 1px solid #fdfdfd;
        box-shadow: 0 0 10px #3d95ee50;
        padding: 5px;
        /* margin: 10px; */
        box-sizing: border-box;
        /* display: grid;
        grid-template-columns: 1fr 1fr; */
        /* flex-direction: column; */
        transition: all 0.5s;
    }

    .imageContainer{
        aspect-ratio: 1/1;
        margin-bottom: 10px;
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