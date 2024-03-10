import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function GET({locals}){

        try{
            const tutorials = await locals.pb.collection('tutorials').getList(1, 100, { '$autoCancel': false, sort: '-created' }
            );
            const tutorialsObject = serializeNonPOJOs(tutorials)

            let availableTutorials = []
            for(let tutorial of tutorialsObject.items){
                availableTutorials.push({
                    heading: tutorial.heading,
                    courseName: tutorial.courseName,
                    id: tutorial.id,
                    technologies: tutorial.technologies.technologies
                })
            }
            // for(let tutorial of tutorialsObject.items){
            //     if(tutorial.courseType === 'special'){
            //         for(let specialCourse of locals.user.specialCourses.specialCourses){
            //             if(specialCourse === tutorial.courseSpecialName){
            //                 availableTutorials.push(
            //                     {
            //                         heading: tutorial.heading,
            //                         courseName: tutorial.courseName
            //                     }
            //                     )
            //             } 
            //         }
            //     } else {
            //         availableTutorials.push(tutorial)
            //     }
            // }

            // return new Response (JSON.stringify(availableTutorials))
            return new Response (JSON.stringify(availableTutorials))
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }