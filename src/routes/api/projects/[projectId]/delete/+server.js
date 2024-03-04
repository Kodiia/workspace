import { error, redirect } from '@sveltejs/kit';

export async function DELETE({locals, params}){
    const projectId = params.projectId
    // const project = await locals.pb.collection('userProjects').getOne(`${projectId}`)

    if(locals.user){
        try {
            await locals.pb.collection('userProjects').delete(`${projectId}`)

            throw redirect( 303, '/projects')
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }  
    } else {
        throw redirect( 303, '/')
    }

    
}