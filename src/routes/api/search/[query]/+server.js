import { serializeNonPOJOs } from '$lib/utils';

export async function GET({locals, params}){

    const searchTerm = params.query

    const docsSearch = await locals.pb.collection('docs').getList(1, 100, {
        filter: `technology ~ "${searchTerm}" || heading ~ "${searchTerm}"  || description ~ "${searchTerm}"  || snippet ~ "${searchTerm}"`
        // filter: locals.pb.filter(
        //     "technology ~ {:search} || heading ~ {:search} || description ~ {:search}",
        //     { search: searchTerm}
        // )
    });

    const challengesSearch = await locals.pb.collection('challenges').getList(1, 100, {
        filter: `technologies ~ "${searchTerm}" || heading ~ "${searchTerm}"  || description ~ "${searchTerm}"  || stepsJSON ~ "${searchTerm}"`
        // filter: locals.pb.filter(
        //     "technology ~ {:search} || heading ~ {:search} || description ~ {:search}",
        //     { search: searchTerm}
        // )
    });

    const challengesObject = serializeNonPOJOs(challengesSearch)

    let availableChallenges = []
            for(let challenge of challengesObject.items){
                availableChallenges.push({
                    heading: challenge.heading,
                    date: challenge.updated,
                    id: challenge.id,
                    technologies: challenge.technologies.technologies,
                    isHovered: false
                })
            }

    const searchResultObject = {
        docsSearchResult: serializeNonPOJOs(docsSearch),
        challengesSearchResult: availableChallenges
    }
    console.log(searchResultObject)

    return new Response (JSON.stringify(searchResultObject))
}