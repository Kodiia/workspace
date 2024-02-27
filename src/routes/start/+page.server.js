import { error, redirect } from '@sveltejs/kit'
import { DB_URL } from '$env/static/private'
import { serializeNonPOJOs } from '$lib/utils';

export const actions = {
    createProject: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData())

        let filesData = []
        const fetchFile = async (url) => {
            const res = await fetch(url)
            const data = res.text()
            return data
        }

        const getTemplate = async () =>{

            try{
                // const templates = await locals.pb.collection('projects').getList(1, 20, { '$autoCancel': false });
                const template = await locals.pb.collection('projects').getFirstListItem(`name="${body.template}"`);
                return serializeNonPOJOs(template)
            } catch (err){
                console.log(err)
                throw error(err.status, err.message);
            }
        }

        console.log(getTemplate())

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

        const formData = new FormData();
        formData.append('name', body.name);

        const file = new File(["<html><head><title>Your Project</title></head><body><h1>Welcome to Your Project</h1></body></html>"], "index.html", {
            type: "text/plain",
          });
        formData.append('files', file);

        const fileCSS = new File(["body{color:grey;}"], "style.css", {
            type: "text/plain",
          });
        formData.append('files', fileCSS);

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