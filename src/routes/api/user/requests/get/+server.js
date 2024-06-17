export async function GET({ locals }) {
    if (locals.user) {
        try {
            const requestsNumber = locals.user.requests
            const response = { requests: requestsNumber }
            return new Response(JSON.stringify(response))
        } catch (err) {
            console.log(err)
        }
    } else {
        return new Response(JSON.stringify("Something went wrong. You need to be logged in to access the chat feature."))
    }
}