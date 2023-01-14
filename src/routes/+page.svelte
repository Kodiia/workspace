<script>
    import ProjectCard from "$lib/Project-card.svelte";

    export let data

    let items = data.result.items
    // let title = data.result.items[0].project_name
    // let description = data.result.items[0].project_description
</script>

<svelte:head>
    <title>Kodiia Workspace</title>
    <meta name="online workspace to learn programming and build projects">
</svelte:head>

<div class='container'>
<h1>What code will you write?</h1>
<div class='cards-container'>
    {#each items as item}
        <ProjectCard title={item.project_name} description={item.project_description} />
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
