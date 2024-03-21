<script>
    import {secondaryColor, textColor, primaryColor} from '$lib/store'

    export let form

</script>
<div class='container'>
    <h2>Log in</h2>
    <p style='margin: 10px 0 20px 0;'>or <a href='/register' style='color: hsl({$textColor});'>sing up</a> if you don't have an account.</p>

    <form action='?/login' method='POST' class='formContainer'>
    <div class='formFieldContainer'>
        <label for='email' class='formLabel'>
            <span class='labelSpan'>email</span>
        </label>
        <input type='email' name='email' class='formInput' placeholder='your@email.com' style='background: hsl({$secondaryColor}) !important; color: hsl({$textColor}) !important; '/>
    </div>
    <div class='formFieldContainer'>
        <label for='password' class='formLabel'>
            <span class='labelSpan'>password</span>
        </label>
        <input type='password' name='password' class='formInput' placeholder='*******' style='background: hsl({$secondaryColor}) !important; color: hsl({$textColor});'/>
    </div>
    <a href='/reset-password' style='color: hsl({$textColor});'>I forgot my password</a>
    <div class='formFieldContainer'>
        <button type='submit' class='submitButton' style='background: hsl({$primaryColor}); color: #1a1a1a;'>Log In</button>
    </div>
    

    {#if form?.notVerified}
        <div class='alertContainer'>
            <p>Please, verify your email before logging in.</p>
        </div>
    {/if}
    </form>
</div>

<style>
    .container{
        width: min(400px, calc(100% - 10px));
        padding: 10px;
        background: none;
        margin: auto;
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
        font-weight: 300;;
    }
    label{
        margin-bottom: 5px;
    }
    input{
        appearance: none;
        font-family: Source Code Pro, sans-serif;
        font-size: 1rem;
    }

    .submitButton{
        background: #4233fb;
        color: #f9f9f9;
        margin-top: 10px;
        transform: scale(1.0);
        border: none;
        width: fit-content;
    }
    .submitButton:hover{
        box-shadow: 0 0 10px #33dd99;
    }
    .formInput{
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #1a1a1a20;
    }

    .alertContainer{
        background: rgb(255, 218, 218);
        padding: 10px;
        border-radius: 10px;;
    }
</style>