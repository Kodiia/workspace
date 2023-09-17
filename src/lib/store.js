import { writable } from 'svelte/store';

export let bgColor = writable('195, 48%, 95%');
export let stylesPanelState = writable(false);

export let consolePanelState = writable(false);
export let consoleMessages = writable([]);

export let width = writable(1920)
export let height = writable(1080)
export let leftPanelWidthSetByUser = writable(0)
export let rightPanelWidthSetByUser = writable(0)

export let projectId = writable('')
export let filesLocalCopy = writable([])
export let fileToOpen = writable('index.html')
export let editorState = writable(false)

export let filesPanelState = writable(true), docsPanelState = writable(true), stepsPanelState = writable(true), resourcesPanelState = writable(true);
export let filesPanelDisplay = writable('none')
export let resourcesPanelDisplay = writable('none')

export let selectedAsset = writable({})
export let assetOptionsPanelDisplay = writable('none')