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
export let filesPanelDisplay = writable('none')
export let resourcesPanelDisplay = writable('none')

export let worldData = writable({})
export let selectedAssets = writable([availableAssets[0]])
export let selectedAsset = writable({
    color: "#ffffff",
    id: 0,
    position: {x: 0, y: 0, z: 0},
    rotation: {x: 0, y: 0, z: 0},
    type: 1,
    userLoopCode: ""
})
export let worldSelectedAssets = writable([
    {
        type: 'asset',
        number: 0,
        url: '/nakagin_capsule_center.glb',
        state: 'selected'
    },
])

export let loadedAssetsNumber = writable(0)
export let assetOptionsPanelDisplay = writable('none')