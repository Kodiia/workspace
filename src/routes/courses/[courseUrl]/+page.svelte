<script>
    import { page } from '$app/stores';
    import ProjectCard from "$lib/ProjectCard.svelte";
    import StylesPanel from "$lib/StylesPanel.svelte";
    import { width, height, stylesPanelState } from '$lib/store'
    import kodiia_logo_bw from '$lib/logos/kodiia_logo_bw.svg'

    export let data
    let tutorials = data.tutorials.items
    let courseName = data.course.items[0].heading
    let courseDescription = data.course.items[0].description
    let courseType = data.course.items[0].type
    let courseImageUrl = data.course.items[0].imageUrl

    console.log(tutorials[0].stepsJSON.steps[0].imageUrl)
</script>

<div class='container'>
<nav>
    <div class='desktopMenu'>
        <a href='https://kodiia.com'>
            <img src={kodiia_logo_bw} alt='logo' width='70'>
        </a>
    </div>
    <div class='desktopMenu'>
        <a class='smallMenuButton' href='/'>Home</a>
        {#if data.user}
        <form action='/logout' method='POST'>
            <button type='submit' class='smallMenuButton'>Log Out</button>
        </form>
            <button class="smallMenuButton" on:click='{()=>{stylesPanelState.set(true)}}'>Set theme</button>
        {:else}
            <a class='smallMenuButton' href='/register'>Sign Up</a>
            <a class='smallMenuButton' href='/login'>Log In</a>
        {/if}
    </div>
</nav>


<div class='tutorial-cards-container' style='margin-top: 60px; grid-template-columns: {$width > 900 ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr'}'>
    <div class='descriptionCard' style='background-image: url({courseImageUrl}); grid-column: {$width > 900 ? '1/4' : '1/1'};'>
        <h2 style='width: {$width > 900 ? '50%' : 'auto'}'>{courseName}</h2>
        <p style='width: {$width > 900 ? '50%' : 'auto'}'>{courseDescription}</p>
    </div>
    {#each tutorials as tutorial}
        {#if tutorial.type === 'open'}
            <ProjectCard title={tutorial.heading} description={tutorial.description} link='{$page.url.pathname}/{tutorial.id}' imageUrl='{tutorial.stepsJSON.steps[0].imageUrl}'/>
        {/if}
    {/each}
</div>

</div>

<style>
    .container{
        margin-left: auto;
        margin-right: auto;
        /* margin-top: 10px;
        margin-bottom: 10px; */
        width: min(100%, 1044px);
        /* height: 100vh; */
        position: relative;

        box-sizing: border-box;
        /* height: calc(100% - 4em); */
        padding: 0 10px 10px 10px;
        overflow-y: auto;
    }
    nav{
        position: fixed;
        top:0;
        left: 0;
        min-height: 50px;
        width: 100%;
        box-sizing: border-box;
        border-radius: 0 0 10px 10px;
        background: #fdfdfd;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15));
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        padding: 0 20px;
        margin: 0px 0px 10px 0px;
        box-shadow: 0 0 10px rgba(60, 150, 238, 0.3);
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 2;
    }
    .desktopMenu{
        display: flex;
        align-items: center;
    }
    .tutorial-cards-container{
        margin-left: auto;
        margin-right: auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 10px;
    }
    .smallMenuButton {
      background: none;
      border: none;
      color: #1a1a1a;
      font-family: Roboto, sans-serif;
      font-weight: 300;
      font-size: 1rem;
      text-decoration: none;
      display: flex;
      align-items: center;
      padding: 0 20px 0 0;
    }
    .smallMenuButton:hover {
      background: none;
      border: none;
      font-family: Roboto, sans-serif;
      font-weight: 300;
      font-size: 1rem;
      color: #3d95ee;
      text-decoration: underline;
      display: flex;
      align-items: center;
    }
    .descriptionCard{
        background: #fff;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 0 10px #3d95ee50;
    }
    .descriptionCard h2{
        margin-top: 0;
        color: #f9f9f9;
        background: #1a1a1a;
        padding: 10px;
        border-radius: 10px;
    }
    .descriptionCard p{
        width: 50%;
        color: #f9f9f9;
        background: #1a1a1a;
        padding: 10px;
        border-radius: 10px;
    }
</style>