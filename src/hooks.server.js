// src/hooks.server.js
import PocketBase from 'pocketbase';
import { serializeNonPOJOs } from '$lib/utils';
import { DB_URL } from '$env/static/private'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    event.locals.pb = new PocketBase(DB_URL);

    // load the store data from the request cookie string
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
        if (event.locals.pb.authStore.isValid) {
            event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
        } else {
            event.locals.user = undefined;
        }
    } catch (_) {
        // clear the auth store on failed refresh
        event.locals.pb.authStore.clear();
    }

    const response = await resolve(event);

    // send back the default 'pb_auth' cookie to the client with the latest store state
    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie());

    return response;
}