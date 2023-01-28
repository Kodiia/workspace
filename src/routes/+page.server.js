//import { pb } from "../db/db"
import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function load({locals}){

    const getProjects = async () =>{

        try{
            const result = await locals.pb.collection('projects').getList(1, 20, { '$autoCancel': false }
            );
            return serializeNonPOJOs(result)
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }

    return {
        result: getProjects()
    }
}