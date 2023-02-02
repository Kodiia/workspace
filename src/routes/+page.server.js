//import { pb } from "../db/db"
import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function load({locals}){

    const getProjects = async () =>{

        try{
            const projects = await locals.pb.collection('projects').getList(1, 20, { '$autoCancel': false }
            );
            return serializeNonPOJOs(projects)
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }

    const getTutorials = async () =>{

        try{
            const tutorials = await locals.pb.collection('tutorials').getList(1, 20, { '$autoCancel': false }
            );
            return serializeNonPOJOs(tutorials)
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }

    return {
        projects: getProjects(),
        tutorials: getTutorials()
    }
}