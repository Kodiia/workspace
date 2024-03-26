import { error } from '@sveltejs/kit';
import { getFileUrl } from '$lib/utils'

export async function GET({locals, params}){
    const url = locals.pb.baseUrl + '/' + getFileUrl('userProjects', params.recordId, params.fileName)

    const response = await fetch(url)
    const blob = await response.blob()
    // const blobUrl = URL.createObjectURL(blob);
    // const img = document.createElement( 'img' ); img.src = blobUrl; 
    
    // console.log(response, blob, blobUrl);

    return new Response( blob )
}