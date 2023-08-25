import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function load({locals}){

    const getTemplates = async () =>{

        try{
            const templates = await locals.pb.collection('projects').getList(1, 20, { '$autoCancel': false }
            );
            return serializeNonPOJOs(templates)
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }


    return {
        templates: getTemplates()
    }
}