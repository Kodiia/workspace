import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import { pipeline } from '@xenova/transformers';

export async function GET({locals, params}){

    try{
        const prompt = params.query;

        let classificator = await pipeline(
            "zero-shot-classification",
            "Xenova/mobilebert-uncased-mnli",
          );
        const labels = ["p5js", "game", "2D", "html", "button"];
          
        const classificationResult = await classificator(prompt, labels);
        console.log(classificationResult)

        const context = '<button type="button" onclick="alert(`Hello, World!`)">Click Me!</button>'


        const generator = await pipeline(
            "text2text-generation",
            "Xenova/LaMini-Flan-T5-783M",
          );

        const output = await generator(
            prompt + `. Use this as a context for your answer: ${context}`,
            {
                max_new_tokens: 1000,
            },
        );
        return new Response (JSON.stringify(output))

    } catch (err){
        console.log(err)
        throw error(err.status, err.message);
    }
    
}