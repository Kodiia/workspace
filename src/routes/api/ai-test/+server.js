import Replicate from "replicate";
import { REPLICATE_API_TOKEN } from '$env/static/private'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const input = {
    debug: false,
    top_k: -1,
    top_p: 0.95,
    prompt: "how are you doing today? ",
    temperature: 0.7,
    max_new_tokens: 150,
    min_new_tokens: -1,
    prompt_template: "{prompt}",
    repetition_penalty: 1.15
  };
  
  for await (const event of replicate.stream("mistralai/mistral-7b-v0.1", { input })) {
    process.stdout.write(event.toString());
  };



// import { error } from '@sveltejs/kit';
// import { serializeNonPOJOs } from '$lib/utils';
// import {pipeline} from '@xenova/transformers';

// let pipe = await pipeline("text-generation", "Xenova/starcoderbase-1b").then( async (result)=>{
//     //console.log(result)
//     let res = await result('HTML button tag');
//     console.log('Model output: ' + res[0].generated_text)
//     console.log(res)
// })
// console.log('This is pipe: ' + pipe)

// import fetch from "node-fetch"

// async function query(data) {
//     const response = await fetch(
//         "https://api-inference.huggingface.co/models/codellama/CodeLlama-7b-hf",
//         {
//             headers: { Authorization: `Bearer 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` },
//             method: "POST",
//             body: JSON.stringify(data),
//         }
//     );
//     const result = await response.json();
//     return result;
// }
// query("Can you please let us know more details about your ").then((response) => {
//     console.log(JSON.stringify(response));
// });

// async function query(data = {}) {
//     try {
//         const response = await fetch(
//             "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1",
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//                     'Content-Type': 'application/json'
//                 },
//                 method: "POST",
//                 body: JSON.stringify(data),
//             }
//         );
//         if (!response.ok) {
//             throw new Error(`API request failed with status ${response.status}`);
//         }
//         const result = await response.json();
//         console.log(result);
//         return result; // Directly return the result
//     } catch (err) {
//         console.error(err);
//         // Handle error appropriately based on where this function is called
//         throw err;
//     }
// }

// query({"inputs": "Can you please let us know more details about your "}).then((response) => {
//     console.log(JSON.stringify(response));
// }).catch((err) => {
//     console.error("Error querying the model:", err);
// });


// import { error } from '@sveltejs/kit';
// import { serializeNonPOJOs } from '$lib/utils';

// async function query(data = {}) {
//     try{
//         const response = await fetch(
//             "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1",
//             {
//                 headers: { Authorization: "Bearer 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" },
//                 method: "POST",
//                 body: JSON.stringify(data),
//             }
//         );
//         const result = await response.json();
//         console.log(result)
//         return new Response (result);
//     } catch (err) {
//         console.log(err)
//         throw error(err.status, err.message);
//     }
// }

// query({"inputs": "Can you please let us know more details about your "}).then((response) => {
// 	console.log(JSON.stringify(response));
// });