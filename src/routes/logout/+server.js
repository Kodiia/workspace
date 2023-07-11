export const POST = ({ locals }) => {
    locals.pb.authStore.clear()
    locals.user = undefined

    throw redirect(303, '/')
}