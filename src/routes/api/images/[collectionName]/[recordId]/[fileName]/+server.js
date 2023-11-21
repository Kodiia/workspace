import { error } from '@sveltejs/kit';
import { getImageUrl } from '$lib/utils'

export async function GET({locals, params}){
    const url = locals.pb.baseUrl + getImageUrl(params.collectionName, params.recordId, params.fileName)
    return new Response( url )
}