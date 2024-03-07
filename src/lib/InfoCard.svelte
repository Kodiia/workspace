<script>

    import { width, bgColor, textColor, secondaryColor, primaryColor, accentColor } from "./store"
    import ClippedWithSvg from "./ClippedWithSVG.svelte";

    export let title = 'Title'
    export let description = 'Description'
    export let topics = ''
    export let link = ''
    export let imageUrl = '/api/images/courses/8vuzxx3aug1e42w/caYTNNOM8q7V_wHy79LH0FW.webp'
    export let date = ''
    export let subHeading = ''

    let isHovered = false, isLinkHovered = false;

    function getChallengeCreateDate(){
        const challengeDate = date.updated
        const newDate = challengeDate.split(' ')[0]

        return newDate
    }
</script>

<div class='card-container' style='color: hsl({$textColor}); border: none; border-bottom: {isHovered ? `1px solid hsl(${$primaryColor})` : `1px solid hsl(${$textColor + ", 20%"})`};' on:pointerenter={()=>{isHovered = true}} on:pointerleave={()=>{isHovered = false}}>
    {#if imageUrl}
        <!-- <div class='imageContainer' style='background-image: url({imageUrl}); clip-path: {contour};'></div> -->
        <div class='imageContainer' style='flex: 0 0 {$width < 700 ? '300px' : '150px'};'>
            <ClippedWithSvg imageUrl = {imageUrl}/>
        </div>
    {/if}
    <div class='textContainer'>
        <h3>{title}</h3>
        {#if subHeading}
            <code style="width: fit-content; padding: 5px; background: hsl({$textColor + ', 20%'}); color: hsl({$textColor});">{subHeading}</code>
        {/if}
        {#if date}
            <code style="width: fit-content; padding: 5px; background: hsl({$textColor + ', 20%'}); color: hsl({$textColor});">{getChallengeCreateDate()}</code>
        {/if}
        <p>{description}</p>
        {#if topics}
        <p>✔️ Topics: <b>{topics}</b></p>
        {/if}
    </div>
    <a href={link} style='background: linear-gradient(45deg, hsl({$primaryColor}) 50%, hsl({$accentColor})); box-shadow: {isLinkHovered ? `0 0 15px hsl(${$primaryColor})` : "none"}' on:pointerover={()=>{isLinkHovered = true}} on:pointerleave={()=>{isLinkHovered = false}}>Start</a>
</div>

<style>
    .card-container{
        width: 100%;
        display: flex;
        align-items: center;
        padding: 10px 0;
        box-sizing: border-box;
        transition: all 0.25s;
    }

    .textContainer{
        align-self: baseline;
        margin-left: 10px;
        flex: 1;
        padding: 0 10px;
    }
    h3{
        margin: 0 0 5px 0;
        font-weight: 300;
    }
    a{
        width: fit-content;
        color: #1a1a1a;
        text-decoration: none;
        align-self: baseline;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border: none;
        border-radius: 8px;
        box-sizing: border-box;
        transition: all 0.25s;
    }

    @media screen and (max-width: 900px) {
        .card-container{
            flex-direction: column;
            align-items: flex-start;
        }
        .textContainer{
            padding: 0px;
        }
    }
</style>