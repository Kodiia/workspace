<script>
    // import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { consolePanelState, consoleMessages } from './store';

    // export let consoleMessages = []
    let consoleData, button
    

    
</script>

<div class='panel' transition:fade>
    <button bind:this={button} class="panelButton" on:click={()=>{consolePanelState.set(false);}} >
        <svg xmlns="http://www.w3.org/2000/svg" width='10' height='10' viewBox="0 0 19.02 19.02"><title>icon_quit</title><line x1="0.5" y1="0.5" x2="18.52" y2="18.52" style="fill:none;stroke:#4233fb;stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/><line x1="0.5" y1="18.52" x2="18.52" y2="0.5" style="fill:none;stroke:#4233fb;stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/></svg>
    </button>
    <div class='consoleDataContainer' bind:this={consoleData}>
    {#each $consoleMessages as message}
        {#if message.type === 'text'}
            <p class='text-message'>{message.text}</p>
        {:else if message.type === 'error'}
            <p class='error-message'>🔴{message.text}</p>
        {/if}
    {/each}
    </div> 
</div>

<style>
    .panel{
        position: absolute;
        bottom: 0;
        box-sizing: border-box;
        width: 100%;
        height: 100px;
        position: relative;
        background: #fdfdfd;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15));
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(60, 150, 238, 0.302);
        padding: 30px 15px 15px 15px;
        /* margin: 10px; */
        transition: width 0.25s;
    }
    .panelButton{
      position: absolute;
      top: 5px;
      right: 0px;
      margin-right: 5px;
            
      display: flex;
      align-items: center;
      justify-content: center;
      /* justify-content: space-between; */
            
      width: 20px;
      height: 20px;
      border-radius: 10px;
      border: none;
      background: #4233fb00;
      /* background: radial-gradient(#ca94ff, #4233fb); */
      color: white;
      box-sizing: content-box;
      padding: 0;
            
      cursor: pointer;
      transition: 0.25s;
    }
    .panelButton:hover{
      background: #4233fb20;
    }
    .consoleDataContainer{
        width: 100%;
        height: 100%;
        overflow: auto;
        font-family: 'Source Code Pro', sans-serif;
        font-size: 1rem;
    }
    .text-message, .error-message{
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }
</style>