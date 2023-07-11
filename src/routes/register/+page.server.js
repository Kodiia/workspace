import { error, redirect } from '@sveltejs/kit'
// import { generateUsername } from '$lib/utils';

export const actions = {
    register: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData())

        // let username = generateUsername(body.name.split(' ').join('')).toLowerCase();
        // let username = body.email

        try {
            await locals.pb.collection('users').create({...body})
            await locals.pb.collection('users').requestVerification(body.email)
        } catch (err) {
            console.log('Error: ', err)
            throw error(500, 'Something went wrong', err)
        }

        throw redirect(303, '/login')
    }
}