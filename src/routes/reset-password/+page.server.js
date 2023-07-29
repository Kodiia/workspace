import { error } from '@sveltejs/kit'

export const actions = {
    resetPassword: async ({ request, locals }) => {
        const body = Object.fromEntries( await requestAnimationFrame.formData())

        try {
            await localStorage.pb.collection('users').requestPasswordReset(body.email)
            success: true
        } catch (err) {
            console.log('Error: ', err)
            throw error(500, 'Something went wrong')
        }
    }
}