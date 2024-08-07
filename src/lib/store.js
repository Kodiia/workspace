import { writable } from 'svelte/store';
import { availableAssets } from './worldAssets';

export let theme = writable('dark');
export let bgColor = writable('0, 0%, 5%');
export let textColor = writable('0, 0%, 98%');
export let secondaryColor = writable('0, 0%, 15%');
export let primaryColor = writable('155, 70%, 55%');
export let accentColor = writable('80, 95%, 60%');
export let stylesPanelState = writable(false);

export let consolePanelState = writable(false);
export let consoleMessages = writable([]);

export let fileUploadFormDisplay = writable('none')
export let assetCardDisplay = writable('none')

export let width = writable(1920)
export let height = writable(1080)
export let leftPanelWidthSetByUser = writable(0)
export let rightPanelWidthSetByUser = writable(0)

export let projectId = writable('')
export let filesLocalCopy = writable([
    {
        fileName: 'index.html',
        fileData: `<html>
        <body></body>
        <style></style>
        <script></script>
        </html>`
    },
    {
        fileName: 'style.css',
        fileData: `body{
            background: #33dd99;
        }`
    },
    {
        fileName: 'script.js',
        fileData: `console.log('hi')`
    }
])
export let fileToOpen = writable('index.html')
export let editorState = writable(false)
export let runCode = writable(false)

export let filesPanelState = writable(true), docsPanelState = writable(true), stepsPanelState = writable(true), resourcesPanelState = writable(true);
export let filesPanelDisplay = writable('block')
export let resourcesPanelDisplay = writable('block')
export let resizeState = writable(false)

export let shareProjectPanelState = writable(false)
export let shareProjectData = writable({})

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