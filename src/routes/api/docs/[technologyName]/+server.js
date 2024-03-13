import { serializeNonPOJOs } from '$lib/utils';

export async function GET({locals, params}){

    const docs = await locals.pb.collection('docs').getFullList({
        filter: `technology = "${params.technologyName}"`,
        sort: 'heading',
    });
    const docsObject = serializeNonPOJOs(docs)
    // console.log(docsObject)

    return new Response (JSON.stringify(docsObject))
}