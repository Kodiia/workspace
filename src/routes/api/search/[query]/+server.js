import { serializeNonPOJOs } from '$lib/utils';
import { pipeline } from '@xenova/transformers';

export async function GET({locals, params}){

    try{
        const prompt = params.query;

        let searchTerms = []
        let classificator = await pipeline(
            "zero-shot-classification",
            "Xenova/mobilebert-uncased-mnli",
          );
          // labels should all be lowercase for correct search
        const labels = ["brainjs", "brain.js", "p5js", "p5.js", "grid", "game", "2d", "button", "graphics", "3d", "threejs", "three.js", "library", "background", "color", "css", "html", "fill", "link", "scene", "rectangle", "triangle", "circle"];
          
        const classificationResult = await classificator(prompt, labels);
        for (let i=0; i<classificationResult.scores.length; i++){
            if(classificationResult.scores[i] > 0.1){
                searchTerms.push(classificationResult.labels[i])
            }
        }
        

        let availableDocs = [], availableChallenges = []

        // const docsTestSearch = await locals.pb.collection('docs').getList(1, 100, {
        //     filter: `description ~ "grid"`
        //     // filter: locals.pb.filter(
        //     //     "technology ~ {:search} || heading ~ {:search} || description ~ {:search}",
        //     //     { search: searchTerm}
        //     // )
        // });
        // console.log(docsTestSearch)

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
            if(searchTerms.length > 1){
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
            contextFromDocs.push(item.description)
            // for(let snippet of item.snippet){
            //     // contextFromDocs.push(`Command description: ${item.description}, code snippet description: ${snippet.description}, code snippet content: ${snippet.code}`)
            //     contextFromDocs.push(`Command: ${item.heading}, command description: ${item.description}, code snippet description: ${snippet.description}.`)
            // }
        }

        // const contextFromChallenges = []
        // for (let item of removeDuplicateObjectsFromArray(availableChallenges)){
        //     contextFromChallenges.push(`Challenge description: ${item.description}`)
        // }

        // const joinedContextFromDocs = contextFromDocs.join(', ')
        // const joinedContextFromChallenges = contextFromChallenges.join(', ')
        // // const context = `${joinedContextFromDocs}, ${joinedContextFromChallenges}`
        // const context = contextFromDocs[0]
        
        // const systemPrompt = `You are a creative coding assistant on Kodiia platform. Your task is to provide hints on how to create web projects with HTML, CSS, and JavaScript, generative art, procedural design, simulations, and games. Suggest code snippets to look at, challenges to look at, or project ideas. Explain the concepts behind the code snippets provided as a context. Try to use the most relevant data from the context. Here is the context for your answer: ${context}. But feel free to come up with your ideas as well. Here is a question for you: `
        // const systemPromptSmall = `You are a creative coding assistant on Kodiia platform. Here is the context for your answer: ${context}. `
        // const systemPromptWithNoContext = `You are a creative coding assistant on Kodiia platform. Your task is to provide hints on how to create web projects with HTML, CSS, and JavaScript, generative art, procedural design, simulations, and games. Suggest code snippets to look at, challenges to look at, or project ideas. Explain the concepts behind the code snippets provided as a context. Try to use the most relevant data from the context. But feel free to come up with your ideas as well. Here is a question for you: `
        // // const outputPrompt = systemPromptWithNoContext + prompt
        // const outputPrompt = systemPromptSmall + prompt
        
        // const generator = await pipeline(
        //     "text2text-generation",
        //     "Xenova/LaMini-Flan-T5-783M",
        //     // "Xenova/flan-alpaca-large",
        //     // "Xenova/flan-t5-large"
        //   );

        // const generatorOutput = await generator(
        //     systemPromptSmall + prompt,
        //     // `You are a creative coding assistant on Kodiia platform. Your task is to provide hints on how to create web projects with HTML, CSS, and JavaScript, generative art, procedural design, simulations, and games. Suggest code snippets to look at, challenges to look at, or project ideas. Explain the concepts behind the code snippets provided as a context. Try to use the most relevant data from the context. Here is the context for your answer: ${context}. But feel free to come up with your ideas as well. Here is a question for you: ` + prompt ,
        //     // `You are a creative coding assistant on Kodiia platform. Your task is to provide hints on how to create web projects with HTML, CSS, and JavaScript, generative art, procedural design, simulations, and games. Suggest code snippets to look at, challenges to look at, or project ideas. Do not write code or qoute code snippets, just explain the concepts behind the code snippets provided as a context. Ignore HTML markup in the context. Here is a question for you: ` + prompt,
        //     {
        //         max_new_tokens: 1000,
        //     },
        // );

        let answerer = await pipeline(
            "question-answering",
            "Xenova/distilbert-base-cased-distilled-squad",
        );

        const joinedContextFromDocs = contextFromDocs.join(', ')
        console.log(searchTerms)
        // console.log(availableDocsData)
        // console.log(selectedDocs)
        // console.log(docsSearchArray)
        console.log(joinedContextFromDocs)
        console.log(removeDuplicateObjectsFromArray(docsSearchArray)[0])

        const answerResult = await answerer(params.query, removeDuplicateObjectsFromArray(docsSearchArray)[0].description);
        console.log(answerResult)
 
        const searchResultObject = {
            //context: context,
            modelResponse: answerResult.answer,
            prompt: 'hello',
            docsSearchResult: removeDuplicateObjectsFromArray(docsSearchArray),
            challengesSearchResult: removeDuplicateObjectsFromArray(availableChallenges)
        }
        // console.log(searchTerms)
        // console.log(classificationResult)
        // console.log('search data ' + fuseSearchDocsData)
        // console.log(availableDocs)
        // console.log('search pattern ' + searchPattern)
        // console.log('fuse search result ' + result)
        // console.log(docsSearchArray)
        // // console.log()
        // console.log(context)
        // console.log(searchResultObject)

        return new Response (JSON.stringify(searchResultObject))

    } catch (err){
        console.log(err)
        throw error(err.status, err.message);
    }
}