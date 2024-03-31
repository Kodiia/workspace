<script>
    import ProjectCard from "$lib/ProjectCard.svelte";
    import NavPanel from "$lib/NavPanel.svelte";
    import InfoCard from "$lib/InfoCard.svelte";
    import StylesPanel from "$lib/StylesPanel.svelte";
    import { width, height, stylesPanelState } from '$lib/store'
    import kodiia_logo_bw from '$lib/logos/kodiia_logo_bw.svg'

    export let data
    let challenges = data.challenges
    //console.log(data)
    //console.log(data.user, data.user.specialCourses, data.user.specialCourses[0], data.user.specialCourses.specialCourses[0], courses)
</script>
<NavPanel data={data} />

<div class='container'>


<h3 style='margin-top: 70px'>Challenges</h3>
<!-- <p>Unleash your inner developer on thrilling quests that push the limits of design, all in the spirit of fun and exploration.</p> -->
<div class='tutorial-cards-container'>
    {#each challenges as challenge}
        <InfoCard title={challenge.heading} description={challenge.description} link='challenges/{challenge.id}' imageUrl = '{challenge.stepsJSON.steps[0].imageUrl}' date={challenge}/>
        <!-- <ProjectCard title={challenge.heading} description={challenge.description} link='challenges/{challenge.id}' /> -->
    {/each}
</div>

</div>

<style>
    .container{
        margin-left: auto;
        margin-right: auto;
        width: min(100%, 1044px);
        position: relative;
        box-sizing: border-box;
        padding: 0 10px 10px 10px;
        overflow-y: auto;
    }
    h3{
        font-weight: 300;
    }    
</style>