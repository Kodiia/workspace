<script>
    import { assetCardDisplay, height, textColor, bgColor, primaryColor, accentColor } from "./store";
    export let filePath = ''
    export let fileName = ''
    export let fileFullName = ''

    let fileType = fileName.split('.')[1]

    let copyButtonText = "copy url"
    let isDeletingFile = false

    function copy() {
        let textToCopy = filePath;
        navigator.clipboard.writeText(textToCopy);
        copyButtonText = "copied";
        setTimeout(function() {
        copyButtonText = "copy url";
        }, 1500);
    }
</script>

<div class='container' style='height: {$height - 185}px; border: 1px solid hsl({$textColor + ', 20%'});'>
    <button type='button' class="panelButton" on:click={()=>{assetCardDisplay.set('none');}} >
        <svg xmlns="http://www.w3.org/2000/svg" width='10' height='10' viewBox="0 0 19.02 19.02"><title>icon_quit</title><line x1="0.5" y1="0.5" x2="18.52" y2="18.52" style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/><line x1="0.5" y1="18.52" x2="18.52" y2="0.5" style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/></svg>
    </button>
    <h5>{fileName}</h5>

    <div style="display: flex; align-items: center;">
        <button type='button' class="smallMenuButton" style='color: hsl({$textColor});' on:click={copy}>{copyButtonText}</button>
    </div>

    <div class='dataWrapper'>
        <code>{filePath}</code>
        <div class='imageWrapper'>
            <img src='{filePath}' alt='asset preview' />
        </div>

        <form action='?/deleteFile' method='POST' enctype="multipart/form-data">
            <input type='hidden' name='fileFullName' value='{fileFullName}' />
            <input type='hidden' name='fileType' value='{fileType}' />
        
            <button type='submit' class='deleteButton' style='background: none; color: hsl({$textColor});' on:click={()=>{isDeletingFile = true; }}>{@html isDeletingFile ? `<span class="loader" style="margin: 0; border-color: hsl(${$textColor}) transparent;"></span>` : 'Delete'}</button>

        </form>
    </div>
   
</div>


<style>
    .container{
        height: 100%;
        border-radius: 15px;
        position: relative;
        padding: 10px;
        box-sizing: border-box;
        
    }
    .dataWrapper{
        width: 100%;
        height: calc(100% - 60px);
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
    }
    h5{
        margin: 0 0 10px 0;
        font-weight: 300;
    }
    .imageWrapper{
        width: calc(100% - 10px);
        height: autofit;
        margin-top: auto;
    }
    img{
        width: 100%;
    }
    code{
        width: 100%;
        word-wrap: break-word;
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
    .smallMenuButton {
        background: none;
        border: none;
        color: #3d95ee;
        font-family: Roboto, sans-serif;
        font-size: 1rem;
        font-weight: 300;
        margin: 0;
        padding: 0 10px 5px 0px;
        cursor: pointer;
      }
      .smallMenuButton:hover {
        color: #3d95ee;
        text-decoration: underline;
      }
      .deleteButton{
        border: none;
        padding: 0;
        cursor: pointer;
      }
      .deleteButton:hover{
        text-decoration: underline;
      }
</style>
   