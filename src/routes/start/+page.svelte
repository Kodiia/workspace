<script>
    import {bgColor, secondaryColor, textColor} from '$lib/store'
    import NavPanel from '$lib/NavPanel.svelte';
    export let form
    export let data

    let libraries = []
    let availableLibraries = ['p5.js', 'three.js', 'brain.js']
    function randomAdjective(){
        let words = ['awesome', 'dazzling', 'cool', 'stunning']
        let word = words[Math.floor(Math.random()*words.length)]
        return word
    }

</script>

<NavPanel data={data}/>

<div class='container' style='background: hsl({$secondaryColor}); border: 1px solid hsl({$textColor + ', 20%'});'>
    <h2>My next <span class='randomWordSpan'>{randomAdjective()}</span> web project is...</h2>
    
    <form action='?/createProject' method='POST' class='formContainer'>
    <div class='formFieldContainer'>
        <label for='name' class='formLabel'>
            <span class='labelSpan'>project name</span>
        </label>
        <input type='text' name='name' class='formInput' value='Shiny Unicorn' style='background: hsl({$bgColor}); color: hsl({$textColor}); border: 1px solid hsl({$textColor + ", 20%"});'/>
    </div>
    <div class='formFieldContainer'>
        <p style='margin-top: 0; margin-bottom: 5px;'>add libraries</p>
        <div class='buttonsContainer'>
            {#each availableLibraries as lib}
                <button type="button" class='libraryButton' style='background: {libraries.includes(lib) ? "#3d95ee" : "none"}; color: hsl({libraries.includes(lib) ? "0, 0%, 98%" : "210, 84%, 59%"});' 
                on:click={() => {
                    libraries = libraries.includes(lib) ? libraries.filter((item) => item !== lib) : [...libraries, lib];
                    console.log(libraries)
                    }}>
                {lib}
                </button>
            {/each}
        </div>
        
    </div>
    
        
    <div class='formFieldContainer'>
        <button type='submit' class='submitButton' disabled='{data.user ? false : true}'>Create</button>
    </div>

    <p style='margin: 0;'>Please, <a href='/register'>Sign Up</a> or <a href='/login'>Log In</a> to create project<br> or continue to other resources.</p>

    </form>

    <!-- <details>
        <summary>Resources</summary>
        <a href='/challenges'>Challenges</a>
        <a href='/templates'>Sandbox</a>
    </details> -->

    <div class='optionsContainer'>
        <a href='/challenges'>Challenges</a>
        <a href='/templates'>Sandbox</a>
    </div>

</div>

<style>
    .container{
        width: min(400px, calc(100% - 10px));
        padding: 10px;
        background: linear-gradient(45deg, #ffffff50, #ffffff90);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border: 1px solid #ffffff90;
        border-radius: 15px;
        box-shadow: 0 0 10px #3d95ee50;
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
    a{
        color: #3d95ee;
    }
    h2{
        margin: 0;
        margin-bottom: 20px;
    }

    .submitButton{
        width: 200px;
        height: 50px;
        background: radial-gradient(circle, #3d95ee, #4233fb);
        color: #f9f9f9;
        margin-top: 10px;
        transform: scale(1.0);
        border: 2px solid #4233fb00;
        border-radius: 25px;
        margin: 10px auto;
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
    input:focus{
        border: 1px solid #3d95ee;
    }
    label{
        padding-bottom: 10px;
    }
    .randomWordSpan{
        background: radial-gradient(circle, #3d95ee, #4233fb);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .buttonsContainer {
        display: block;
    }

    .libraryButton{
        width: fit-content;
        padding: 5px;
        border: 1px solid #3d95ee;
        margin-right: 5px;
    }

    .optionsContainer{
        display: flex;
        justify-content: space-around;
        padding: 20px 0 10px 0;
    }

    .optionsContainer a{
        text-decoration: none;
        background: #4233fb;
        padding: 10px;
        color: #f9f9f9;
        border-radius: 10px;
        transition: all 0.25s;
    }
    .optionsContainer a:hover{
        box-shadow: 0 0 10px #3d95ee;
    }
</style>