<script>
    import {bgColor, textColor, primaryColor, accentColor} from '$lib/store'
    export let project = {}

    function getProjectEditDate(){
        const dbDate = project.updated
        const date = dbDate.split('.')[0]

        return date
    }
</script>

<div class='projectWrapper' style='border: none; border-bottom: hsl({$textColor + ', 20%'})'>
    <div>
        <h3>{project.name}</h3>
        <!-- <p class='editDateText'>{getProjectEditDate}</p> -->
        <code>{getProjectEditDate()}</code>
    </div>
    <div class='buttonsMenu'>
        <div class='buttonWrapper' style='background: linear-gradient(hsl({$primaryColor}, hsl({$accentColor})))'>
            <a href='/projects/{project.id}/edit' style='background: linear-gradient(45deg, hsl({$primaryColor}) 50%, hsl({$accentColor}));'>Edit</a>
        </div>
        <form action='?/deleteProject' method='POST' >
            <!-- <a href='/api/projects/{project.id}/delete'>Delete</a> -->
            <input type='hidden' name='projectId' value='{project.id}' />
            <div class='buttonWrapper' style='background: linear-gradient(hsl({$primaryColor}, hsl({$accentColor})))'>
                <button type='submit' style='background: hsl({$bgColor}); color: hsl({$textColor});'>Delete</button>
            </div>
        </form>
    </div>
</div>

<style>
    .projectWrapper{
        background: none;
        display: flex;
        justify-content: space-between;
    }
    .buttonWrapper{
        height: 50px;
        padding: 2px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    h3{
        font-weight: 300;
    }
    a, button{
        width: fit-content;
        color: #1a1a1a;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        margin-right: 5px;
        border-radius: 10px;
    }
    a:hover{
        box-shadow: 0 0 15px hsl(155, 95%, 35%);
    }
    .buttonsMenu{
        display: flex;
    }
    /* .editDateText{
        font-size:
    } */
</style>