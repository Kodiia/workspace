<script>
    import {secondaryColor, textColor} from '$lib/store'
    let password = ''
    let emailField, emailValue = ''
</script>

<div class='container' style='background: hsl({$secondaryColor}); border: 1px solid hsl({$textColor + ', 20%'});'>
    <h2>Get started for free</h2>
    <p>Or <a href='/login'>log in</a> if you already have an account.</p>

    <form action='?/register' method='POST' class='formContainer'>
    <div class='formFieldContainer'>
        <label for='email' class='formLabel'>
            <span class='labelSpan'>email</span>
        </label>
        <input type='email' bind:this={emailField} name='email' class='formInput' on:change={()=>{emailValue = emailField.value; emailField.value = emailValue.toLowerCase()}}/>
    </div>
    <div class='formFieldContainer'>
        <label for='password' class='formLabel'>
            <span class='labelSpan'>password</span>
        </label>
        <input bind:value='{password}' type='password' name='password' class='formInput' placeholder='min 8 characters' />
    </div>
    <div class='formFieldContainer'>
        <label for='passwordConfirm' class='formLabel'>
            <span class='labelSpan'>confirm password</span>
        </label>
        <input type='password' name='passwordConfirm' class='formInput' />
    </div>
    <div class='formFieldContainer'>
        <button type='submit' class='submitButton' disabled={password.length >= 8 ? false : true }>Sign Up</button>
    </div>
    </form>
    <p>By signing up for Kodiia, you agree to Kodiia's Terms of Service & Privacy Policy.</p>
</div>

<style>
    .container{
        width: min(400px, calc(100% - 10px));
        padding: 10px;
        background: linear-gradient(45deg, #ffffff10, #ffffff10);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border: 1px solid #ffffff90;
        border-radius: 15px;
        box-shadow: 0 0 10px #3d95ee50;
        box-sizing: border-box;
        margin-left: auto;
        margin-right: auto;
        margin-top: 50px;
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
    }
    .submitButton{
        background: #4233fb;
        color: #f9f9f9;
        margin-top: 10px;
        transform: scale(1.0);
    }
    .submitButton:hover{
        transform: scale(1.01);
    }
    .submitButton:disabled{
        background: rgb(150,150,150);
        border: none;
        cursor: default;
        transform: scale(1.0);
    }
    .formInput{
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #1a1a1a20;
    }
</style>