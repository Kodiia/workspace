<script>
    import monster_email from '$lib/images/monster_email.webp'
    import { textColor } from '$lib/store'
</script>

<div class='container'>
<div class='card'>
    <img src={monster_email} alt='monster' />
    <h2>Cool! We have sent you an email!</h2>
    <p>Please, check your email and click <b>Verify</b> to activate your account. It usually takes a few minutes for an email to get into your <b>Inbox</b>. If you cant't find it, please, check your <b>Spam</b> folder.</p>

    <p>Already verified your email? Click here to <a href='/login' style='color: hsl({$textColor})'>Log In</a></p>
    
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
    }
    a{
        text-decoration: none;
        padding: 10px;
        border-radius: 10px;
        background: #4233fb;
        font-size: 1.2rem;
        font-family: 'Montserrat', sans-serif;

        box-sizing: border-box;
    }
    a:hover{
        /* text-decoration: underline; */
        cursor: pointer;
    }
</style>