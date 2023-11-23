import { error } from '@sveltejs/kit';
import { getImageUrl } from '$lib/utils'

export async function GET({locals, params}){
    const url = locals.pb.baseUrl + getImageUrl(params.collectionName, params.recordId, params.fileName)

    const response = await fetch(url)
    const blob = await response.blob()
    // const blobUrl = URL.createObjectURL(blob);
    // const img = document.createElement( 'img' ); img.src = blobUrl; 
    
    // console.log(response, blob, blobUrl);

    return new Response( blob )
}