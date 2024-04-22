//import { serializeNonPOJOs } from '$lib/utils';
import { pipeline, env } from '@xenova/transformers';
env.allowLocalModels = false;

export async function GET({locals, params}){

    try{
        const prompt = params.query;

        let searchTerms = []
        let classificator = await pipeline(
            "zero-shot-classification",
            "Xenova/mobilebert-uncased-mnli",
          );
          // labels should all be lowercase for correct search
        const labels = ["brain.js", "p5.js", "grid", "game", "2d", "button", "graphics", "3d", "three.js", "library", "background", "color", "css", "html", "fill", "link", "scene", "rectangle", "triangle", "circle"];
          
        const classificationResult = await classificator(prompt, labels);
        for (let i=0; i<classificationResult.scores.length; i++){
            if(classificationResult.scores[i] > 0.1){
                searchTerms.push(classificationResult.labels[i])
            }
        }

        const searchTermsObject = {
            searchTerms: searchTerms.join(' ')
        }

        console.log(searchTermsObject)

        return new Response (JSON.stringify(searchTermsObject))

    } catch (err) {
        console.log(err)
    }
}
        
