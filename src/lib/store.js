import { writable } from 'svelte/store';

export let width = writable(1920)
export let height = writable(1080)

export let projectId = writable('')
export let filesLocalCopy = writable([])
export let fileToOpen = writable('index.html')
export let editorState = writable(false)