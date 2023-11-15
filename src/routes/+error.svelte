<script>
    import Error from '$lib/Error.svelte';
    import { page } from '$app/stores';
</script>

<div class=' container'>
    <Error errorCode = '{$page.error.code}' errorMessage = '{$page.error.message}'/>
</div>

<style>
    .container{
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>