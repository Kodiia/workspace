import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function load({locals, params}){
    let courseUrl = params.courseUrl

    const getCourseName = async () =>{

        try{
            const course = await locals.pb.collection('courses').getList(1, 20, { 
                '$autoCancel': false,
                filter: `url = "${courseUrl}"` }
            );
            return serializeNonPOJOs(course)
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }

    const getTutorials = async () =>{

        try{
            const tutorials = await locals.pb.collection(courseUrl).getList(1, 20, { '$autoCancel': false }
            );
            if(locals.user != undefined && locals.user.specialCourses.specialCourses[0] === courseUrl){

            }
            console.log(locals.user, locals.user.specialCourses.specialCourses[0], serializeNonPOJOs(tutorials))
            return serializeNonPOJOs(tutorials)
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }

    return {
        course: getCourseName(),
        tutorials: getTutorials()
    }
}