<script>
    import {onMount} from 'svelte'
    import {EditorView, basicSetup} from "codemirror"
    import {javascript, esLint} from "@codemirror/lang-javascript"
    import { linter } from '@codemirror/lint'
    import {height} from '$lib/store'

    let editorContainer, editor

    onMount(()=>{
        editor = new EditorView({
        extensions: [basicSetup, javascript()],
        doc: 'console.log("hi")',
        parent: editorContainer
    })
    })
    

    

</script>

<div class='container'>
<div bind:this = {editorContainer} style='height: {$height - 120}px;'></div>
</div>

<style>
    .container{
        position: relative;
        background: #f9f9f9;
        overflow-y: auto;
        overflow-x: auto;
        border-radius: 15px;
        box-shadow: 0 0 10px #3d95ee50;
    }
    
</style>