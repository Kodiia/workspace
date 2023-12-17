<script>
    import ProjectCard from "$lib/ProjectCard.svelte";
    import StylesPanel from "$lib/StylesPanel.svelte";
    import { width, height, stylesPanelState } from '$lib/store'
    import kodiia_logo_bw from '$lib/logos/kodiia_logo_bw.svg'
    import monster from '$lib/images/start_page_image.webp'
	import { getImageUrl } from "$lib/utils.js";
	import { json } from "@sveltejs/kit";

    export let data
    // console.log(data.projects.items, data.tutorials.items)
    // console.log(data.user)

    let projects = data.projects.items
    // let title = data.result.items[0].project_name
    // let description = data.result.items[0].project_description
    let tutorials = data.tutorials.items
    let courses = data.courses.items
    let challenges = data.challenges.items
</script>

<div class='container'>
<nav>
    <div class='desktopMenu'>
        <a href='https://kodiia.com'>
            <img src={kodiia_logo_bw} alt='logo' width='70'>
        </a>
    </div>
    <div class='desktopMenu'>
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

{#if $stylesPanelState}
    <div style='position: absolute; top: 0px; right: 0px; padding: 0px; width: min(300px, 100%);'>
        <StylesPanel />
    </div>
{/if}

<!-- <p>{innerWidth}{innerHeight}{$width}{$height}</p> -->
<!-- <h1 style='margin-top: 70px;'>What code will you write?</h1> -->
<div class='scrollable-container'>
    <div class='warning' style='flex-direction: {$width < 700 ? "column" : "row"};'>
        <img src={monster} alt='monster funny' />
            <div>
            <p>Hello! Thank you for being here! Kodiia is currently undergoing active development, so there may be things where certain features do not function as intended. In fact, it's possible that none of the features will work as expected. If you come across any unusual behavior on this platform, please do not hesitate to contact us at <span>info@kodiia.com</span>.</p>
            <!-- <p>💜💜💜</p> -->
            <p>Best, <br>Stepan from Kodiia</p>
        </div>
    </div>

    <h2>Challenges</h2>
    <p>Unleash your inner developer on thrilling quests that push the limits of design, all in the spirit of fun and exploration.</p>
    <div class='challenges-cards-container'>
        {#each challenges as challenge}
            {#if challenge.type === 'open'}
                <ProjectCard title={challenge.heading} description={challenge.description} link='challenges/{challenge.id}' imageUrl = '{challenge.stepsJSON.steps[0].imageUrl}' />
            {/if}
        {/each}

        {#if data.user}
            {#each challenges as challenge}
                {#if challenge.type === 'special' && data.user.specialChallenges.specialChallenges != null}
                    {#each data.user.specialChallenges.specialChallenges as specialChallenge}
                        {#if specialChallenge === challenge.url}
                            <ProjectCard title={challenge.heading} description={challenge.description} link='courses/{challenge.url}' imageUrl = '{challenge.stepsJSON.steps[0].imageUrl}'/>
                        {/if}
                    {/each}
                {/if}
            {/each}
        {/if}
    </div>
    
    <h2>Courses</h2>
    <p>Follow step-by-step tutorials.</p>
    <div class='tutorial-cards-container'>
        {#each courses as course}
            {#if course.type === 'open'}
                <ProjectCard title={course.heading} description={course.description} link='courses/{course.url}' imageUrl = '{course.imageUrl}'/>
            {/if}
        {/each}

        {#if data.user}
            {#each courses as course}
                {#if course.type === 'special' && data.user.specialCourses.specialCourses != null}
                    {#each data.user.specialCourses.specialCourses as specialCourse}
                        {#if specialCourse === course.url}
                            <ProjectCard title={course.heading} description={course.description} link='courses/{course.url}' imageUrl = '{course.imageUrl}'/>
                        {/if}
                    {/each}
                {/if}
            {/each}
        {/if}
    </div>

    <!-- <h2>Apps</h2>
    <p>The Apps section is a treasure trove of prototypes of games and complex systems controlled by cellular automata and other algorithms. This section showcases real-life examples of what can be built with procedural design techniques, and it's created with a goal to be the perfect place for creative developers to explore, experiment, and push the boundaries of what's possible.</p>
    <div class='tutorial-cards-container'>
        <ProjectCard title='Procedural World' description='A procedural world generator that is powered by a 3D cellular automata system. Create an intricate procedural world that is both dynamic and engaging. Join us on a journey through a world that is truly alive!' link='games/procedural-worlds' />
    </div> -->

    <h2>Templates</h2>
    <p>Start building a project on your own.</p>
    <div class='template-cards-container'>
        {#each projects as project}
            <ProjectCard title={project.name} description={project.description} topics='' link='templates/{project.id}' imageUrl = '{project.imageUrl}'/>
        {/each}
    </div>
</div>

<!-- <div class='panelsContainer' style='height: calc({$height}px - 70px);'>
    
</div> -->
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
    }
    .warning{
        margin-top: 0px;
        padding: 10px;
        background: #fdfdfd;
        border-radius: 10px;
        box-shadow: 0 0 10px #3d95ee50;
        display: flex;
    }
    .warning img {
        width: 200px;
        height: 200px;
        padding-right: 10px;
    }
    .warning span{
        color: #4233fb;
        font-weight: 500;
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
    h1{
        text-align: center;
    }
    h2{
        margin-left: 0px;
    }
    
    .scrollable-container{
        box-sizing: border-box;
        width: 100%;
        /* height: calc(100% - 4em); */
        padding: 60px 10px 10px 10px;
        overflow-y: auto;
    }
    .template-cards-container, .tutorial-cards-container, .challenges-cards-container{
        margin-left: auto;
        margin-right: auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 10px;
    }
    .tutorial-cards-container{
        display: grid;
        grid-template-columns: 1fr;
    }
    .challenges-cards-container{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));;
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
