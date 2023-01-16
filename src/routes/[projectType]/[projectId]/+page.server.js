import { DB_URL } from '$env/static/private'
import { serializeNonPOJOs } from '$lib/utils';

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
      console.log(id)
      const project = await locals.pb.collection(params.projectType).getOne(id)

      for (let file of project.project_files){
        let url = `${DB_URL}api/files/${params.projectType}/${params.projectId}/${file}`
        console.log(url)
        await fetchFile(url).then(result => {filesData.push(
          {
            fileName: file,
            fileData: result
          }
          )
        }
        )
        console.log(filesData)
      }
      return serializeNonPOJOs(project)
    }
  
    return {
      project: getProject(params.projectId),
      files: filesData
    }
  
  }