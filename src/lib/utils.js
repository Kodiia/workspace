import htmlSVG from '$lib/logos/html.svg'
import cssSVG from '$lib/logos/css.svg'
import jsSVG from '$lib/logos/js.svg'
import mdSVG from '$lib/logos/md.svg'
import txtSVG from '$lib/logos/txt.svg'
import svelteSVG from '$lib/logos/svelte.svg'
import threejsSVG from '$lib/logos/threejs.svg'
import p5jsSVG from '$lib/logos/p5js.svg'
import brainjsSVG from '$lib/logos/brainjs.svg'
import glbSVG from '$lib/logos/glb.svg'
import arduinoSVG from '$lib/logos/arduino.svg'

// const { randomBytes } = await import('node:crypto');

export const serializeNonPOJOs = (obj) => {
	return JSON.parse(JSON.stringify(obj))
	// return structuredClone(obj)
};

export const getImageUrl = (collectionName, recordId, fileName) => {
    try {
        const url = `api/files/${collectionName}/${recordId}/${fileName}`
        return url
    } catch (err) {
        console.log(err)
        throw error(err.status, err.message);
    }
}

export const getFileUrl = (collectionName, recordId, fileName) => {
    try {
        const url = `api/files/${collectionName}/${recordId}/${fileName}`
        return url
    } catch (err) {
        console.log(err)
        throw error(err.status, err.message);
    }
}

// export const generateUsername = (name) => {
// 	const id = randomBytes(2).toString('hex');
// 	return `${name.slice(0, 5)}${id}`;
// };

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

        case 'javascript':
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

        case 'threejs':
        logoPath = threejsSVG
        break;

        case 'p5js':
        logoPath = p5jsSVG
        break;

        case 'brainjs':
        logoPath = brainjsSVG
        break;

        case 'glb':
        logoPath = glbSVG
        break;

        case 'ino':
        logoPath = arduinoSVG
        break;
    }
	return logoPath
}