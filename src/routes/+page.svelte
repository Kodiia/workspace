<script>
    import ProjectCard from "$lib/ProjectCard.svelte";
    import { width, height } from '$lib/store'

    export let data
    console.log(data.projects.items, data.tutorials.items)

    let projects = data.projects.items
    // let title = data.result.items[0].project_name
    // let description = data.result.items[0].project_description
    let tutorials = data.tutorials.items

</script>


<div class='container' style='height: calc({$height}px - 70px);'>
    <!-- <p>{innerWidth}{innerHeight}{$width}{$height}</p> -->
<h1>What code will you write?</h1>
<h2>💫 Templates</h2>
<div class='template-cards-container'>
    {#each projects as project}
        <ProjectCard title={project.name} description={project.description} topics='' link='{project.collectionName}/{project.id}' />
    {/each}
</div>
<h2>📚 Tutorials</h2>
<div class='tutorial-cards-container'>
    {#each tutorials as tutorial}
        <ProjectCard title={tutorial.name} description={tutorial.description} topics={tutorial.topics} link='{tutorial.collectionName}/{tutorial.id}' />
    {/each}
</div>
</div>

<style>
    h1{
        text-align: center;
    }
    h2{
        margin-left: 10px;
    }
    .container{
        margin-left: auto;
        margin-right: auto;
        margin-top: 10px;
        margin-bottom: 10px;
        width: max(1044px);
        height: 100vh;

        background: #fdfdfd;
        background: linear-gradient(45deg, #ffffff50, transparent);
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(60, 150, 238, 0.5);
        padding: 20px;
        /* margin: 10px; */
        box-sizing: border-box;
        /* display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; */
        overflow-y: auto;
    }
    .template-cards-container, .tutorial-cards-container{
        margin-left: auto;
        margin-right: auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 10px;
    }
</style>
