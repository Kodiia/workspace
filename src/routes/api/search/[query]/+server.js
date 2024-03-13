import { serializeNonPOJOs } from '$lib/utils';

export async function GET({locals, params}){

    const searchTerm = params.query
    console.log(searchTerm)

    const searchResult = await locals.pb.collection('docs').getList(1, 100, {
        filter: `technology ~ "${params.query}" || heading ~ "${params.query}"  || description ~ "${params.query}"`
        // filter: locals.pb.filter(
        //     "technology ~ {:search} || heading ~ {:search} || description ~ {:search}",
        //     { search: searchTerm}
        // )
    });
    const searchResultObject = serializeNonPOJOs(searchResult)
    // console.log(docsObject)

    return new Response (JSON.stringify(searchResultObject))
}