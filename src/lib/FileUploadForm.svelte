<script>
    import {height, fileUploadFormDisplay, textColor, secondaryColor} from '$lib/store'

    let file = '';
    let fileInput;
   
    function handleDrop(event) {
       event.preventDefault();
       const files = event.dataTransfer.files;
       if (files.length > 0) {
         file = files[0];
         // You can display the file name or any other information here
         console.log('this is from drop: ' + file.name);
       }
    }
   
    function handleDragOver(event) {
       event.preventDefault();
       // You can add visual feedback here, like changing the background color
    }
   
    function handleDragLeave(event) {
       event.preventDefault();
       // Reset visual feedback here
    }
   
    function handleFileChange(event) {
       const files = event.target.files;
       if (files.length > 0) {
         file = files[0];
         console.log('this is file change: ' + file.name);
       }
    }

    let button


   
   </script>
   
   <div class='container' style='height: {$height - 185}px; border: 1px solid hsl({$textColor + ', 20%'});'>
    <button type='button' bind:this={button} class="panelButton" on:click={()=>{fileUploadFormDisplay.set('none');}} >
        <svg xmlns="http://www.w3.org/2000/svg" width='10' height='10' viewBox="0 0 19.02 19.02"><title>icon_quit</title><line x1="0.5" y1="0.5" x2="18.52" y2="18.52" style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/><line x1="0.5" y1="18.52" x2="18.52" y2="0.5" style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/></svg>
    </button>

   <form action='?/uploadFile' method='POST' class='formContainer' enctype="multipart/form-data">
   <button
    type='button'
    class='dropAreaButton'
    on:drop={handleDrop}
    on:dragover={handleDragOver}
    on:dragleave={handleDragLeave}
    on:click={()=>{fileInput.click()}}
    style="border: 1px dashed hsl({$textColor + ', 20%'}); color: hsl({$textColor}); background: hsl({$secondaryColor}); "
    >
    {#if file}
      <p>{file.name}</p>
    {:else}
    Drag and drop your file here or click to browse for a JPEG, PNG, WebP, or GLB file.
    {/if}
    <input type="file" name='asset' on:change={handleFileChange} style="display: none;" bind:this={fileInput} />
   </button>
   
   <button type='submit' class='submitButton' style='color: hsl({$textColor});'>Upload</button>
    </form>
</div>


<style>
    .container{
        height: 100%;
        border-radius: 15px;
        position: relative;
    }
    .panelButton{
      position: absolute;
      top: 5px;
      right: 0px;
      margin-right: 5px;
            
      display: flex;
      align-items: center;
      justify-content: center;
            
      width: 20px;
      height: 20px;
      border-radius: 10px;
      border: none;
      background: #4233fb00;
      color: white;
      box-sizing: content-box;
      padding: 0;
            
      cursor: pointer;
      transition: 0.25s;
    }
    .panelButton:hover{
      background: #4233fb20;
    }
    .formContainer{
        padding: 10px;
        height: calc(100% - 50px);
    }
    .dropAreaButton{
      padding: 20px; 
      text-align: center; 
      cursor: pointer;
      width: calc(100% - 20px); 
      height: calc(100% - 20px);
      font-family: Source Code Pro, sans-serif;
      font-size: 1rem; 
      margin-bottom: 10px;
    }
    .submitButton{
      height: 40px;
      border: none;
      padding: 10px 0;
    }
    .submitButton:hover{
      background: none;
      text-decoration: underline;
    }
</style>
   