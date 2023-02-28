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


<div class='container'>
    <!-- <p>{innerWidth}{innerHeight}{$width}{$height}</p> -->
<h1>What code will you write?</h1>
<h2>💫 Starter projects</h2>
<div class='cards-container'>
    {#each projects as project}
        <ProjectCard title={project.name} description={project.description} link='{project.collectionName}/{project.id}' />
    {/each}
</div>
<h2>📚 Tutorials</h2>
<div class='cards-container'>
    {#each tutorials as tutorial}
        <ProjectCard title={tutorial.name} description={tutorial.description} link='{tutorial.collectionName}/{tutorial.id}' />
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
        width: max(1044px);
        height: 100vh;
        /* display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; */
    }
    .cards-container{
        display: grid;
        grid-template-columns: repeat(auto-fill, 26rem);
    }
</style>
