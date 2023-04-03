<script>
	import { bgColor,stylesPanelState } from "./store";
    import { fade } from 'svelte/transition';

    let hueValue = 195
    let saturationValue = '45%'
    let lightnessValue = '85%'
    function updateColorValue(){
        bgColor.set(hueValue + ',' + saturationValue + ',' + lightnessValue);
        //console.log($bgColor, ' value:', hueValue)
    }

    let handlePosition = 125
    let gradientContainerWidth = 0
    function getGradientContainerEventPosition(event){
        handlePosition = Math.floor(event.offsetX)
        if(handlePosition > gradientContainerWidth - 10){
            handlePosition = gradientContainerWidth - 10
        }
        hueValue = Math.floor( handlePosition/gradientContainerWidth * 360 )
        bgColor.set(hueValue + ',' + saturationValue + ',' + lightnessValue);
        console.log($bgColor)
    }

    let saturationContainerWidth = 0
    let saturationEventPosition = 245
    function getSaturationContainerEventPosition(event){
        saturationEventPosition = Math.floor(event.offsetX)
        if(saturationEventPosition > saturationContainerWidth - 10){
            saturationEventPosition = saturationContainerWidth - 10
        }
        saturationValue = Math.floor( saturationEventPosition/saturationContainerWidth * 50 ) + '%';
        bgColor.set(hueValue + ',' + saturationValue + ',' + lightnessValue);
        console.log($bgColor)
    }

    let lightnessContainerWidth = 0
    let lightnessEventPosition = 225
    function getLightnessContainerEventPosition(event){
        lightnessEventPosition = Math.floor(event.offsetX)
        if(lightnessEventPosition > lightnessContainerWidth - 10){
            lightnessEventPosition = lightnessContainerWidth - 10
        }
        lightnessValue = Math.floor( lightnessEventPosition/lightnessContainerWidth * 50 + 50) + '%';
        bgColor.set(hueValue + ',' + saturationValue + ',' + lightnessValue);
        console.log($bgColor)
    }

    console.log(hueValue, lightnessValue, saturationValue)
</script>

<div class='panel' transition:fade>
    <button class="panelButton" on:click={()=>{stylesPanelState.set(false);}} >    
    <svg xmlns="http://www.w3.org/2000/svg" width='10' height='10' viewBox="0 0 19.02 19.02"><title>icon_quit</title><line x1="0.5" y1="0.5" x2="18.52" y2="18.52" style="fill:none;stroke:#4233fb;stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/><line x1="0.5" y1="18.52" x2="18.52" y2="0.5" style="fill:none;stroke:#4233fb;stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/></svg>
    </button>
    <h3>Update Workspace Colors</h3>
    <!-- <input type='range' bind:value={hueValue} min='0' max='360' on:change={updateColorValue}> -->
    <p>Click the color palettes to change the tint.</p>
    <div bind:clientWidth='{gradientContainerWidth}' class='colorGradient' on:pointerdown={getGradientContainerEventPosition}>
        <div class='gradientHandle' style='left: {handlePosition}px'></div>
    </div>
    <!-- <p>Click the saturation palette to change the saturation of colors.</p> -->
    <div bind:clientWidth='{saturationContainerWidth}' class='saturationGradient' style='background: linear-gradient(to right, hsl({hueValue} 0% {lightnessValue}), hsl({hueValue} 50% {lightnessValue}))' on:pointerdown={getSaturationContainerEventPosition}>
        <div class='gradientHandle' style='left: {saturationEventPosition}px'></div>
    </div>
    <!-- <p>Click the lightness palette to change colors from light to dark. {hueValue} {saturationValue} {lightnessValue}</p> -->
    <div bind:clientWidth='{lightnessContainerWidth}' class='lightnessGradient' style='background: linear-gradient( to right,  hsl({hueValue} {saturationValue} 50%), hsl({hueValue} {saturationValue} 100%)' on:pointerdown={getLightnessContainerEventPosition}>
        <div class='gradientHandle' style='left: {lightnessEventPosition}px'></div>
    </div>
    <!-- <p>{handlePosition} {hueValue} {gradientContainerWidth}</p> -->
</div>


<style>
    .panel{
        box-sizing: border-box;
        width: min(100%, 300px);
        height: min(100%, auto);
        position: relative;
        background: #fdfdfd;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15));
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(60, 150, 238, 0.3);
        padding: 20px;
        /* margin: 10px; */
        transition: width 0.25s;
        z-index: 10;
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
     .colorGradient{
        background: linear-gradient(90deg,
        hsl(0, 100%, 85%),
        /* hsl(30, 100%, 85%), */
        hsl(60, 100%, 85%),
        /* hsl(90, 100%, 85%), */
        hsl(120, 100%, 85%),
        /* hsl(150, 100%, 85%), */
        hsl(180, 100%, 85%),
        /* hsl(210, 100%, 85%), */
        hsl(240, 100%, 85%),
        /* hsl(270, 100%, 85%), */
        hsl(300, 100%, 85%),
        /* hsl(330, 100%, 85%), */
        hsl(360, 100%, 85%)
    ); 
        height: 10px;
        border: none;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(60, 150, 238, 0.3);
        position: relative;
        cursor: pointer;
        margin-bottom: 10px;
     }
     .saturationGradient{
        /* background: linear-gradient(90deg, white, rgb(149, 149, 149) );  */
        height: 10px;
        border:none;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(60, 150, 238, 0.3);
        position: relative;
        cursor: pointer;
        margin-bottom: 10px;
     }
     .lightnessGradient{
        /* background: linear-gradient(90deg, rgb(149, 149, 149), white );  */
        height: 10px;
        border:none;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(60, 150, 238, 0.3);
        position: relative;
        cursor: pointer;
     }
     .gradientHandle{
        position: absolute;
        left: 50%;
        top: 0;
        width: 10px;
        height: 10px;
        border: none;
        border-radius: 5px;
        background: #4233fb;
        /* background: linear-gradient(45deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15));
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px); */
        box-sizing: border-box;
     }
</style>