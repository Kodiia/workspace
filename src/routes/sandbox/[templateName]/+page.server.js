import { DB_URL } from '$env/static/private'
import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function load({locals, fetch, params}){
  let templateName = params.templateName

  const getTemplateId = async () =>{

      try{
          const template = await locals.pb.collection('projects').getFirstListItem(`name="${templateName}"`);
          console.log(template.id)
          return template.id
      } catch (err){
          console.log(err)
          throw error(err.status, err.message);
      }
  }
  const selectedTemplateId = await getTemplateId()

  const getTemplateData = async (id) => {
    try{
      const project = await locals.pb.collection('projects').getOne(id)

      return serializeNonPOJOs(project)
    } catch (err){
      console.log(err)
      throw error(err.status, err.message);
    }
  }
  
  
      const fetchFile = async (url) => {
          const res = await fetch(url)
          const data = res.text()
          return data
      }

      const getTemplateFiles = async (id) => { 
          const filesData = []
          try{
            const project = await locals.pb.collection('projects').getOne(id)
    
            for (let file of project.files){
              let url = `${DB_URL}/api/files/projects/${selectedTemplateId}/${file}`
              await fetchFile(url).then(result => {filesData.push(
                {
                  fileName: file.split('_')[0] + '.' + file.split('.')[1],
                  fileData: result
                }
                )
              }
              )
            }

          return filesData
            
          } catch (err){
            console.log(err)
            throw error(err.status, err.message);
          }
        }

        const filesData = await getTemplateFiles(selectedTemplateId)

        return {
          name: templateName,
          files: filesData,
          template: getTemplateData(selectedTemplateId)
        }
}