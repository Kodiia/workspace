//import { serializeNonPOJOs } from '$lib/utils';
import { pipeline, env } from '@xenova/transformers';
env.allowLocalModels = false;

export async function GET({locals, params}){

    try{
        const prompt = params.query;
        const query = prompt.split('&&')[0]
        const answer = prompt.split('&&')[1]

        const generator = await pipeline(
            "text2text-generation",
            // "Xenova/LaMini-Flan-T5-783M",
             "Xenova/flan-alpaca-large",
            // "Xenova/flan-t5-large"
          );

        const generatorOutput = await generator(
            `Combine this query: '${query}', and this answer in a complete natural and fluent sentence: ${answer}.`,
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
        
