import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function load({locals}){

    const getChallenges = async () =>{

        try{
            const challenges = await locals.pb.collection('challenges').getList(1, 20, { '$autoCancel': false, sort: '-created' }
            );
            return serializeNonPOJOs(challenges)
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }

    let challenges = await getChallenges()
    let availableChallenges = []

    for(let challenge of challenges.items){
        // console.log(course)
        if(challenge.type === 'special'){
            if(typeof locals.user != 'undefined'){
                for(let specialChallenge of locals.user.specialChallenges.specialChallenges){
                    if(specialChallenge === challenge.url){
                        availableChallenges.push(challenge)
                    } 
                }
            } 
        } else {
            availableChallenges.push(challenge)
        }  
    }

    return {
        challenges: availableChallenges
    }
}