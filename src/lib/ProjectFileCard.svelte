<script>
    import htmlSVG from '$lib/logos/html.svg'
    import cssSVG from '$lib/logos/css.svg'
    import jsSVG from '$lib/logos/js.svg'
    import mdSVG from '$lib/logos/md.svg'
    import txtSVG from '$lib/logos/txt.svg'
    import svelteSVG from '$lib/logos/svelte.svg'

    export let name = 'file name'
    let fileType = name.split('.')[1]
    let nameWithoutFileId = name.split('_')[0] + '.' + fileType
    let logoPath = htmlSVG
    switch (fileType) {
        case 'html':
        logoPath = htmlSVG
        break;

        case 'css':
        logoPath = cssSVG
        break;

        case 'js':
        logoPath = jsSVG
        break;

        case 'md':
        logoPath = mdSVG
        break;

        case 'txt':
        logoPath = txtSVG
        break;

        case 'svelte':
        logoPath = svelteSVG
        break;
    }
</script>

<button>
    <img src='{logoPath}' alt='logo' />
    <p>{nameWithoutFileId}</p>
</button>

<style>
    button{
        /* width: 5rem; */
        background: #f9f9f9;
        color: #1a1a1a;
        border: none;
        border-radius: 20px;
        box-shadow: 0 0 10px rgba(60, 150, 238, 0.2);
        padding: 10px;
        margin: 10px;
        box-sizing: border-box;

        display: flex;
        align-items: center;

        cursor: pointer;
    }
    img{
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
    }
    p{
        margin: 0;
    }
</style>