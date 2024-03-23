import { error, redirect } from '@sveltejs/kit'

export const actions = {
    login: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData())

        try {
            // Authenticate the user
            await locals.pb.collection('users').authWithPassword(body.email, body.password);

            // Check if the authentication was successful
            if (locals.pb.authStore.isValid) {
                const currentTime = new Date().toISOString();
                // Update the last login time for the authenticated user
                await locals.pb.collection("users").update(locals.pb.authStore.model.id, { lastLogin: currentTime });
                console.log(locals.pb.authStore.model.id, currentTime);
            }

            if(!locals.pb?.authStore?.model?.verified){
                locals.pb.authStore.clear()
                return {
                    notVerified: true
                }
            }

            // Redirect or perform other actions based on the authentication state
            throw redirect(303, '/');
        } catch (err) {
            console.log('Error: ', err)
            throw error(500, 'Something went wrong while logging in')
        }
    }
}