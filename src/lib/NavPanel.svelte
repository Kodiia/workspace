<script>
    import kodiia_logo_bw from '$lib/logos/kodiia_logo_bw.svg'
    import kodiia_logo_bw_small from '$lib/logos/kodiia_logo_bw_small.svg'
    import { bgColor, textColor, secondaryColor, primaryColor, accentColor, theme, width, height, resourcesPanelDisplay, filesPanelDisplay, stylesPanelState } from "./store"
    import { page } from '$app/stores';

    console.log($page)

    export let data;

    function changeTheme(){
        if($theme === 'dark'){
            $theme = 'light';
            $bgColor = '0, 0%, 98%';
            $secondaryColor = '0, 0%, 100%'
            $textColor = '0, 0%, 10%'
            $primaryColor = '155, 70%, 45%'
            $accentColor = '80, 95%, 40%'
        } else {
            $theme = 'dark';
            $bgColor = '0, 0%, 5%';
            $secondaryColor = '0, 0%, 15%'
            $textColor = '0, 0%, 98%'
            $primaryColor = '155, 70%, 55%'
            $accentColor = '80, 95%, 60%'
        }
    }

    let mobileMenuDisplay = 'none'
</script>

<nav style='color: {$textColor};'>
    {#if $width > 700}
        <div style='width: 100%; display: flex; align-items: center; justify-content: space-between;'>
            <a href='https://kodiia.com'>
                <img src={kodiia_logo_bw} style='filter: {$theme === 'dark' ? "invert(1)" : "invert(0)"};' alt='logo' width='70'>
            </a>
        
            <div class='desktopMenu'>
                {#if $page.route.id != '/'}
                <a class='smallMenuButton' style='padding: 10px;' href='/'>Home</a>
                {/if}

                <a class='smallMenuButton' href='/tutorials'>Tutorials</a>
                <a class='smallMenuButton' href='/challenges'>Challenges</a>
                {#if data.user}
                <a class='smallMenuButton' href='/projects'>Projects</a>
                {/if}

                {#if $page.route.id == '/challenges/[challengeUrl]' || $page.route.id == '/templates/[templateUrl]' || $page.route.id == '/courses/[courseUrl]/[tutorialUrl]' || $page.route.id == '/projects/[projectUrl]/edit' || $page.route.id == '/sandbox/[templateName]'}
                <button class="smallMenuButton" style='padding: 10px;' on:click='{()=>{$filesPanelDisplay = 'block';}}'>Files</button>
                <button class="smallMenuButton" style='padding: 10px;' on:click='{()=>{$resourcesPanelDisplay = 'block';}}'>Resources</button>
                {/if}

                {#if $page.route.id == '/projects/[projectUrl]'}
                <button class="smallMenuButton" style='padding: 10px;' on:click='{()=>{$filesPanelDisplay = 'block';}}'>Files</button>
                {/if}


                {#if data.user}
                <form action='/logout' method='POST'>
                    <button type='submit' class='smallMenuButton'>Log Out</button>
                </form>
                    <!-- <button class="smallMenuButton" on:click='{()=>{stylesPanelState.set(true)}}'>Set theme</button> -->
                {:else}
                    <a class='smallMenuButton' href='/register'>Sign Up</a>
                    <a class='smallMenuButton' href='/login'>Log In</a>
                {/if}
                <button class='smallMenuButton' on:click={changeTheme}>◑</button>
            </div>
        </div>
    {:else}
        <div style='width: 100%; display: flex; align-items: center; justify-content: space-between;'>
            <a href='https://kodiia.com'>
                <img src={kodiia_logo_bw} style='filter: {$theme === 'dark' ? "invert(1)" : "invert(0)"};' alt='logo' width='70'>
            </a>

            <button class='menuButton' on:click={()=>{mobileMenuDisplay === 'none' ? mobileMenuDisplay = 'block' : mobileMenuDisplay = 'none'}}>
                {#if mobileMenuDisplay === 'none'}
                    <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                        <line x1="10" y1="20" x2="40" y2="20" stroke="{ $theme === 'dark' ? '#f9f9f9' : '#1a1a1a' }" stroke-width='2' />
                        <line x1="10" y1="30" x2="40" y2="30" stroke="{ $theme === 'dark' ? '#f9f9f9' : '#1a1a1a' }" stroke-width='2' />
                    </svg>
                {:else}
                    <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                        <line x1="15" y1="15" x2="35" y2="35" stroke="{ $theme === 'dark' ? '#f9f9f9' : '#1a1a1a' }" stroke-width='2' />
                        <line x1="15" y1="35" x2="35" y2="15" stroke="{ $theme === 'dark' ? '#f9f9f9' : '#1a1a1a' }" stroke-width='2' />
                    </svg>
                {/if}
            </button>
        </div>
        <hr style='display: {mobileMenuDisplay}; max-height: calc({$height}px - 70px); width: 100%;'>
        <div class='mobileMenu' style='display: {mobileMenuDisplay}; height: calc({$height}px - 70px);'>
            {#if $page.route.id != '/'}
            <a class='smallMenuButton' style='padding: 10px;' href='/'>Home</a>
            {/if}

            <a class='smallMenuButton' style='padding: 10px;' href='/tutorials'>Tutorials</a>
            <a class='smallMenuButton' style='padding: 10px;' href='/challenges'>Challenges</a>
            {#if data.user}
            <a class='smallMenuButton' style='padding: 10px;' href='/projects'>Projects</a>
            {/if}

            {#if $page.route.id == '/challenges/[challengeUrl]' || $page.route.id == '/templates/[templateUrl]' || $page.route.id == '/courses/[courseUrl]/[tutorialUrl]' || $page.route.id == '/projects/[projectUrl]/edit' || $page.route.id == '/sandbox/[templateName]'}
                <button class="smallMenuButton" style='padding: 10px;' on:click='{()=>{$filesPanelDisplay = 'block'; $resourcesPanelDisplay = 'none'; mobileMenuDisplay = 'none'}}'>Files</button>
                <button class="smallMenuButton" style='padding: 10px;' on:click='{()=>{$resourcesPanelDisplay = 'block'; $filesPanelDisplay = 'none'; mobileMenuDisplay = 'none'}}'>Resources</button>
            {/if}

            <!-- {#if $page.route.id == '/projects/[projectUrl]/edit'}
                <button class="smallMenuButton" style='padding: 10px;' on:click='{()=>{$filesPanelDisplay = 'block'; mobileMenuDisplay = 'none'}}'>Files</button>
            {/if} -->

            {#if data.user}
                <form action='/logout' method='POST'>
                    <button type='submit' class='smallMenuButton' style='padding: 10px;'>Log Out</button>
                </form>
                <!-- <button class="smallMenuButton" style='padding: 10px;' on:click='{()=>{stylesPanelState.set(true)}}'>Set theme</button> -->
            {:else}
                <a class='smallMenuButton' style='padding: 10px;' href='/register'>Sign Up</a>
                <a class='smallMenuButton' style='padding: 10px;' href='/login'>Log In</a>
            {/if}
            <button class='smallMenuButton' style='padding: 10px;' on:click={changeTheme}>◑</button>
        </div>
    {/if}
</nav>

<style>
    nav{
        position: fixed;
        top:0;
        left: 0;
        min-height: 50px;
        width: 100%;
        box-sizing: border-box;
        border-radius: 0 0 10px 10px;
        background: #fdfdfd;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        padding: 0 20px;
        margin: 0px 0px 10px 0px;
        box-shadow: 0 0 10px rgba(60, 150, 238, 0.3);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 5;
    }
    .smallMenuButton {
      background: none;
      border: none;
      color: inherit;
      /* color: #1a1a1a; */
      font-family: Roboto, sans-serif;
      font-weight: 300;
      font-size: 1rem;
      text-decoration: none;
      display: flex;
      align-items: center;
      padding: 0 20px 0 0;
    }
    .smallMenuButton:hover {
      text-decoration: underline;
    }
    .desktopMenu{
        display: flex;
        align-items: center;
    }
    .mobileMenu{
        width: 100%;
        overflow-y: auto;
        margin-bottom: 10px;
        padding-bottom: 10px;
        box-sizing: border-box;
    }

    .menuButton{
        padding: 5px;
        width: 50px;
        height: 50px;
        border: none;
        transform: scale(1.0);
    }
    .menuButton:hover{
        background: none;
        transform: scale(1.1);
    }
</style>