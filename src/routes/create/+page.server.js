import { error, redirect } from '@sveltejs/kit'
import { DB_URL } from '$env/static/private'
import { serializeNonPOJOs } from '$lib/utils';



export const actions = {
    createProject: async ({ locals, request }) => {

      try{
        const body = Object.fromEntries(await request.formData())
        const template = await locals.pb.collection('projects').getFirstListItem(`name="${body.template}"`);
        // const selectedTemplateId = template.id
        console.log(template)

        const fetchFile = async (url = '') => {
          const res = await fetch(url)
          const data = res.text()
          return data
        }

        const project = await locals.pb.collection('projects').getOne(template.id)
        const filesData = []

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

        const  adjectives = ["Brave", "Crumpy", "Fierce", "Golden", "Happy", "Icy"]
        const  nouns = ["Salt", "Leopard", "Bear", "Dragon", "Eagle", "Fox", "Lemur", "Automata", "Noise", "Randomness"]    
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

        const record = await locals.pb.collection('userProjects').create(formData)
        console.log(record)

        throw redirect(303, `/projects/${record.id}/edit`)

      } catch (err) {
        console.log('Error: ', err)
        throw error(500, 'Something went wrong')
      }

    }
}