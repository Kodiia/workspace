import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function load ({ locals, fetch, params}) {

    const getProjects = async () => {
        if(locals.user){
            try{
                const projects = await locals.pb.collection('userProjects').getFullList({
                    filter: `createdBy = "${locals.user.id}"`, 
                    sort: '-created'
                });

                return serializeNonPOJOs(projects)
            } catch (err){
                console.log(err)
                throw error(err.status, err.message);
            }
        } else {
            throw redirect(303, '/')
        }
    }

      return {
        projects: await getProjects()
      }
  
  }
  export const actions = {
    deleteProject: async ({locals, params, request}) => {
        const form = await request.formData()
        const body = Object.fromEntries(form)

        const projectId = body.projectId

        try {
            const result = await locals.pb.collection('userProjects').delete(projectId)                
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }  
    }
  }

  