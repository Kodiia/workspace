<script>
    export let title = 'Title'
    export let description = 'Description'
</script>

<div class='card-container'>
    <h2>{title}</h2>
    <p>{description}</p>
    <button>START</button>
</div>

<style>
    .card-container{
        width: 25rem;
        background: white;
        border-radius: 20px;
        box-shadow: 0 0 10px rgba(60, 150, 238, 0.2);
        padding: 20px;
        margin: 10px;
        box-sizing: border-box;
    }
    h2{
        margin-top: 0;
    }
</style>