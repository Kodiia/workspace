<script>
    import ProjectCard from "$lib/ProjectCard.svelte";
    import { width, height } from '$lib/store'

    export let data
    console.log(data.projects.items)

    let items = data.projects.items
    // let title = data.result.items[0].project_name
    // let description = data.result.items[0].project_description
    let tutorials = data.tutorials.items

    let innerWidth = 0
    let innerHeight = 0
    $: {
        $width = innerWidth;
        $height = innerHeight;
    }
</script>

<svelte:head>
    <title>Kodiia Workspace</title>
    <meta name="online workspace to learn programming and build projects">
</svelte:head>

<svelte:window bind:innerWidth bind:innerHeight />

<div class='container'>
    <!-- <p>{innerWidth}{innerHeight}{$width}{$height}</p> -->
<h1>What code will you write?</h1>
<div class='cards-container'>
    {#each items as item}
        <ProjectCard title={item.project_name} description={item.project_description} link='{item.collectionName}/{item.id}' />
    {/each}
</div>
<div class='cards-container'>
    {#each tutorials as tutorial}
        <ProjectCard title={tutorial.name} description={tutorial.description} link='{tutorial.collectionName}/{tutorial.id}' />
    {/each}
</div>
</div>

<style>
    .container{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .cards-container{
        display: grid;
        grid-template-columns: repeat(auto-fill, 26rem);
    }
</style>
