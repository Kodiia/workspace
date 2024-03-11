import { serializeNonPOJOs } from '$lib/utils';

export async function GET({locals, params}){

    console.log(params.technologyName)

    const docs = await locals.pb.collection('docs').getFullList({
        filter: `technology = "${params.technologyName}"`,
    });
    const docsObject = serializeNonPOJOs(docs)
    // console.log(docsObject)

    return new Response (JSON.stringify(docsObject))
}