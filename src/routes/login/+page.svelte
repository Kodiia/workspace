<script>
    export let form

</script>
<div class='container'>
    <h2>Log in to Kodiia</h2>
    <p>Or <a href='/register'>sing up for free</a> if you don't have an account.</p>

    <form action='?/login' method='POST' class='formContainer'>
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
        <input type='password' name='password' class='formInput' />
    </div>
    <a href='/reset-password'>I forgot my password</a>
    <div class='formFieldContainer'>
        <button type='submit' class='submitButton'>Log In</button>
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
        background: linear-gradient(45deg, #ffffff50, #ffffff90);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border: 1px solid #ffffff90;
        border-radius: 15px;
        box-shadow: 0 0 10px #4233fb20;
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