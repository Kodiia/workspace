<script>
let password = ''
</script>
<div class='container'>
    <h2>Get started for free</h2>
    <p>Or <a href='/login'>log in</a> if you already have an account.</p>

    <form action='?/register' method='POST' class='formContainer'>
    <div class='formFieldContainer'>
        <label for='email' class='formLabel'>
            <span class='labelSpan'>email</span>
        </label>
        <input type='email' name='email' class='formInput' />
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
        width: min(400px, 100%);
        padding: 10px;
        background: linear-gradient(45deg, #ffffff50, #ffffff90);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border: 1px solid #ffffff90;
        border-radius: 15px;
        box-shadow: 0 0 10px #4233fb20;
        box-sizing: border-box;
        margin-left: auto;
        margin-right: auto;
        margin-top: 50px;
    }
    .formFieldContainer{
        display: flex;
        flex-direction: column;
        margin: 10px 0;
    }
    a{
        color: #4233fb;
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
        background: lightgrey;
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