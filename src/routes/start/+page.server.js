import { error, redirect } from '@sveltejs/kit'

export const actions = {
    createProject: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData())

        const projectData = {
            name: body.name,
            files: {
              'index.html': '<html><head><title>Your Project</title></head><body><h1>Welcome to Your Project</h1></body></html>'
            }
          };

        try {
            await locals.pb.collection('userProjects').create({projectData})
            // await locals.pb.collection('users').requestVerification(body.email)
        } catch (err) {
            console.log('Error: ', err)
            throw error(500, 'Something went wrong')
        }

        throw redirect(303, '/email-check')
    }
}