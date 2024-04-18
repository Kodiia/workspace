import { serializeNonPOJOs } from '$lib/utils';
import { pipeline } from '@xenova/transformers';
import Fuse from 'fuse.js'

export async function GET({locals, params}){

    try{
        const prompt = params.query;

        let searchTerms = []
        let classificator = await pipeline(
            "zero-shot-classification",
            "Xenova/mobilebert-uncased-mnli",
          );
        const labels = ["p5js", "grid", "game", "2D", "button", "graphics", "3D", "threejs", "library", "background", "color", "css", "html", "fill", "link"];
          
        const classificationResult = await classificator(prompt, labels);
        for (let i=0; i<classificationResult.scores.length; i++){
            if(classificationResult.scores[i] > 0.1){
                searchTerms.push(classificationResult.labels[i])
            }
        }
        

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

        const fuseOptions = {
            isCaseSensitive: false,
            // includeScore: true,
            // shouldSort: true,
            // includeMatches: true,
            // findAllMatches: true,
            // minMatchCharLength: 1,
            // location: 0,
            // threshold: 0.2,
            distance: 200,
            // useExtendedSearch: false,
            // ignoreLocation: false,
            // ignoreFieldNorm: false,
            // fieldNormWeight: 1,
            keys: ["description", "technology", "heading"],
        };
          
        const fuseSearchDocsData = []
        for(let doc of availableDocs){
            for (let item of doc.items){
                fuseSearchDocsData.push(item)
            }
        }

        const fuse = new Fuse(fuseSearchDocsData, fuseOptions);
        

        // Pattern to search for
        const searchPattern = searchTerms.join(' ');

        // Search result as an array of objects
        const result = fuse.search(searchPattern);

        // Creating new array with necessary data from search results
        const docsSearchArray = []
        for (let item of result){
            docsSearchArray.push({
                technology: item.item.technology,
                heading: item.item.heading,
                description: item.item.description,
                snippet: item.item.snippet
            })
        }

        // for (let doc of availableDocs){
        //     for (let item of doc.items){
        //     docsSearchArray.push({
        //         technology: item.technology,
        //         heading: item.heading,
        //         description: item.description,
        //         snippet: item.snippet
        //     })}
        // }


        // Removing duplicated data from array with results
        function removeDuplicateObjectsFromArray(array){
            const dedupedArr = array.filter((item, index, self) =>
                index === self.findIndex(
                    (t) => t.heading === item.heading
                )
            );
            return dedupedArr
        }

        const contextFromDocs = []
        for (let item of removeDuplicateObjectsFromArray(docsSearchArray)){
            for(let snippet of item.snippet){
                // contextFromDocs.push(`Command description: ${item.description}, code snippet description: ${snippet.description}, code snippet content: ${snippet.code}`)
                contextFromDocs.push(`Command: ${item.heading}, command description: ${item.description}, code snippet description: ${snippet.description}.`)
            }
        }

        const contextFromChallenges = []
        for (let item of removeDuplicateObjectsFromArray(availableChallenges)){
            contextFromChallenges.push(`Challenge description: ${item.description}`)
        }

        const joinedContextFromDocs = contextFromDocs.join(', ')
        const joinedContextFromChallenges = contextFromChallenges.join(', ')
        const context = `${joinedContextFromDocs}, ${joinedContextFromChallenges}`
        

        const generator = await pipeline(
            "text2text-generation",
            "Xenova/LaMini-Flan-T5-783M",
            // "Xenova/flan-alpaca-large",
          );

        const generatorOutput = await generator(
            `You are a creative coding assistant on Kodiia platform. Your task is to provide hints on how to create web projects with HTML, CSS, and JavaScript, generative art, procedural design, simulations, and games. Suggest code snippets to look at, challenges to look at, or project ideas. Explain the concepts behind the code snippets provided as a context. Try to use the most relevant data from the context. Here is the context for your answer: ${context}. But feel free to come up with your ideas as well. Here is a question for you: ` + prompt ,
            // `You are a creative coding assistant on Kodiia platform. Your task is to provide hints on how to create web projects with HTML, CSS, and JavaScript, generative art, procedural design, simulations, and games. Suggest code snippets to look at, challenges to look at, or project ideas. Do not write code or qoute code snippets, just explain the concepts behind the code snippets provided as a context. Ignore HTML markup in the context. Here is a question for you: ` + prompt,
            {
                max_new_tokens: 1000,
            },
        );
 
        const searchResultObject = {
            //context: context,
            modelResponse: generatorOutput,
            docsSearchResult: removeDuplicateObjectsFromArray(docsSearchArray),
            challengesSearchResult: removeDuplicateObjectsFromArray(availableChallenges)
        }
        console.log(searchTerms)
        console.log(classificationResult)
        console.log('search data ' + fuseSearchDocsData)
        console.log(availableDocs)
        console.log('search pattern ' + searchPattern)
        console.log('fuse search result ' + result)
        console.log(docsSearchArray)
        // console.log()
        console.log(context)
        console.log(searchResultObject)

        return new Response (JSON.stringify(searchResultObject))

    } catch (err){
        console.log(err)
        throw error(err.status, err.message);
    }
}