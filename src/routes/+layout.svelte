<script>
    import { navigating } from '$app/stores'
    import '../style.css' 
</script>



{#if $navigating}
<p>Loading...</p>
{:else}
<slot />
{/if}
