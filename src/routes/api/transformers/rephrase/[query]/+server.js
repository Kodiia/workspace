//import { serializeNonPOJOs } from '$lib/utils';
import { pipeline, env } from '@xenova/transformers';
env.allowLocalModels = false;

export async function GET({locals, params}){

    try{
        const prompt = params.query;
        const query = prompt.split('&&')[0]
        const answer = prompt.split('&&')[1]
        console.log('rephrase prompt: ' + prompt)
        console.log('rephrase query: ' + query)
        console.log('rephrase answer: ' + answer)

        const generator = await pipeline(
            "text2text-generation",
            // "Xenova/LaMini-Flan-T5-248M",
            // "Xenova/flan-alpaca-base",
            "Xenova/LaMini-T5-61M",
            //  "Xenova/flan-t5-base"
          );

        const generatorOutput = await generator(
            `Given this query: '${query}', formulate a complete sentence using the following information: ${answer}`,
            {
                max_new_tokens: 1000,
            },
        );

        const rephraseObject = {
            rephraseResult: generatorOutput[0].generated_text
        }

        return new Response (JSON.stringify(rephraseObject))

    } catch (err) {
        console.log(err)
    }
}
        
