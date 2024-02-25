<script>
    import {secondaryColor, textColor} from '$lib/store'

    export let form

</script>
<div class='container' style='background: hsl({$secondaryColor}); border: 1px solid hsl({$textColor + ', 20%'});'>
    <h2>Reset your password</h2>
    <p>We'll send you an email with a link to reset your password.</p>

    <form action='?/resetPassword' method='POST' class='formContainer'>
    <div class='formFieldContainer'>
        <label for='email' class='formLabel'>
            <span class='labelSpan'>email</span>
        </label>
        <input type='email' name='email' class='formInput' />
    </div>

    <div class='formFieldContainer'>
        <button type='submit' class='submitButton'>Request password reset</button>
    </div>

    {#if form?.success}
        <div class='messageContainer'>
            <p>An email has been sent to reset your password.</p>
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
        box-shadow: 0 0 10px #3d95ee50;
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

    .messageContainer{
        background: #3d95ee50;
        padding: 10px;
        border-radius: 10px;;
    }
</style>