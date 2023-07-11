<script>
    import ProjectCard from "$lib/ProjectCard.svelte";
    import StylesPanel from "$lib/StylesPanel.svelte";
    import { width, height, stylesPanelState } from '$lib/store'

    export let data
    // console.log(data.projects.items, data.tutorials.items)
    console.log(data.user)

    let projects = data.projects.items
    // let title = data.result.items[0].project_name
    // let description = data.result.items[0].project_description
    let tutorials = data.tutorials.items

</script>

<div class='container'>
<nav>
    <div class='desktopMenu'>
        <!-- <a href='../' aria-label="menu" class='smallMenuButton'>Dashboard</a> -->
    </div>
    <div class='desktopMenu'>
        {#if data.user}
            <button class='smallMenuButton'>Log Out</button>
            <button class="smallMenuButton" on:click='{()=>{stylesPanelState.set(true)}}'>Set theme</button>
        {:else}
            <a class='smallMenuButton' href='/register'>Sign Up</a>
            <a class='smallMenuButton' href='/login'>Log In</a>
        {/if}
    </div>
</nav>

{#if $stylesPanelState}
    <div style='position: absolute; top: 0px; right: 0px; padding: 0px; width: min(300px, 100%);'>
        <StylesPanel />
    </div>
{/if}
<div class='panelsContainer' style='height: calc({$height}px - 70px);'>
    <!-- <p>{innerWidth}{innerHeight}{$width}{$height}</p> -->
    <h1 style='margin: 0px;'>What code will you write?</h1>
    <div class='scrollable-container'>
        <h2>Templates</h2>
        <div class='template-cards-container'>
            {#each projects as project}
                <ProjectCard title={project.name} description={project.description} topics='' link='{project.collectionName}/{project.id}' />
            {/each}
        </div>
        <h2>Tutorials</h2>
        <div class='tutorial-cards-container'>
            {#each tutorials as tutorial}
                <ProjectCard title={tutorial.name} description={tutorial.description} topics={tutorial.topics} link='{tutorial.collectionName}/{tutorial.id}' />
            {/each}
        </div>
    </div>
</div>
</div>

<style>
    .container{
        margin-left: auto;
        margin-right: auto;
        /* margin-top: 10px;
        margin-bottom: 10px; */
        width: min(100%, 1044px);
        height: 100vh;
        position: relative;
    }
    .panelsContainer{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background: #fdfdfd;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15));
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(60, 150, 238, 0.3);
        /* margin: 10px; */
        box-sizing: border-box;
        /* display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; */
    }
    nav{
        height: 40px;
        border-radius: 20px;
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
    }
    .desktopMenu{
        display: flex;
        align-items: center;
    }
    h1{
        text-align: center;
    }
    h2{
        margin-left: 0px;
    }
    
    .scrollable-container{
        box-sizing: border-box;
        width: calc(100% - 20px);
        height: calc(100% - 4em);
        padding: 0 10px 10px 10px;
        overflow-y: auto;
    }
    .template-cards-container, .tutorial-cards-container{
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
    .sign-in-button{
        margin-right: 5px;
        height: 30px;
        border-radius: 15px;
        padding: 0 10px;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
    }
</style>
