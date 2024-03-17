<script>
    import {bgColor, textColor, primaryColor, accentColor} from '$lib/store'
    export let project = {}

    let isHovered = false, isLinkHovered = false, isDeletingProject = false

    function getProjectEditDate(){
        const dbDate = project.updated
        const date = dbDate.split('.')[0]

        return date
    }
</script>

<div class='projectWrapper' style='border: none; border-bottom: {isHovered ? `1px solid hsl(${$primaryColor})` : `1px solid hsl(${$textColor + ', 20%'})`};' on:pointerover={()=>{isHovered = true}} on:pointerleave={()=>{isHovered = false}}>
    <div>
        <h3>{project.name}</h3>
        <!-- <p class='editDateText'>{getProjectEditDate}</p> -->
        <code style="background: hsl({$textColor + ', 20%'}); color: hsl({$textColor});">{getProjectEditDate()}</code>
    </div>
    <div class='buttonsMenu'>
        
        <a href='/projects/{project.id}/edit' style='background: linear-gradient(45deg, hsl({$primaryColor}) 50%, hsl({$accentColor})); box-shadow: {isLinkHovered ? `0 0 10px hsl(${$primaryColor})` : "none"}' on:pointerover={()=>{isLinkHovered = true}} on:pointerleave={()=>{isLinkHovered = false}}>Edit</a>
        
        <form action='?/deleteProject' method='POST' >
            <!-- <a href='/api/projects/{project.id}/delete'>Delete</a> -->
            <input type='hidden' name='projectId' value='{project.id}' />
            <div class='buttonWrapper' style='background: linear-gradient(hsl({$primaryColor}), hsl({$accentColor}))'>
                <button type='submit' style='background: hsl({$bgColor}); color: hsl({$textColor});' on:click={()=>{isDeletingProject = true}}>{@html isDeletingProject ? `<span class="loader" style="margin: 0; border-color: hsl(${$textColor}) transparent;"></span>` : 'Delete'}</button>
            </div>
        </form>
    </div>
</div>

<style>
    .projectWrapper{
        background: none;
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
    }
    .buttonWrapper{
        height: 40px;
        padding: 2px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
        box-sizing: border-box;
    }
    h3{
        font-weight: 300;
        margin: 0;
    }
    a, button{
        width: fit-content;
        height: 100%;
        color: #1a1a1a;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border: none;
        border-radius: 8px;
        box-sizing: border-box;
        transition: all 0.25s;
    }
    .buttonsMenu{
        display: flex;
        height: 40px;
    }
</style>