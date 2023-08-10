<script>
    import ProjectCard from "$lib/ProjectCard.svelte";
    import StylesPanel from "$lib/StylesPanel.svelte";
    import { width, height, stylesPanelState } from '$lib/store'
    import kodiia_logo_bw from '$lib/logos/kodiia_logo_bw.svg'

    export let data
</script>

<div class='container'>
<nav>
    <div class='desktopMenu'>
        <a href='https://kodiia.com'>
            <img src={kodiia_logo_bw} alt='logo' width='70'>
        </a>
    </div>
    <div class='desktopMenu'>
        <a class='smallMenuButton' href='/'>Home</a>
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

<h2 style='margin-top: 70px'>Apps</h2>
<p>Build your skills by playing games or explore simulations.</p>
<div class='tutorial-cards-container'>
    <ProjectCard title='Habitat' description='Sustainable city simulation game.' link='games/city2D' />
    <ProjectCard title='Nature Revival' description='Simulate nature revival in a generative city.' link='games/nature-revival' />
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
    .scrollable-container{
        box-sizing: border-box;
        width: 100%;
        /* height: calc(100% - 4em); */
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
</style>