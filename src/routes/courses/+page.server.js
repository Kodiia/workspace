import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function load({locals}){

    const getCourses = async () =>{

        try{
            const courses = await locals.pb.collection('courses').getList(1, 20, { '$autoCancel': false }
            );
            return serializeNonPOJOs(courses)
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }

    return {
        courses: getCourses()
    }
}