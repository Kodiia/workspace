import { error, redirect } from '@sveltejs/kit'

export const GET = async ({ locals, params }) => {
    try {
        await locals.pb.collection('users').confirmVerification(params.token);  
        // return { success: true }
    } catch (err) {
        console.log('Error: ', err)
        throw error(500, 'Something went wrong while verification process')
    }
    
    throw redirect(303, '/login')
}