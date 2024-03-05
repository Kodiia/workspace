<script>
    import ProjectCard from "$lib/ProjectCard.svelte";
    import NavPanel from "$lib/NavPanel.svelte";
    import StylesPanel from "$lib/StylesPanel.svelte";
    import { width, height, stylesPanelState } from '$lib/store'
    import kodiia_logo_bw from '$lib/logos/kodiia_logo_bw.svg'

    export let data
    let challenges = data.challenges
    // console.log(data.user)
    //console.log(data.user, data.user.specialCourses, data.user.specialCourses[0], data.user.specialCourses.specialCourses[0], courses)
</script>

<div class='container'>
<NavPanel data={data} />

<h3 style='margin-top: 70px'>Challenges</h3>
<!-- <p>Unleash your inner developer on thrilling quests that push the limits of design, all in the spirit of fun and exploration.</p> -->
<div class='tutorial-cards-container'>
    {#each challenges as challenge}
        <ProjectCard title={challenge.heading} description={challenge.description} link='challenges/{challenge.id}' />
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
    h3{
        font-weight: 300;
    }
    
    .template-cards-container, .tutorial-cards-container{
        margin-left: auto;
        margin-right: auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 10px;
    }
    
</style>