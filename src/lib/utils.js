import htmlSVG from '$lib/logos/html.svg'
import cssSVG from '$lib/logos/css.svg'
import jsSVG from '$lib/logos/js.svg'
import mdSVG from '$lib/logos/md.svg'
import txtSVG from '$lib/logos/txt.svg'
import svelteSVG from '$lib/logos/svelte.svg'


export const serializeNonPOJOs = (obj) => {
	return JSON.parse(JSON.stringify(obj))
	// return structuredClone(obj)
};

export const getFileLogoURL = (fileType) => {
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
    console.log(htmlSVG, logoPath)
	return logoPath
}