import { DB_URL } from '$env/static/private'
import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
// const fetch = require('node-fetch')

// let id = ''
// projectId.subscribe(value => {
//   id = value
// })

export async function load ({ locals, fetch, params}) {
    console.log(params)
  
    let filesData = []
    const fetchFile = async (url) => {
      const res = await fetch(url)
      const data = res.text()
      return data
    }

    const getProject = async (id) => { 
      try{
        console.log(id)
        const project = await locals.pb.collection(params.projectType).getOne(id)

        for (let file of project.project_files){
          let url = `${DB_URL}/api/files/${params.projectType}/${params.projectId}/${file}`
          console.log(url)
          await fetchFile(url).then(result => {filesData.push(
            {
              fileName: file.split('_')[0] + '.' + file.split('.')[1],
              fileData: result
            }
            )
          }
          )
          console.log(filesData)
        }
        return serializeNonPOJOs(project)
      } catch (err){
        console.log(err)
        throw error(err.status, err.message);
      }
    }
  
    return {
      project: getProject(params.projectId),
      files: filesData
    }
  
  }