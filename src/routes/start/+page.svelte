<script>
    import {bgColor, secondaryColor, textColor} from '$lib/store'
    import NavPanel from '$lib/NavPanel.svelte';
    import { getFileLogoURL } from '$lib/utils'

    export let form
    export let data

    let selectedLibrary = 'p5.js'
    let availableLibraries = [
        {
            name: 'basic',
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
        }
    ]
    // let logoPath = getFileLogoURL(fileType)
    
    function randomAdjective(){
        let words = ['awesome', 'dazzling', 'cool', 'stunning']
        let word = words[Math.floor(Math.random()*words.length)]
        return word
    }

</script>

<NavPanel data={data}/>

<div class='container'>
    <h2>Start your next <span class='randomWordSpan'>{randomAdjective()}</span> web project.</h2>
    
    <form action='?/createProject' method='POST' class='formContainer'>
        <div class='formFieldContainer'>
            <p style='margin-top: 0; margin-bottom: 5px;'>Choose a template</p>
            <div class='templatesContainer'>
                {#each availableLibraries as lib}
                <div class='buttonWrapper' style='background: {selectedLibrary === lib.name ? "linear-gradient(#3d95ee, #4233fb)" : "linear-gradient(#3d95ee50, #4233fb50)"}; box-shadow: {selectedLibrary === lib.name ? "0 0 10px #3d95ee" : "none"};'>
                    <button type="button" class='libraryButton' style='background:  hsl({$secondaryColor}); color: hsl({$textColor}); border: 1px solid hsl({$textColor + ", 20%"}); animation: {selectedLibrary === lib.name ? "1s infinite blink" : "none"};' 
                    on:click={() => {
                        selectedLibrary = lib.name
                        // libraries = libraries.includes(lib) ? libraries.filter((item) => item !== lib) : [...libraries, lib];
                        // console.log(libraries)
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
    
        <div class='formFieldContainer'>
            <div style='display:flex; align-items: last baseline;'>
                <div style='box-sizing: border-box; margin-right: 5px;'>
                <label for='name' class='formLabel'>
                    <span class='labelSpan'>Enter a project name</span>
                </label>
                <input type='text' name='name' class='formInput' value='Shiny Unicorn' style='background: hsl({$bgColor}); color: hsl({$textColor}); border: 1px solid hsl({$textColor + ", 20%"}); width: 100%;'/>
                </div>
            <button type='submit' class='submitButton' disabled='{data.user ? false : true}'>Create</button>
        </div>
    </div>
   
    
        
    <!-- <div class='formFieldContainer'>
        
    </div> -->

    <p style='margin: 0; text-align: center;'><a href='/register'>Sign Up</a> or <a href='/login'>Log In</a> to create and save projects.</p>

    </form>

    <!-- <details>
        <summary>Resources</summary>
        <a href='/challenges'>Challenges</a>
        <a href='/templates'>Sandbox</a>
    </details> -->

    <!-- <div class='optionsContainer'>
        <a href='/challenges'>Challenges</a>
        <a href='/templates'>Sandbox</a>
    </div> -->

</div>

<style>
    .container{
        width: min(415px, calc(100% - 10px));
        padding: 10px;
        background: none;
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border: none;
        margin-left: auto;
        margin-right: auto;
        margin-top: 60px;
        margin-bottom: 50px;
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
    }
    h2{
        margin: 0;
        margin-bottom: 30px;
        font-weight: 300;
        text-align: center;
    }

    .submitButton{
        width: fit-content;
        height: 50px;
        background: radial-gradient(circle, #3d95ee, #4233fb);
        color: #f9f9f9;
        margin-top: 10px;
        transform: scale(1.0);
        border: 2px solid #4233fb00;
        border-radius: 10px;
        margin: 10px auto 0 auto;
        transition: all 0.25s;
    }
    .submitButton:hover{
        border: 1px solid #3d95ee;
        box-shadow: 0 0 10px #3d95ee;
        background: radial-gradient(circle, #3d95ee, #4233fb);
    }
    .submitButton:disabled{
        background: rgba(150,150,150, 50%);
        border: none;
        box-shadow: none;
        cursor: default;
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