import { DB_URL } from '$env/static/private'
import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';


export async function load ({ locals, fetch, params}) {
    let projectId = params.projectId
    console.log(projectId)
    let worldData

    const getWorldData = async () =>{
        try{
            const worldData = await locals.pb.collection('testWorldsProjects').getOne(projectId, { requestKey: null })
            console.log(worldData)
            return serializeNonPOJOs(worldData)
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }
      return {
        world: getWorldData()
      }
  
  }

  export  const actions = {
    updateProject: async ( { request, locals, params } ) =>{
        const formData = await request.formData()
        console.log(formData)
        try{
            await locals.pb.collection('testWorldsProjects').update(params.projectId, formData)
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }

        throw redirect(303, `/games/procedural-worlds/${params.projectId}`)
    }
  }