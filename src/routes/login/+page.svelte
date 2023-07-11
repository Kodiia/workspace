<script>
    export let form

</script>
<div class='container'>
    <h2>Log in to your acccount</h2>
    <p>Or <a href='/register'>sing up</a> if you don't already have an account.</p>

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
    .formFieldContainer{
        display: flex;
        flex-direction: column;
        margin: 10px 0;
    }

    .submitButton{
        background: #4233fb;
        color: #f9f9f9;
        margin-top: 10px;
        transform: scale(1.0);
    }
    .submitButton:hover{
        transform: scale(1.1);
    }

    .alertContainer{
        background: red;
        padding: 10px;
        border-radius: 10px;;
    }
</style>