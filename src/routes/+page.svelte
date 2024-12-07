<script>
    import {bgColor, secondaryColor, textColor, primaryColor, accentColor} from '$lib/store'
    import NavPanel from '$lib/NavPanel.svelte';
    import { getFileLogoURL } from '$lib/utils'

    // export let form
    export let data

    let buttonText = 'Create'
    let isCreatingProject = false

    let selectedLibrary = 'static'
    let availableLibraries = [
        {
            name: 'static',
            logos: ['html', 'css', 'js'],
            size: 30
        }, 
        {
            name: 'p5.js',
            logos: ['p5js'],
            size: 40
        },
        {
            name: 'three.js',
            logos: ['threejs'],
            size: 30
        },
        {
            name: 'brain.js',
            logos: ['brainjs'],
            size: 30
        },
        {
            name: 'CAcraft',
            logos: ['threejs'],
            size: 30
        },
        {
            name: 'GLB',
            logos: ['threejs'],
            size: 30
        }, 
        {
            name: 'OSM',
            logos: ['p5js'],
            size: 40
        }, 
        {
            name: 'FF2D',
            logos: ['p5js'],
            size: 40
        },
        {
            name: 'FF3D',
            logos: ['threejs'],
            size: 30
        }, 
        {
            name: 'flock2D',
            logos: ['p5js'],
            size: 40
        },
        {
            name: 'CAdiffusion3d',
            logos: ['threejs'],
            size: 30
        }
        // {
        //     name: 'CA p5.js',
        //     logos: ['p5js'],
        //     size: 30
        // },
        // {
        //     name: 'noise',
        //     logos: ['p5js'],
        //     size: 30
        // },
        // {
        //     name: 'noise 2D',
        //     logos: ['p5js'],
        //     size: 30
        // }
    ]
    // let logoPath = getFileLogoURL(fileType)
    
    function randomAdjective(){
        let words = ['creative', 'procedural', 'generative', 'computational', 'art', 'simulation', 'game', 'cutting-edge', 'disruptive']
        let word = words[Math.floor(Math.random()*words.length)]
        return word
    }

    

</script>

<!-- <svelte:window on:pointermove={moveDots}></svelte:window> -->

<NavPanel data={data}/>
<!-- style='background-image: radial-gradient(circle, hsl({$primaryColor + ', 20%'}) 1px, transparent 2px);' -->
<div class='container' style='background: radial-gradient(circle at 50% 40%, hsl({$primaryColor + ", 50%"}), transparent 215px), radial-gradient(circle at 50% 40%, hsl({$accentColor + ", 20%"}) 15px, transparent 80px);'>
    
    <h2>Your next <span class='randomWordSpan' style='background: linear-gradient(45deg, hsl({$primaryColor}), hsl({$accentColor})) text;'>{randomAdjective()}</span> web project starts here.</h2>
    
    <form action='?/createProject' method='POST' class='formContainer'>
        <div class='formFieldContainer'>
            <p style='margin-top: 0; margin-bottom: 5px; text-align: center;'>Select a template</p>
            <div class='templatesContainer'>
                {#each availableLibraries as lib}
                    <div class='buttonWrapper' style='background: {selectedLibrary === lib.name ? `linear-gradient(hsl(${$primaryColor}), hsl(${$accentColor}))` : `linear-gradient(hsl(${$primaryColor + ', 20%'}), hsl(${$accentColor + ', 20%'}))`}; box-shadow: {selectedLibrary === lib.name ? `0 0 10px hsl(${$primaryColor})` : "none"};'>
                        <button type="button" class='libraryButton' style='background:  hsl({$secondaryColor}); color: hsl({$textColor}); border: 1px solid hsl({$textColor + ", 20%"}); animation: {selectedLibrary === lib.name ? "1s infinite blink" : "none"};' 
                        on:click={() => {
                            selectedLibrary = lib.name
                            }}>
                            <div class='logosContainer' style='background: none;'>
                                {#each lib.logos as logo}
                                    <img src={getFileLogoURL(logo)} alt='logo' style='width: {lib.size + 'px'}'/>    
                                {/each}
                            </div>
                            <div class='libraryNameWrapper'>
                                {lib.name}
                            </div>
                        </button>
                    </div>
                {/each}
            </div>
            <input type='text' name='template' class='formInput' value='{selectedLibrary}' style='display: none;'/>
            
        </div>
    
        {#if data.user}
            <div style='display:flex; align-items: center;'>
                <div class='sandboxButtonWrapper' style='background: linear-gradient(45deg, hsl({$primaryColor}) 50%, hsl({$accentColor}));'>
                    <a href="/sandbox/{selectedLibrary}" class='sandboxButton' style='background: hsl({$bgColor}); color: hsl({$textColor});'>Open sandbox</a>
                </div>
                <p>or</p>
                <button type='submit' class='submitButton' style='background: {data.user ? `linear-gradient(45deg, hsl(${$primaryColor}) 50%, hsl(${$accentColor}))` : 'lightgrey'};' disabled='{false}' on:click={()=>{isCreatingProject = true}}>{@html isCreatingProject ? `<span class="loader" style="margin: 0;"></span>` : 'Create'}</button>
            </div>
        {:else}
            <div style='display: flex; align-items: center;'>
                <div class='sandboxButtonWrapper' style='background: linear-gradient(45deg, hsl({$primaryColor}) 50%, hsl({$accentColor}));'>
                    <a href="/sandbox/{selectedLibrary}" class='sandboxButton' style='background: hsl({$bgColor}); color: hsl({$textColor});'>Open sandbox</a>
                </div>
                <p>or</p>
                <button type='submit' class='submitButton' style='background: {data.user ? `linear-gradient(45deg, hsl(${$primaryColor}) 50%, hsl(${$accentColor}))` : 'lightgrey'};' disabled='{true}'>Create</button>
            </div>
            <p style='margin: 0; text-align: center;'><a href='/register' style='color: hsl({$textColor});'>Sign Up</a> or <a href='/login' style='color: hsl({$textColor});'>Log In</a> to create and save projects.</p>
        {/if}

        <p style='margin: 10px 0 0 0; text-align: center;'>Join the Discord community!</p>
        <div class='SVGcontainer'>
            <a href='https://discord.gg/PWjgJafMkF' target="_blank">
                <svg width="40" height="40" viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
                    <g>
                        <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="hsl({$textColor})" fill-rule="nonzero">
                </path>
                    </g>
                </svg>
            </a>
        </div>

    </form>

</div>

<style>
    .container{
        width: min(415px, calc(100% - 10px));
        padding: 60px 10px;
        /* background-size: 20px 20px;
        background-repeat: repeat; */
        border: none;
        margin: auto;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    /* .dot{
        width: 2px;
        height: 2px;
    }

    .dotsContainer{
        display: flex;
        width: 100%;
        height: 100%;
        transition: all 0.25s;
        margin: auto;
        z-index: -1;
    } */
    
    .formFieldContainer{
        display: flex;
        flex-direction: column;
        margin: 10px 0;
    }

    a{
        color: #3d95ee;
        transition: all 0.25s;
    }
    h2{
        margin: 0;
        margin-bottom: 30px;
        font-weight: 300;
        text-align: center;
    }

    .sandboxButtonWrapper{
        height: 50px;
        padding: 2px;
        margin: 40px auto;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        box-sizing: border-box;
    }

    .sandboxButton{
        display: flex;
        width: fit-content;
        height: 100%;
        padding: 0 5px;
        border-radius: 8px;
        text-decoration: none;
        color: #1a1a1a;
        justify-content: center;
        align-items: center;
        transition: all 0.25s;
    }
    .sandboxButton:hover{
        box-shadow: 0 0 15px hsl(155, 95%, 35%);
    }

    .submitButton{
        width: 100px;
        height: 50px;
        background: radial-gradient(circle, #3d95ee, #4233fb);
        color: #1a1a1a;
        transform: scale(1.0);
        border: 2px solid #4233fb00;
        border-radius: 10px;
        margin: 0 auto;
        transition: all 0.25s;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
    }
    .submitButton:hover{
        box-shadow: 0 0 15px hsl(155, 95%, 35%);
    }
    .submitButton:disabled{
        background: rgba(150,150,150, 50%);
        border: none;
        box-shadow: none;
        cursor: default;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .formInput{
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #1a1a1a20;
        font-family: "Source Code Pro", sans-serif;
        font-size: 1.2rem;
    }
    input{
        height: 50px;
        box-sizing: border-box;
        margin-top: 15px;
        margin-right: 5px;
        transition: all 0.25s;
    }
    input:focus{
        border: 1px solid #3d95ee;
    }
    label{
        padding-bottom: 10px;
    }
    .randomWordSpan{
        background: linear-gradient(45deg, #3d95ee, #4233fb);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-weight: 500;
        letter-spacing: -1px;
    }

    .templatesContainer {
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(auto-fit, 100px);
        gap: 5px;
        margin-top: 10px;;
    }

    .buttonWrapper{
        width: 100px;
        height: 100px;
        padding: 1px;
        border-radius: 10px;
        transition: all 0.25s;
        box-sizing: border-box;
    }

    .libraryButton{
        width: 100%;
        height: 100%;
        padding: 2px 1px 1px 1px;
        margin-right: 5px;
        transition: all 0.25s;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
    }

    .libraryNameWrapper{
        height: 30%;
        width: 100%;
        padding: 5px;
        border-radius: 9px;
        display: flex;
        justify-content: center;
        align-items: end;
        box-sizing: border-box;
    }

    .logosContainer{
        height: 55%;
        display: flex;
        align-items: flex-end;
    }

    .logosContainer img{
        width: 30px;
        height: 30px;
    }

    .SVGcontainer{
        margin: 10px auto;
        display: flex;
        justify-content: center;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 


    @keyframes blink {
        0%{
            filter: drop-shadow(0 0 0px #3d95ee);
        }
        50%{
            filter: drop-shadow(0 0 10px #3d95ee);
        }
        100%{
            filter: drop-shadow(0 0 0px #3d95ee);
        }
    }
</style>