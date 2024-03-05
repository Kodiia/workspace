<script>
    import ProjectDetailsCard from "$lib/ProjectDetailsCard.svelte";
    import { textColor } from '$lib/store'
    import kodiia_logo_bw from '$lib/logos/kodiia_logo_bw.svg'
    import NavPanel from "$lib/NavPanel.svelte";

    export let data
    let projects = data.projects
</script>

<div class='container'>
<NavPanel data='{data}'/>

<h3 style='margin-top: 70px;'>Projects</h3>
<!-- <p>Follow step-by-step tutorials.</p> -->
{#if projects}
    <div class='projectsContainer'>
        {#each projects as project}
            <ProjectDetailsCard project={project} />
        {/each}
    </div>
{:else}
    <p>Seems like you don't have any projects yet. How about creating one?</p>
{/if}
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
    h3{
        font-weight: 300;
    }
    .projectsContainer{
        display: block;
    }
    .projectWrapper{

    }
</style>