<script>
    import monster from '$lib/images/monster_01.webp'
</script>
<div class=' container' >
    <img src={monster} alt='monster' />
    <h2>Ooops... Something went wrong!</h2>
    <p>Try going back to Home page.</p>
    <a href='/'>Go back to Home page</a>
</div>

<style>
    .container{
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
        /* width: 200px;
        height: 50px; */
        display: inline-block;
        text-decoration: none;
        padding: 0px 10px;
        border: 2px solid #4233fb;
        border-radius: 2rem;
        background: none;
        color: #4233fb;
        font-size: 1.2rem;
        font-family: 'Montserrat', sans-serif;
        margin-top: 15px;
        box-sizing: border-box;
    }
    a:hover{
        background: #4233fb;
        color: #f9f9f9;
        cursor: pointer;
    }
</style>