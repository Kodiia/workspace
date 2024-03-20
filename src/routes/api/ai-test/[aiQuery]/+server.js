import Replicate from "replicate";
import { REPLICATE_API_TOKEN } from '$env/static/private'
import { serializeNonPOJOs } from '$lib/utils';

const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
});

// console.log(replicate)

export async function GET({locals, params}){

// const input = {
//     debug: false,
//     top_k: -1,
//     top_p: 0.95,
//     prompt: "how are you doing today? ",
//     temperature: 0.7,
//     max_new_tokens: 150,
//     min_new_tokens: -1,
//     prompt_template: "{prompt}",
//     repetition_penalty: 1.15
//   };
  
//   let output
//   for await (const event of replicate.stream("mistralai/mistral-7b-v0.1", { input })) {
//     output = process.stdout.write(event.toString())

//     console.log(output)

   
    
//     // console.log(process.stdout.write(event.toString()));
//   };

const output = await replicate.run(
    "mistralai/mistral-7b-v0.1",
    {
      input: {
        prompt: params.aiQuery,
        debug: false,
        top_k: -1,
        top_p: 0.95,
        temperature: 0.7,
        max_new_tokens: 500,
        min_new_tokens: -1,
        prompt_template: "{prompt}",
        repetition_penalty: 1.15
      }
    }
  );

  return new Response(JSON.stringify(output))
}
