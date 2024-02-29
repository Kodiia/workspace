import { error, redirect } from '@sveltejs/kit'
import { DB_URL } from '$env/static/private'
import { serializeNonPOJOs } from '$lib/utils';

export async function load({locals}){

    const getTemplate = async () =>{

        try{
            const template = await locals.pb.collection('projects').getFirstListItem(`name="p5.js"`);
            console.log(template.id)
            return template.id
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }
    const selectedTemplateId = await getTemplate()
    
    
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

          console.log(filesData)

}

export const actions = {
    createProject: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData())

        const getTemplate = async () =>{

            try{
                const template = await locals.pb.collection('projects').getFirstListItem(`name="${body.template}"`);
                console.log(template.id)
                return template.id
            } catch (err){
                console.log(err)
                throw error(err.status, err.message);
            }
        }
        const selectedTemplateId = await getTemplate()
        
        
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
                        name: file.split('_')[0] + '.' + file.split('.')[1],
                        data: result
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

            const  adjectives = ["Brave", "Crumpy", "Fierce", "Golden", "Happy", "Icy"]
            const  nouns = ["Salt", "Leopard", "Bear", "Dragon", "Eagle", "Fox", "Automata", "Noise", "Randomness"]
            
        const projectName = adjectives[Math.floor(Math.random() * adjectives.length)] + ' ' + nouns[Math.floor(Math.random() * nouns.length)]

        const formData = new FormData();
        formData.append('name', projectName);

        for (let file of filesData){
            const newFile = new File([file.data], file.name, {
                type: "text/plain",
              });
            formData.append('files', newFile);
        }

        formData.append('createdBy', locals.user.id)

        let record
        try {
            record = await locals.pb.collection('userProjects').create(formData)
        } catch (err) {
            console.log('Error: ', err)
            throw error(500, 'Something went wrong')
        }

        throw redirect(303, `/projects/${record.id}`)

        
    }
}