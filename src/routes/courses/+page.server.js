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

    let courses = await getCourses()
    // console.log(courses.items, locals.user)
    // console.log(course.items[0].type, typeof locals.user, locals.user.specialCourses.specialCourses)

    let availableCourses = []

    for(let course of courses.items){
        // console.log(course)
        if(course.type === 'special'){
            if(typeof locals.user != 'undefined'){
                for(let specialCourse of locals.user.specialCourses.specialCourses){
                    if(specialCourse === course.url){
                        availableCourses.push(course)
                    } 
                }
            } 
        } else {
            availableCourses.push(course)
        }  
    }

    return {
        courses: availableCourses
    }
}