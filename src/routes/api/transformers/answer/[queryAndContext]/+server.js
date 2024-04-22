//import { serializeNonPOJOs } from '$lib/utils';
import { pipeline } from '@xenova/transformers';

export async function GET({locals, params}){

    try{
        const prompt = params.queryAndContext;

        console.log(prompt)

        let answerer = await pipeline(
            "question-answering",
            "Xenova/distilbert-base-cased-distilled-squad",
        );

        const answerResult = await answerer(prompt.split('&&')[0], prompt.split('&&')[1]);
        console.log(answerResult)
 
        const answerObject = {
            answerResult: answerResult.answer,
        }

        return new Response (JSON.stringify(answerObject))

    } catch (err) {
        console.log(err)
    }
}
        
