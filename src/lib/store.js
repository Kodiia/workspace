import { writable } from 'svelte/store';
import { availableAssets } from './worldAssets';

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
export let filesPanelDisplay = writable('block')
export let resourcesPanelDisplay = writable('block')
export let resizeState = writable(false)

export let worldData = writable({})
export let worldType = writable('flat')
export let selectedAssets = writable([availableAssets[3]])
export let selectedAsset = writable({
    color: "#ffffff",
    id: 0,
    position: {x: 0, y: 0, z: 0},
    rotation: {x: 0, y: 0, z: 0},
    type: 1,
    speed: 0,
    userLoopCode: ""
})
export let worldSelectedAssets = writable([
    {
        type: 'asset',
        number: 0,
        url: '/cube_white.glb',
        state: 'selected'
    },
])

export let loadedAssetsNumber = writable(0)
export let assetOptionsPanelDisplay = writable('none')
export let worldResourcesPanelDisplay = writable('block')
export let worldAddAsset = writable(false)