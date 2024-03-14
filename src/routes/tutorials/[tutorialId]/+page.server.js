import { DB_URL } from '$env/static/private'
import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function load ({ locals, fetch, params}) {
    //console.log(params)
    const tutorialId = params.tutorialId

    const getTutorialData = async () =>{
      

        try{
            const tutorialData = await locals.pb.collection('tutorials').getOne(tutorialId, { requestKey: null });
            return serializeNonPOJOs(tutorialData)
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }

    const tutorial = await getTutorialData()
  
    let filesData = []
    const fetchFile = async (url) => {
      const res = await fetch(url)
      const data = res.text()
      return data
    }

    const getTutorialFiles = async (id) => { 
      try{
        const tutorial = await locals.pb.collection('tutorials').getOne(id, { requestKey: null })
        console.log(tutorial)

        for (let file of tutorial.files){
          let url = `${DB_URL}/api/files/tutorials/${tutorialId}/${file}`
          await fetchFile(url).then(result => {filesData.push(
            {
              fileName: file.split('_')[0] + '.' + file.split('.')[1],
              fileData: result
            }
            )
          }
          )
        }


        if(tutorial.courseType === 'special'){
          if(typeof locals.user != 'undefined'){
              for(let specialCourse of locals.user.specialCourses.specialCourses){
                console.log(specialCourse, tutorial.courseSpecialName)
                  if(specialCourse === tutorial.courseSpecialName){
                    return serializeNonPOJOs(tutorial)
                  } 
              }
          } else {
            throw error(500, 'Access denied');
          }
        } else {
          return serializeNonPOJOs(tutorial)
        }
        

      } catch (err){
        console.log(err)
        throw error(err.status, err.message);
      }
    }


      return {
        tutorial: getTutorialFiles(tutorialId),
        type: 'tutorial',
        files: filesData
      }
  
  }