import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function load({locals, params}){
    let courseUrl = params.courseUrl
    
    const getCourseName = async () =>{

        try{
            const courseData = await locals.pb.collection('courses').getList(1, 20, { 
                '$autoCancel': false,
                filter: `url = "${courseUrl}"` }
            );
            return serializeNonPOJOs(courseData)
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }

    let course = await getCourseName()
    console.log(course.items[0].type, typeof locals.user, locals.user.specialCourses.specialCourses)

    const getTutorials = async () =>{

        try{
            const tutorials = await locals.pb.collection(courseUrl).getList(1, 20, { '$autoCancel': false }
            );
            return serializeNonPOJOs(tutorials)
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }

    if(course.items[0].type === 'special'){
        if(typeof locals.user != 'undefined'){
            for(let specialCourse of locals.user.specialCourses.specialCourses){
                if(specialCourse === courseUrl){
                    return {
                        course: getCourseName(),
                        tutorials: getTutorials()
                    }
                } else {
                    // throw redirect(303, '/')
                    throw error(500, 'Access denied');
                } 
            }
        } else {
            // throw redirect(303, '/')
            throw error(500, 'Access denied');
        } 

    } else {
        return {
            course: getCourseName(),
            tutorials: getTutorials()
        }
    }
}