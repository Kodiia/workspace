import { serializeNonPOJOs } from '$lib/utils';

export async function GET({locals, params}){

    const challenge = await locals.pb.collection('challenges').getOne(params.challengeId)
    const challengeObject = serializeNonPOJOs(challenge)
    // console.log(tutorialObject)
    // const blob = await response.blob()
    // const blobUrl = URL.createObjectURL(blob);
    // const img = document.createElement( 'img' ); img.src = blobUrl; 
    
    // console.log(response, blob, blobUrl);

    return new Response (JSON.stringify(challengeObject))
}