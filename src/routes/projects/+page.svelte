<script>
    import ProjectCard from "$lib/ProjectCard.svelte";
    import StylesPanel from "$lib/StylesPanel.svelte";
    import { textColor } from '$lib/store'
    import kodiia_logo_bw from '$lib/logos/kodiia_logo_bw.svg'
    import NavPanel from "$lib/NavPanel.svelte";

    export let data
    let projects = data.projects
    console.log(data.user)
    //console.log(data.user, data.user.specialCourses, data.user.specialCourses[0], data.user.specialCourses.specialCourses[0], courses)
</script>

<div class='container'>
<NavPanel data='{data}'/>

<h3 style='margin-top: 70px;'>Projects</h3>
<!-- <p>Follow step-by-step tutorials.</p> -->
<div class='projectsContainer'>
    {#each projects as project}
        <div class='projectWrapper' style='border: none; border-bottom: hsl({$textColor + ',20%'})'>
            <h3>{project.name}</h3>
        </div>
        <!-- <ProjectCard title={course.heading} description={course.description} link='courses/{course.url}' /> -->
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
    .projectsContainer{
        display: block;
    }
    .projectWrapper{

    }
</style>