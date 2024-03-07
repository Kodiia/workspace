<script>
    import NavPanel from '$lib/NavPanel.svelte';
    import InfoCard from '$lib/InfoCard.svelte';
    export let data;

    console.log(data);
</script>

<NavPanel data={data} />

<div class='container'>
    <h3 style='margin-top: 70px'>Tutorials</h3>
    <div class='tutorial-cards-container'>
    {#each data.tutorials as tutorial}
        <!-- <h3>{tutorial.heading}</h3> -->
        <InfoCard title={tutorial.heading} description={tutorial.description} link='challenges/{tutorial.id}' imageUrl = '{tutorial.stepsJSON.steps[0].imageUrl}' subHeading={tutorial.courseName}/>
    {/each}
</div>
</div>

<style>
    .container{
        margin-left: auto;
        margin-right: auto;
        width: min(100%, 1044px);
        position: relative;
        box-sizing: border-box;
        padding: 0 10px 10px 10px;
        overflow-y: auto;
    }
    h3{
        font-weight: 300;
    }    
</style>
