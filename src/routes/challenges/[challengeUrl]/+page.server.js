import { DB_URL } from '$env/static/private'
import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
// const fetch = require('node-fetch')

// let id = ''
// projectId.subscribe(value => {
//   id = value
// })

export async function load ({ locals, fetch, params}) {
    //console.log(params)
    let challengeUrl = params.challengeUrl

    const getChallengeName = async () =>{
      

        try{
            const challengeData = await locals.pb.collection('challenges').getList(1, 20, { 
                '$autoCancel': false,
                // filter: `url = "${challengeUrl}"` 
            }
            );
            return serializeNonPOJOs(challengeData)
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }

    let challenge = await getChallengeName()
  
    let filesData = []
    const fetchFile = async (url) => {
      const res = await fetch(url)
      const data = res.text()
      return data
    }

    const getChallengeFiles = async (id) => { 
      try{
        const project = await locals.pb.collection('challenges').getOne(id, { requestKey: null })

        for (let file of project.files){
          let url = `${DB_URL}/api/files/challenges/${params.challengeUrl}/${file}`
          await fetchFile(url).then(result => {filesData.push(
            {
              fileName: file.split('_')[0] + '.' + file.split('.')[1],
              fileData: result
            }
            )
          }
          )
        }


        if(challenge.items[0].type === 'special'){
          if(typeof locals.user != 'undefined'){
              for(let specialChallenge of locals.user.specialChallenges.specialChallenges){
                console.log(specialChallenge, challenge.items[0].url)
                  if(specialChallenge === challenge.items[0].url){
                    return serializeNonPOJOs(project)
                  } 
                  // else {
                  //     // throw redirect(303, '/')
                  //     throw error(500, 'Access denied');
                  // } 
              }
          } else {
            // throw redirect(303, '/')
            throw error(500, 'Access denied');
          }
        } else {
          return serializeNonPOJOs(project)
        }
        

      } catch (err){
        console.log(err)
        throw error(err.status, err.message);
      }
    }


      return {
        challenge: getChallengeFiles(params.challengeUrl),
        type: 'challenge',
        files: filesData
      }
  
  }