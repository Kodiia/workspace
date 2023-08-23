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
  
    let filesData = []
    let tutorialSteps
    const fetchFile = async (url) => {
      const res = await fetch(url)
      const data = res.text()
      return data
    }

    const getTutorialFiles = async (id) => { 
      try{
        const project = await locals.pb.collection(params.courseUrl).getOne(id)

        for (let file of project.files){
          let url = `${DB_URL}/api/files/${params.courseUrl}/${params.tutorialUrl}/${file}`
          await fetchFile(url).then(result => {filesData.push(
            {
              fileName: file.split('_')[0] + '.' + file.split('.')[1],
              fileData: result
            }
            )
          }
          )
        }
        return serializeNonPOJOs(project)
      } catch (err){
        console.log(err)
        throw error(err.status, err.message);
      }
    }

    // const getHTMLdocs = async () => {
    //   try{
    //     const records = await locals.pb.collection('docsHTML').getFullList(200 /* batch size */, {
    //       sort: '+tag',
    //     });
    //     return serializeNonPOJOs(records)
    //   } catch (err){
    //     console.log(err)
    //     throw error(err.status, err.message);
    //   }
    // }


    // if(params.projectType === 'projects'){
    //   return {
    //     project: getProjectFiles(params.projectId),
    //     type: 'project',
    //     files: filesData,
    //     docsHTML: getHTMLdocs()
    //   }
    // }
    // if(params.projectType === 'tutorials'){
    //   return {
    //     project: getProjectFiles(params.projectId),
    //     type: 'tutorial',
    //     files: filesData,
    //   }
    // }

      return {
        tutorial: getTutorialFiles(params.tutorialUrl),
        type: 'tutorial',
        files: filesData,
      }
  
  }