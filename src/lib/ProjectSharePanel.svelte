<script>
    import { shareProjectPanelState, textColor } from "./store";
    export let project = {}
    let projectUrl = '';
    let projectTitle = project.title;
  
    const copyLink = () => {
      navigator.clipboard.writeText(projectUrl);
      alert('Link copied to clipboard!');
    };
  
    const shareOnTwitter = () => {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(projectUrl)}&text=${encodeURIComponent(projectTitle)}`, '_blank');
    };
  
    const shareOnTelegram = () => {
      window.open(`https://telegram.me/share/url?url=${encodeURIComponent(projectUrl)}&text=${encodeURIComponent(projectTitle)}`, '_blank');
    };
  
    const shareOnLinkedIn = () => {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectUrl)}`, '_blank');
    };
  
    const shareViaEmail = () => {
      window.location.href = `mailto:?subject=${encodeURIComponent(projectTitle)}&body=${encodeURIComponent(projectUrl)}`;
    };
  </script>
  
  <div class="share-component">
    <button class="panelButton" on:click={()=>{$shareProjectPanelState = false;}} >
        <svg xmlns="http://www.w3.org/2000/svg" width='10' height='10' viewBox="0 0 19.02 19.02"><title>icon_quit</title><line x1="0.5" y1="0.5" x2="18.52" y2="18.52" style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/><line x1="0.5" y1="18.52" x2="18.52" y2="0.5" style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/></svg>
    </button>

    <h3>Share this project</h3>
    <div>
      <button on:click={copyLink}>Copy Link</button>
      <button on:click={shareOnTwitter}>Share on Twitter</button>
      <button on:click={shareOnTelegram}>Share on Telegram</button>
      <button on:click={shareOnLinkedIn}>Share on LinkedIn</button>
      <button on:click={shareViaEmail}>Share via Email</button>
    </div>
    <div>
      <label for="embed-code">Embed Code:</label>
      <textarea id="embed-code" readonly>{`<iframe src="${projectUrl}" title="${projectTitle}"></iframe>`}</textarea>
    </div>
  </div>
  
  <style>
    .share-component {
      display: flex;
      flex-direction: column;
      gap: 10px;
      position: relative;
    }
    button {
      margin: 5px 0;
    }
    textarea{
        width: 100%;
        resize: none;
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
  </style>