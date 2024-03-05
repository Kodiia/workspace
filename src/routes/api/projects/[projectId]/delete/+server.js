import { error, redirect } from '@sveltejs/kit';

export async function DELETE({locals, params}){
    const projectId = params.projectId
    const project = await locals.pb.collection('userProjects').getOne(`${projectId}`)
    console.log(projectId, project)

    if(locals.user){
        try {
            const result = await locals.pb.collection('userProjects').delete(`"${projectId}"`)

            // throw redirect( 303, '/projects')

            return new Response(JSON.stringify(result), {status: 200})
                
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }  
    } else {
        throw redirect( 303, '/')
    }

}