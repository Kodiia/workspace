<script>
    import {filesLocalCopy} from '$lib/store'
    import ProjectFileCard from '$lib/ProjectFileCard.svelte'
    //console.log(data)
    export let data
    console.log(data)
    let files = data.project.project_files
    // let filePaths = []
    // for (let file of files){
    //     filePaths.push('lib/logos/' + file.split('.')[1] + '.svg')
    //     console.log(filePaths)
    // }
    $filesLocalCopy = data.files
</script>

<h1>{data.project.project_name}</h1>
{#each files as file, index}
    <ProjectFileCard name='{file}' />
    <p>{$filesLocalCopy[index].fileName}</p>
{/each}