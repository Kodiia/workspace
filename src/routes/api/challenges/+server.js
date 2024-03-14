import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function GET({locals}){

        try{
            const challenges = await locals.pb.collection('challenges').getList(1, 100, { '$autoCancel': false, sort: '-created' }
            );
            const challengesObject = serializeNonPOJOs(challenges)

            let availableChallenges = []
            for(let challenge of challengesObject.items){
                availableChallenges.push({
                    heading: challenge.heading,
                    date: challenge.updated,
                    id: challenge.id,
                    technologies: challenge.technologies.technologies
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

            return new Response (JSON.stringify(availableChallenges))
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }