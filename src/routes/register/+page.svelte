<script>
	import CodeEditor from "$lib/CodeEditor.svelte";

</script>
<div class='container'>
    <h2>Register for an acccount</h2>
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
        <input type='password' name='password' class='formInput' />
    </div>
    <div class='formFieldContainer'>
        <label for='confirmPassword' class='formLabel'>
            <span class='labelSpan'>confirm password</span>
        </label>
        <input type='password' name='confirmPassword' class='formInput' />
    </div>
    <div class='formFieldContainer'>
        <button type='submit' class='submitButton'>Register</button>
    </div>
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
</style>