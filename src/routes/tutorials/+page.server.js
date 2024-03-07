import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function load({locals}){

    const getTutorials = async () =>{

        try{
            const tutorials = await locals.pb.collection('tutorials').getList(1, 100, { '$autoCancel': false, sort: '-created' }
            );
            const tutorialsObject = serializeNonPOJOs(tutorials)
            console.log(tutorialsObject.items[0].courseSpecialName)

            let availableTutorials = []
            for(let tutorial of tutorialsObject.items){
                for(let specialCourse of locals.user.specialCourses.specialCourses){
                    if(specialCourse === tutorial.courseSpecialName){
                        availableTutorials.push(tutorial)
                    } 
                }
            }

            // console.log(tutorials.items[0].courseSpecialName);
            // return serializeNonPOJOs(tutorials)
            return availableTutorials
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }

    return {
        // challenges: availableChallenges
        tutorials: await getTutorials()
    }
}