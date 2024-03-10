import { serializeNonPOJOs } from '$lib/utils';
import { json } from '@sveltejs/kit'

export async function GET({locals, params}){

    const tutorial = await locals.pb.collection('tutorials').getOne(params.tutorialId)
    const tutorialObject = serializeNonPOJOs(tutorial)
    console.log(tutorialObject)
    // const blob = await response.blob()
    // const blobUrl = URL.createObjectURL(blob);
    // const img = document.createElement( 'img' ); img.src = blobUrl; 
    
    // console.log(response, blob, blobUrl);

    return new Response (JSON.stringify(tutorialObject))
}