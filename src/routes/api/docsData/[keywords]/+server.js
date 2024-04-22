import { serializeNonPOJOs } from '$lib/utils';

export async function GET({locals, params}){

    try{
        const searchTerms = params.keywords.split(' ')

        let availableDocs = [], availableChallenges = []

        for (let searchTerm of searchTerms){
            const docsSearch = await locals.pb.collection('docs').getList(1, 100, {
                filter: `technology ~ "${searchTerm}" || heading ~ "${searchTerm}"  || description ~ "${searchTerm}"  || snippet ~ "${searchTerm}"`
                // filter: locals.pb.filter(
                //     "technology ~ {:search} || heading ~ {:search} || description ~ {:search}",
                //     { search: searchTerm}
                // )
            });

            const docsSearchObject = serializeNonPOJOs(docsSearch)
            availableDocs.push(docsSearchObject)

            const challengesSearch = await locals.pb.collection('challenges').getList(1, 100, {
                filter: `technologies ~ "${searchTerm}" || heading ~ "${searchTerm}"  || description ~ "${searchTerm}"  || stepsJSON ~ "${searchTerm}"`
                // filter: locals.pb.filter(
                //     "technology ~ {:search} || heading ~ {:search} || description ~ {:search}",
                //     { search: searchTerm}
                // )
            });

            const challengesObject = serializeNonPOJOs(challengesSearch)

            
                    for(let challenge of challengesObject.items){
                        availableChallenges.push({
                            heading: challenge.heading,
                            date: challenge.updated,
                            id: challenge.id,
                            technologies: challenge.technologies.technologies,
                            description: challenge.description,
                            isHovered: false
                        })
                    }
        }

        const availableDocsData = []
        for(let doc of availableDocs){
            for (let item of doc.items){
                availableDocsData.push(item)
            }
        }

        const selectedDocs = availableDocsData.filter((doc) => {
            let count = 0;
            for (const term of searchTerms) {
                console.log(term)
                console.log(doc.description)
                if (doc.description.toLowerCase().includes(term) || doc.technology.toLowerCase().includes(term)) {
                    count++;
                }
            }
            if(searchTerms.length > 2){
                return count >= 2;
            } else {
                return count > 0
            }
          });

          const docsSearchArray = []
          for (let item of selectedDocs){
            docsSearchArray.push({
                technology: item.technology,
                heading: item.heading,
                description: item.description,
                snippet: item.snippet
            })
        }

        // Removing duplicated data from array with results
        function removeDuplicateObjectsFromArray(array){
            const dedupedArr = array.filter((item, index, self) =>
                index === self.findIndex(
                    (t) => t.heading === item.heading
                )
            );
            return dedupedArr
        }

        const searchResultObject = {
            docsSearchResult: removeDuplicateObjectsFromArray(docsSearchArray),
            challengesSearchResult: removeDuplicateObjectsFromArray(availableChallenges)
        }

        return new Response (JSON.stringify(searchResultObject))

    } catch(err){
        console.log(err)
    }
}