<script>
    import { slide } from 'svelte/transition'
    import {secondaryColor, textColor, primaryColor } from '$lib/store'
    let password = '', confirmPassword = ''
    let emailField, emailValue = ''
    let submitButtonIsHovered = false
</script>

<div class='container'>
    <h2>Sign Up</h2>
    <p style='margin: 10px 0 20px 0;'>or <a href='/login' style='color: hsl({$textColor});'>log in</a> if you already have an account.</p>

    <form action='?/register' method='POST' class='formContainer'>
    <div class='formFieldContainer'>
        <label for='email' class='formLabel'>
            <span class='labelSpan'>email</span>
        </label>
        <input type='email' bind:this={emailField} name='email' class='formInput' style='background: hsl({$secondaryColor}) !important; color: hsl({$textColor});' on:change={()=>{emailValue = emailField.value; emailField.value = emailValue.toLowerCase()}}/>
    </div>
    <div class='formFieldContainer'>
        <label for='password' class='formLabel'>
            <span class='labelSpan'>password</span>
        </label>
        <input bind:value='{password}' type='password' name='password' class='formInput' style='background: hsl({$secondaryColor}) !important; color: hsl({$textColor});' placeholder='min 8 characters' />
    </div>
    <div class='formFieldContainer'>
        <label for='passwordConfirm' class='formLabel'>
            <span class='labelSpan'>confirm password</span>
        </label>
        <input type='password' bind:value='{confirmPassword}' name='passwordConfirm' class='formInput' style='background: hsl({$secondaryColor}) !important; color: hsl({$textColor});' />
    </div>
        {#if password.length >= 8 && password != confirmPassword}
        <p style='color: #ff6f6f' transition:slide >passwords do not match</p>
        {/if}
    <div class='formFieldContainer'>
        <button type='submit' class='submitButton' style='background: {password.length >= 8 && password === confirmPassword ? `hsl(${$primaryColor})` : 'grey'}; color: #1a1a1a; box-shadow: {submitButtonIsHovered && password.length >= 8 && password === confirmPassword ? `0 0 10px hsl(${$primaryColor})` : 'none'}' disabled={password.length >= 8 && password === confirmPassword ? false : true } on:pointerover={()=>{submitButtonIsHovered = true}} on:pointerleave={()=>{submitButtonIsHovered = false}}>Sign Up</button>
    </div>
    
    </form>
    <p>by signing up, you agree to Kodiia's Terms of Service & Privacy Policy.</p>
</div>

<style>
    .container{
        width: min(400px, calc(100% - 10px));
        padding: 10px;
        box-sizing: border-box;
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
        font-weight: 300;
    }
    .submitButton{
        background: #4233fb;
        color: #f9f9f9;
        margin-top: 10px;
        transform: scale(1.0);
        width: fit-content;
        border: none;
    }
    .submitButton:hover{
        box-shadow: 0 0 10px #33dd99;
    }
    .submitButton:disabled{
        background: rgb(150,150,150);
        border: none;
        cursor: default;
        transform: scale(1.0);
    }
    label{
        margin-bottom: 5px;
    }
    input{
        font-family: Source Code Pro, sans-serif;
        font-size: 1rem;
    }
    .formInput{
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #1a1a1a20;
    }
</style>