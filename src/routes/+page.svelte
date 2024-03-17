<script>
    import {bgColor, secondaryColor, textColor, primaryColor, accentColor} from '$lib/store'
    import NavPanel from '$lib/NavPanel.svelte';
    import { getFileLogoURL } from '$lib/utils'

    export let form
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
            name: 'CA p5.js',
            logos: ['p5js'],
            size: 30
        },
        {
            name: 'noise',
            logos: ['p5js'],
            size: 30
        },
        {
            name: 'noise 2D',
            logos: ['p5js'],
            size: 30
        }
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
<div class='container' style='background: radial-gradient(circle, hsl({$primaryColor + ", 50%"}), transparent 215px), radial-gradient(circle, hsl({$accentColor + ", 20%"}) 15px, transparent 80px);'>
    
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
        <div class='formFieldContainer'>
            <div style='display:flex; align-items: last baseline;'>
                <!-- <div style='box-sizing: border-box; margin-right: 5px;'>
                <label for='name' class='formLabel'>
                    <span class='labelSpan'>Enter a project name</span>
                </label>
                <input type='text' name='name' class='formInput' value='Shiny Unicorn' style='background: hsl({$bgColor}); color: hsl({$textColor}); border: 1px solid hsl({$textColor + ", 20%"}); width: 100%;'/>
                </div> -->
                <div class='sandboxButtonWrapper' style='background: linear-gradient(45deg, hsl({$primaryColor}) 50%, hsl({$accentColor}));'>
                    <a href="/sandbox/{selectedLibrary}" class='sandboxButton' style='background: hsl({$bgColor}); color: hsl({$textColor});'>Open sandbox</a>
                </div>
                <p>or</p>
                <button type='submit' class='submitButton' style='background: {data.user ? `linear-gradient(45deg, hsl(${$primaryColor}) 50%, hsl(${$accentColor}))` : 'lightgrey'};' disabled='{false}' on:click={()=>{isCreatingProject = true}}>{@html !isCreatingProject ? `<span class="loader" ></span>` : 'Create'}</button>
            </div>
        
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
   
    
        
    <!-- <div class='formFieldContainer'>
        
    </div> -->

    

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

    .dot{
        width: 2px;
        height: 2px;
    }

    .dotsContainer{
        display: flex;
        /* position: absolute; */
        width: 100%;
        height: 100%;
        transition: all 0.25s;
        margin: auto;
        z-index: -1;
    }
    
    .formFieldContainer{
        display: flex;
        flex-direction: column;
        margin: 10px 0;
    }

    .labelSpan{

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
        align-items: end;
    }

    .logosContainer img{
        width: 30px;
        height: 30px;
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