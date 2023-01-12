import { pb } from "../db/db"
import { serializeNonPOJOs } from '$lib/utils';

export async function load(){
    // return{
    //     files: await locals.pb.
    // }

    const getProjects = async () =>{

        try{
            const result = await pb.collection('test_projects').getList(1, 20, { '$autoCancel': false }
            );
            console.log(result)
            return serializeNonPOJOs(result)
        } catch (err){
            console.log(err)
            //throw error(err.status, err.message);
        }
    }

    return {
        result: getProjects()
    }
}