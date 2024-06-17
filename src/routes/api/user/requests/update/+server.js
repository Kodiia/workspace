export async function GET ({ locals }) {
    if (locals.user) {
        try {
            const userId = locals.user.id
            const requestsNumber = locals.user.requests
            let newRequestsNumber = requestsNumber - 1
            if(newRequestsNumber === 0){
                newRequestsNumber = 0
            }
            // const formData = new FormData();
            // formData.append('requests', newRequestsNumber);
            await locals.pb.collection('users').update(userId, {requests: newRequestsNumber});
            return new Response(JSON.stringify(newRequestsNumber))
        } catch (err) {
            console.log(err)
        }
    } else {
        return new Response(JSON.stringify("Something went wrong. You need to be logged in to access the chat feature."))
    }
}