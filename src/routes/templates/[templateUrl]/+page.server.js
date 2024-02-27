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
    let templateUrl = params.templateUrl

    let filesData = []
    let tutorialSteps
    const fetchFile = async (url) => {
      const res = await fetch(url)
      const data = res.text()
      return data
    }

    const getTemplateFiles = async (id) => { 
      try{
        const project = await locals.pb.collection('projects').getOne(id)

        for (let file of project.files){
          let url = `${DB_URL}/api/files/projects/${templateUrl}/${file}`
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

      return {
        template: getTemplateFiles(params.templateUrl),
        type: 'template',
        files: filesData,
      }
  
  }