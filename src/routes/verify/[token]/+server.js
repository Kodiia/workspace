import { error, redirect } from '@sveltejs/kit'

export const POST = async ({ locals, params }) => {
    try {
        locals.pb.collection('users').confirmVerification(params.token);  
        throw redirect(303, '/login')
    } catch (err) {
        console.log('Error: ', err)
        throw error(500, 'Something went wrong while verification process')
    }
    
}