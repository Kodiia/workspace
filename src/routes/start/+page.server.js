import { error, redirect } from '@sveltejs/kit'

export const actions = {
    createProject: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData())

        const formData = new FormData();
        formData.append('name', body.name);

        const file = new File(["<html><head><title>Your Project</title></head><body><h1>Welcome to Your Project</h1></body></html>"], "index.html", {
            type: "text/plain",
          });
        formData.append('files', file);

        formData.append('createdBy', "RELATION_RECORD_ID")

        try {
            await locals.pb.collection('userProjects').create(formData)
        } catch (err) {
            console.log('Error: ', err)
            throw error(500, 'Something went wrong')
        }

        throw redirect(303, '/email-check')
    }
}