import { error, redirect } from '@sveltejs/kit'
import { Record } from 'pocketbase';

export const actions = {
    createProject: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData())

        const formData = new FormData();
        formData.append('name', body.name);

        const file = new File(["<html><head><title>Your Project</title></head><body><h1>Welcome to Your Project</h1></body></html>"], "index.html", {
            type: "text/plain",
          });
        formData.append('files', file);

        formData.append('createdBy', locals.user.id)

        try {
            const record = await locals.pb.collection('userProjects').create(formData)
            throw redirect(303, '/myProjects/' + record.id)
        } catch (err) {
            console.log('Error: ', err)
            throw error(500, 'Something went wrong')
        }

        
    }
}