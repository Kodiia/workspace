<script>
    import monster_email from '$lib/images/monster_email.webp'
    import { textColor, primaryColor } from '$lib/store'
</script>

<div class='container'>
<div class='card'>
    <img src={monster_email} alt='monster' />
    <h2>Cool! We've sent you an email!</h2>
    <p>Please, check your email and click <u>Verify</u> to activate your account. It usually takes a few minutes for an email to get into your <u>Inbox</u>. If you cant't find it, please, check your <u>Spam</u> folder.</p>

    <p>Already verified your email? Click here to <a href='/login' style='background: hsl({$primaryColor}); color: #1a1a1a'>Log In</a></p>
    
</div>
</div>

<style>
    .container{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .card{
        max-width: 500px;
        padding: 10px;
        box-sizing: border-box;
        text-align: center;
        margin: auto;
    }
    img{
        width: 350px;
        height: 350px;
    }
    h2{
        /* width: 100%; */
        margin-bottom: 0;
        margin-top: 20px;
        margin-left: auto; 
        margin-right: auto;
        font-weight: 300;
    }
    a{
        text-decoration: none;
        padding: 5px;
        border-radius: 10px;
        background: #4233fb;
        font-size: 1.2rem;
        font-family: 'Montserrat', sans-serif;

        box-sizing: border-box;
    }
    a:hover{
        /* text-decoration: underline; */
        cursor: pointer;
        box-shadow: 0 0 10px #33dd99;
    }
</style>