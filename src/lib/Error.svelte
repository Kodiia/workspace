<script>
    import monster from '$lib/images/monster_01.webp'

    export let errorCode = 500
    export let errorMessage = 'Access denied'
</script>
<div class=' container' >
    <img src={monster} alt='monster' />
    <h2>Ooops... Something went wrong!</h2>
    <p>Error: {errorCode} - {errorMessage}</p>

    {#if errorCode === 500}
    <p>Try going back to <a href='/'>Home</a> page. <br>Or check if you are logged in.</p>
    {/if}

    {#if errorCode === 403}
    <p>Something is wrong with the server. We are alredy investigating this. Please, come back later!</p>
    {/if}
    
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
        /* display: inline-block; */
        text-decoration: underline;
        /* padding: 0px 10px;
        border: 2px solid #4233fb;
        border-radius: 2rem; */
        background: none;
        color: #3d95ee;
        font-size: 1.2rem;
        font-family: 'Montserrat', sans-serif;
        /* margin-top: 15px; */
        box-sizing: border-box;
    }
    a:hover{
        /* text-decoration: underline; */
        cursor: pointer;
    }
</style>