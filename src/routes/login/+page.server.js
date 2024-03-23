import { error, redirect } from '@sveltejs/kit'

export const actions = {
    login: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData())

        try {
            const user = await locals.pb.collection('users').authWithPassword(body.email, body.password)
            console.log(user)
            if (user) {
                const currentTime = new Date().toISOString();
                await locals.pb.collection("users").update(user.id, { lastLogin: currentTime });
             }

            if(!locals.pb?.authStore?.model?.verified){
                locals.pb.authStore.clear()
                return {
                    notVerified: true
                }
            }
        } catch (err) {
            console.log('Error: ', err)
            throw error(500, 'Something went wrong while logging in')
        }

        throw redirect(303, '/')
    }
}