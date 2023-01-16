import { writable } from 'svelte/store';

export let projectId = writable('')
export let filesLocalCopy = writable([])