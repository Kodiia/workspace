<script>
    import { width, height } from '$lib/store'
    import { fade } from 'svelte/transition';
    
    let cellWidth
    width.subscribe(()=>{
        cellWidth = ($width - 20) / 10;
        if(cellWidth < 40){
            cellWidth = 40
        }
        //cellWidth = 80
    })

    let cells = []

    const water = [
        {
            background: '#dbedff',
            temperature: 0
        }
    ]

    const buildings = [
        {
            background: '#F1948A',
            temperature: 25
        }
    ]
    const buildingsGreen = [
        {
            background: 'purple',
            temperature: 18
        }
    ]

    const plants = [
        {
            background: '#7DCEA0',
            temperature: 15
        },
        {
            background: 'darkgreen',
            temperature: 15
        } 
    ]

    const empty = [
        {
            background: '#FADBD8',
            temperature: 30
        }
    ]


    const widthNum = 10
    const heightNum = 10
    let gridContainer

    function generateCells(width, height){
        console.log('generating cells')
        for(let i=0; i<width; i++){
            cells[i] = []
            for(let j=0; j<height; j++){
            
            if(i < 2 || i > width - 2 || j < 2 || j > height - 2){
                if(Math.random() > 0.75){
                    const num = Math.floor(Math.random()*buildings.length)
                    const blockType = 'water'
                    const blockData = getBlockData(num, blockType) 

                    cells[i][j] = {
                    aliveNow: false,
                    aliveNext: false,
                    liveNeighbours: 0,
                    id: i + '-' + j,
                    row: i,
                    column: j,
                    className: 'water',
                    type: blockType,
                    // image: blockData.image,
                    background: blockData.background,
                    borderTop: 'none',
                    borderBottom: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                    temperature: blockData.temperature,
                    temperatureTextScale: 1
                    }
                } else {
                    if(Math.random() > 0.5){
                        const num = Math.floor(Math.random()*buildings.length)
                        const blockType = 'building'
                        const blockData = getBlockData(num, blockType) 

                        cells[i][j] = {
                        aliveNow: false,
                        aliveNext: false,
                        liveNeighbours: 0,
                        id: i + '-' + j,
                        row: i,
                        column: j,
                        className: 'buildings',
                        type: blockType,
                        // image: blockData.image,
                        background: blockData.background,
                        borderTop: 'none',
                        borderBottom: 'none',
                        borderRight: 'none',
                        borderLeft: 'none',
                        temperature: blockData.temperature,
                        temperatureTextScale: 1,
                        
                        }
                    } else {
                        const num = Math.floor(Math.random()*empty.length)
                        const blockType = 'empty'
                        const blockData = getBlockData(num, blockType)

                        cells[i][j] = {
                        aliveNow: false,
                        aliveNext: false,
                        liveNeighbours: 0,
                        id: i + '-' + j,
                        row: i, 
                        column: j,
                        className: 'nature',
                        type: blockType,
                        // image: blockData.image,
                        background: blockData.background,
                        borderTop: 'none',
                        borderBottom: 'none',
                        borderRight: 'none',
                        borderLeft: 'none',
                        temperature: blockData.temperature,
                        temperatureTextScale: 1
                        }
                    }
                }
            } else {
                if(Math.random() > 0.5){
                    const num = Math.floor(Math.random()*buildings.length)
                    const blockType = 'building'
                    const blockData = getBlockData(num, blockType) 

                    cells[i][j] = {
                    aliveNow: false,
                    aliveNext: false,
                    liveNeighbours: 0,
                    id: i + '-' + j,
                    row: i,
                    column: j,
                    className: 'buildings',
                    type: blockType,
                    // image: blockData.image,
                    background: blockData.background,
                    borderTop: 'none',
                    borderBottom: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                    temperature: blockData.temperature,
                    temperatureTextScale: 1,
                    
                    }
                } else {
                    const num = Math.floor(Math.random()*empty.length)
                    const blockType = 'empty'
                    const blockData = getBlockData(num, blockType)

                    cells[i][j] = {
                    aliveNow: false,
                    aliveNext: false,
                    liveNeighbours: 0,
                    id: i + '-' + j,
                    row: i, 
                    column: j,
                    className: 'nature',
                    type: blockType,
                    // image: blockData.image,
                    background: blockData.background,
                    borderTop: 'none',
                    borderBottom: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                    temperature: blockData.temperature,
                    temperatureTextScale: 1
                    }
                }
            }

            }
        }
    }

    function getBlockData(num = 0, type = 'building'){
        //console.log('getting block data')
        let blockImage, blockBackground, blockTemperature
        switch (type){
            case 'water':
                // blockImage = buildings[num].url
                blockBackground = water[num].background,
                blockTemperature = water[num].temperature
            break;
            case 'building':
                // blockImage = buildings[num].url
                blockBackground = buildings[num].background,
                blockTemperature = buildings[num].temperature
            break;
            case 'buildingGreen':
                // blockImage = buildings[num].url
                blockBackground = buildingsGreen[num].background,
                blockTemperature = buildingsGreen[num].temperature
            break;
            case 'plant':
                // blockImage = buildings[num].url
                blockBackground = plants[num].background,
                blockTemperature = plants[num].temperature
            break;
            case 'empty':
                // blockImage = buildings[num].url
                blockBackground = empty[num].background,
                blockTemperature = empty[num].temperature
            break;   
        }

        return {
            // image: blockImage,
            background: blockBackground,
            temperature: blockTemperature
        }
    }


    function turnEmptyCellIntoGreenSpace(i=0, j=0){
        console.log(cells[i][j])
        cells[i][j].aliveNow = true
        cells[i][j].type = 'plant'
        cells[i][j].background = getBlockData(0, 'plant').background
        cells[i][j].temperature = getBlockData(0, 'plant').temperature

    }


    function updateNighborCellsTemperature(i =0, j = 0){
        if(typeof cells[i-1] != 'undefined' && cells[i-1][j].type != 'water'){
            cells[i-1][j].temperature = (cells[i][j].temperature + cells[i-1][j].temperature) / 2
            if(cells[i-1][j].type != 'plant'){
                cells[i-1][j].temperatureTextScale = 1.3
                setTimeout(()=>{cells[i-1][j].temperatureTextScale = 1}, 1000)
            }
        }
        if(typeof cells[i+1] != 'undefined' && cells[i+1][j].type != 'water'){
            cells[i+1][j].temperature = (cells[i][j].temperature + cells[i+1][j].temperature) / 2
            if(cells[i+1][j].type != 'plant'){
                cells[i+1][j].temperatureTextScale = 1.3
                setTimeout(()=>{cells[i+1][j].temperatureTextScale = 1}, 1000)
            }
        }
        if(typeof cells[i][j-1] != 'undefined' && cells[i][j-1].type != 'water'){
            cells[i][j-1].temperature = (cells[i][j].temperature + cells[i][j-1].temperature) / 2
            if(cells[i][j-1].type != 'plant'){
                cells[i][j-1].temperatureTextScale = 1.3
                setTimeout(()=>{cells[i][j-1].temperatureTextScale = 1}, 1000)
            }
        }
        if(typeof cells[i][j+1] != 'undefined' && cells[i][j+1].type != 'water'){
            cells[i][j+1].temperature = (cells[i][j].temperature + cells[i][j+1].temperature) / 2
            if(cells[i][j+1].type != 'plant'){
                cells[i][j+1].temperatureTextScale = 1.3
                setTimeout(()=>{cells[i][j+1].temperatureTextScale = 1}, 1000)
            }
        }
    }

    function drawCellBorders(){
        for(let i=0; i<cells.length; i++){
            for(let j=0; j<cells[i].length; j++){
                if(cells[i][j].type === 'empty' || cells[i][j].type === 'plant'){
                    if(typeof cells[i-1] != 'undefined' && cells[i-1][j].type === 'building' || typeof cells[i-1] != 'undefined' && cells[i-1][j].type === 'buildingGreen'){
                        cells[i][j].borderTop = '2px solid #EC7063'
                    }
                    if(typeof cells[i+1] != 'undefined' && cells[i+1][j].type === 'building' || typeof cells[i+1] != 'undefined' && cells[i+1][j].type === 'buildingGreen'){
                        cells[i][j].borderBottom = '2px solid #EC7063'
                    }
                    if(typeof cells[i][j-1] != 'undefined' && cells[i][j-1].type === 'building' || typeof cells[i][j-1] != 'undefined' && cells[i][j-1].type === 'buildingGreen'){
                        cells[i][j].borderLeft = '2px solid #EC7063'
                    }
                    if(typeof cells[i][j+1] != 'undefined' && cells[i][j+1].type === 'building' || typeof cells[i][j+1] != 'undefined' && cells[i][j+1].type === 'buildingGreen'){
                        cells[i][j].borderRight = '2px solid #EC7063'
                    }
                }
            }
        }
    }

    function cellIsGreenNextGeneration(){
        console.log('checking if cell is green next generation')
        for(let i=0; i<cells.length; i++){
            for(let j=0; j<cells[i].length; j++){

            cells[i][j].liveNeighbours = 0

                if(typeof cells[i-1] != 'undefined' && cells[i-1][j].aliveNow){
                cells[i][j].liveNeighbours++
                }
                if(typeof cells[i+1] != 'undefined' && cells[i+1][j].aliveNow){
                cells[i][j].liveNeighbours++
                }
                if(typeof cells[i][j-1] != 'undefined' && cells[i][j-1].aliveNow){
                cells[i][j].liveNeighbours++
                }
                if(typeof cells[i][j+1] != 'undefined' && cells[i][j+1].aliveNow){
                cells[i][j].liveNeighbours++
                }
                if(typeof cells[i+1] !== 'undefined' && typeof cells[i][j+1] !== 'undefined' && cells[i+1][j+1].aliveNow){
                    cells[i][j].liveNeighbours++
                }
                if(typeof cells[i-1] !== 'undefined' && typeof cells[i][j+1] !== 'undefined' && cells[i-1][j+1].aliveNow){
                    cells[i][j].liveNeighbours++
                }
                if(typeof cells[i-1] !== 'undefined' && typeof cells[i][j-1] !== 'undefined' && cells[i-1][j-1].aliveNow){
                    cells[i][j].liveNeighbours++
                }
                if(typeof cells[i+1] !== 'undefined' && typeof cells[i][j-1] !== 'undefined' && cells[i+1][j-1].aliveNow){
                    cells[i][j].liveNeighbours++
                }
            
                // if(cells[i][j].liveNeighbours === 0){
                // // if(cells[i][j].liveNeighbours === 0){
                //     cells[i][j].aliveNext = false
                // } else {
                //     cells[i][j].aliveNext = true
                //     // 
                // }

                if(cells[i][j].liveNeighbours > 0 && cells[i][j].liveNeighbours < 8 && Math.random() > 0.005){
                    cells[i][j].aliveNext = true
                } else {
                    cells[i][j].aliveNext = false
                    // 
                }
            

            
            }
        }
    }

    function resetGeneration(){
        console.log('resetting generation data')
        for(let i=0; i<cells.length; i++){
            for(let j=0; j<cells[i].length; j++){  
                cells[i][j].aliveNow = cells[i][j].aliveNext
            }
        }
    }



    function updateAllCells(){
        console.log('updating all cells')
        for(let i=0; i<widthNum; i++){
            for(let j=0; j<heightNum; j++){

                if(cells[i][j].aliveNow){
                    if(cells[i][j].type === 'plant'){
                        cells[i][j].type ='plant'
                        cells[i][j].background = getBlockData(0, 'plant').background
                    }
                    if(cells[i][j].type === 'empty'){
                        cells[i][j].type = 'plant'
                        cells[i][j].background = getBlockData(0, 'plant').background
                    }
                    if(cells[i][j].type === 'building'){
                        cells[i][j].type = 'buildingGreen'
                        cells[i][j].background = getBlockData(0, 'buildingGreen').background
                    }
                    if(cells[i][j].type === 'buildingGreen'){
                        cells[i][j].type ='buildingGreen'
                        cells[i][j].background = getBlockData(0, 'buildingGreen').background
                    }
                } else {
                    if(cells[i][j].type === 'plant'){
                        cells[i][j].type ='empty'
                        cells[i][j].background = getBlockData(0, 'empty').background
                    }
                    if(cells[i][j].type === 'empty'){
                        cells[i][j].type ='empty'
                        cells[i][j].background = getBlockData(0, 'empty').background
                    }
                    if(cells[i][j].type === 'buildingGreen'){
                        cells[i][j].type ='building'
                        cells[i][j].background = getBlockData(0, 'building').background
                    }
                    if(cells[i][j].type === 'building'){
                        cells[i][j].type ='building'
                        cells[i][j].background = getBlockData(0, 'building').background
                    }
                }
            }
        }
    }

    function generationLoop(){
        console.log('running generation loop')
        // cellIsGreenNextGeneration()
        // updateNeighborCellsTemperatureWhenTreeIsPlanted(selectedRow, selectedColumn)
        updateNighborCellsTemperature(selectedRow, selectedColumn)
        // updateAllCells();
        // resetGeneration()
    }



    let selectedId, selectedRow = 0, selectedColumn = 0, selectedType = 'concrete'

    // console.log(cells)
    let navMenuDisplay = 'none'
    let assetsMenuDisplay = 'none'
    let heatMapDisplay = true

    generateCells(widthNum, heightNum)
    drawCellBorders()

    // for(let i=0; i<widthNum; i++){
    //     for(let j=0; j<heightNum; j++){
    //         cells[i][j].temperature = 20
    //     }
    // }


</script>



<nav>
    <div class='navButtons'>
        <button class='menuButton' on:click={()=>{navMenuDisplay === 'none' ? navMenuDisplay = 'block' : navMenuDisplay = 'none'}}>
            {#if navMenuDisplay === 'none'}
                <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10" y1="20" x2="40" y2="20" stroke="#1a1a1a" stroke-width='2' />
                    <line x1="10" y1="30" x2="40" y2="30" stroke="#1a1a1a" stroke-width='2' />
                </svg>
            {:else}
                <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <line x1="15" y1="15" x2="35" y2="35" stroke="#1a1a1a" stroke-width='2' />
                    <line x1="15" y1="35" x2="35" y2="15" stroke="#1a1a1a" stroke-width='2' />
                </svg>
            {/if}
        </button>
        <!-- <img src='{habitat}' width='100' alt='habitat'/> -->
        <button class='analyzeButton' on:click={()=>{heatMapDisplay = !heatMapDisplay}}>heat map</button>
    </div>
    <hr style='display: {navMenuDisplay}'>
    <div class='navMenu' style='display: {navMenuDisplay}; max-height: calc({$height}px - 70px);' transition:fade >
        <a class='smallMenuButton' href='/'>Home</a>
        <div class='statisticsContainer' style='margin-top: 10px;'>
            <h2>City statistics</h2>
            <!-- <div class='statisticsGrid' style='grid-template-columns: repeat(auto-fill, {cellWidth*1.2}px);'>
                <div class='statisticsGridCard' style='width: calc({cellWidth*1.2}px - 20px);'>
                    <p>Buildings: <span>{buildingsNumber}</span></p>
                </div>
                <div class='statisticsGridCard' style='width: calc({cellWidth*1.2}px - 20px);'>
                    <p>Public Spaces: <span>{spacesNumber}</span></p>
                </div>
                <div class='statisticsGridCard' style='width: calc({cellWidth*1.2}px - 20px);'>
                    <p>Temperature: <span>{temperature}°C</span></p>
                </div>
                <div class='statisticsGridCard' style='width: calc({cellWidth*1.2}px - 20px);'>
                    <p>CO2 level: <span>high</span></p>
                </div>
                <div class='statisticsGridCard' style='width: calc({cellWidth*1.2}px - 20px);'>
                    <p>Air-quality: <span>poor</span></p>
                </div>
            </div> -->
        </div>
        <div class='challengesContainer'>
            <!-- <h2>Challenges</h2>
            <div class='challengesGrid' style='grid-template-columns: repeat(auto-fill, {cellWidth*2}px);'>
                {#each challenges as {number, title, description}}
                    <div class='challengesGridCard' style='width: calc({cellWidth*2}px - 20px);'>
                        <h3>{number}. {title}</h3>
                        <p>{description}</p>
                    </div>
                {/each}
            </div> -->
        </div>
    </div>
</nav>

<!-- <div class='dataContainer'>
    <p style='margin: 0 5px;'>🏙️ {buildingsNumber}</p>
    <p style='margin: 0 5px;'>🌳 {spacesNumber}</p>
    <p style='margin: 0 5px; color: {temperatureColor};'>🌡️ {temperature}°C</p>
    
</div> -->

<div style='display: {assetsMenuDisplay}; width: {$width}px; max-height: calc({$height}px - 70px);' class='assetsMenu'>
    <button class='assetsMenuButton' on:click={()=>{assetsMenuDisplay = 'none'}}>
        <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <line x1="15" y1="15" x2="35" y2="35" stroke="#1a1a1a" stroke-width='2' />
            <line x1="15" y1="35" x2="35" y2="15" stroke="#1a1a1a" stroke-width='2' />
        </svg>
    </button>
    <!-- <h3>{selectedRow}-{selectedColumn}</h3>
    <div class='assetsGrid' style='grid-template-columns: repeat(auto-fill, {cellWidth}px);'>
        <h3>Concrete buildings</h3>
        {#each concreteBuildings as concreteBuilding, i}
            <button class='assetsButton' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);' on:click={()=>{selectedType = 'concrete'; updateBlockData(selectedRow, selectedColumn, 'buildings', selectedType, concreteBuildings[i].url, concreteBuildings[i].background, concreteBuildings[i].temperature); assetsMenuDisplay = 'none'}}> 
                <p class='assetsButtonText'>{i}</p>
                <img src='{concreteBuilding.url}' alt='concrete building' class='assetsImage' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);'/>
            </button>
        {/each}
    </div>
    <div class='assetsGrid' style='grid-template-columns: repeat(auto-fill, {cellWidth}px);'>
        <h3>Wooden buildings</h3>
        {#each woodenBuildings as woodenBuilding, i}
            <button class='assetsButton' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);' on:click={()=>{selectedType = 'wood'; updateBlockData(selectedRow, selectedColumn, 'buildings', selectedType, woodenBuildings[i].url, woodenBuildings[i].background, woodenBuildings[i].temperature); assetsMenuDisplay = 'none'}}> 
                <p class='assetsButtonText'>{i}</p>
                <img src='{woodenBuilding.url}' alt='wooden building' class='assetsImage' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);'/>
            </button>
        {/each}
    </div>
    <div class='assetsGrid' style='grid-template-columns: repeat(auto-fill, {cellWidth}px);'>
        <h3>Brick buildings</h3>
        {#each brickBuildings as brickBuilding, i}
            <button class='assetsButton' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);' on:click={()=>{selectedType = 'brick'; updateBlockData(selectedRow, selectedColumn, 'buildings', selectedType, brickBuildings[i].url, brickBuildings[i].background, brickBuildings[i].temperature); assetsMenuDisplay = 'none'}}> 
                <p class='assetsButtonText'>{i}</p>
                <img src='{brickBuilding.url}' alt='brick building' class='assetsImage' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);'/>
            </button>
        {/each}
    </div>
    <div class='assetsGrid' style='grid-template-columns: repeat(auto-fill, {cellWidth}px);'>
        <h3>Innovative buildings</h3>
        {#each innovativeBuildings as innovativeBuilding, i}
            <button class='assetsButton' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);' on:click={()=>{selectedType = 'innovative'; updateBlockData(selectedRow, selectedColumn, 'buildings', selectedType, innovativeBuildings[i].url, innovativeBuildings[i].background, innovativeBuildings[i].temperature); assetsMenuDisplay = 'none'}}> 
                <p class='assetsButtonText'>{i}</p>
                <img src='{innovativeBuilding.url}' alt='innovative building' class='assetsImage' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);'/>
            </button>
        {/each}
    </div>
    <div class='assetsGrid' style='grid-template-columns: repeat(auto-fill, {cellWidth}px);'>
        <h3>Parkings</h3>
        {#each parkings as parking, i}
            <button class='assetsButton' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);' on:click={()=>{selectedType = 'parking'; updateBlockData(selectedRow, selectedColumn, 'spaces', selectedType, parkings[i].url, parkings[i].background, parkings[i].temperature); assetsMenuDisplay = 'none'}}> 
                <p class='assetsButtonText'>{i}</p>
                <img src='{parking.url}' alt='parking' class='assetsImage' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);'/>
            </button>
        {/each}
    </div>
    <div class='assetsGrid' style='grid-template-columns: repeat(auto-fill, {cellWidth}px);'>
        <h3>Green Parkings</h3>
        {#each greenParkings as parking, i}
            <button class='assetsButton' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);' on:click={()=>{selectedType = 'greenParking'; updateBlockData(selectedRow, selectedColumn, 'spaces', selectedType, greenParkings[i].url, greenParkings[i].background, greenParkings[i].temperature); assetsMenuDisplay = 'none'}}> 
                <p class='assetsButtonText'>{i}</p>
                <img src='{parking.url}' alt='parking' class='assetsImage' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);'/>
            </button>
        {/each}
    </div>
    <div class='assetsGrid' style='grid-template-columns: repeat(auto-fill, {cellWidth}px); margin-bottom: 20px;'>
        <h3>Plazas</h3>
        {#each plazas as plaza, i}
            <button class='assetsButton' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);' on:click={()=>{selectedType = 'plaza'; updateBlockData(selectedRow, selectedColumn, 'spaces', selectedType, plazas[i].url, plazas[i].background, plazas[i].temperature); assetsMenuDisplay = 'none'}}> 
                <p class='assetsButtonText'>{i}</p>
                <img src='{plaza.url}' alt='plaza' class='assetsImage' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);'/>
            </button>
        {/each}
    </div> -->
</div>

<div class='cityOutscirtsContainer'>
<div bind:this={gridContainer} class='gridContainer' style='grid-template-columns: repeat(10, {cellWidth}px);'>
{#each cells as cell}
    {#each cell as {className, image, id, row, column, background, borderTop, borderBottom, borderRight, borderLeft, temperature, temperatureTextScale, type, aliveNow, liveNeighbours}}
        {#if type === 'building'}
            <div id={id} class='block' style='width: {cellWidth}px; height: {cellWidth}px; background: {background};  border-top: {borderTop}; border-bottom: {borderBottom}; border-right: {borderRight}; border-left: {borderLeft}; cursor: default;' on:click={()=>{selectedId = id; selectedRow = row; selectedColumn = column;}} on:keypress={()=>{selectedId = id; selectedRow = row; selectedColumn = column; }}>
                <p style='font-size: 10px; transform: scale({temperatureTextScale})' class='blockText'>{temperature}°C</p>
                <!-- <p class='blockText'>{20 + temperature}°C</p> -->
                <!-- <img src={image} alt='house' class='buildingImage' style='background: {background}; width: calc({cellWidth}px - 30px); height: calc({cellWidth}px - 30px);'/> -->
            </div>
        {:else if type === 'empty'}
            <div id={id} class='block' style='width: {cellWidth}px; height: {cellWidth}px; background: {background}; border-top: {borderTop}; border-bottom: {borderBottom}; border-right: {borderRight}; border-left: {borderLeft}; cursor: pointer;' on:click={()=>{selectedId = id; selectedRow = row; selectedColumn = column; turnEmptyCellIntoGreenSpace(selectedRow, selectedColumn); generationLoop()}} on:keypress={()=>{assetsMenuDisplay = 'block'; selectedId = id; selectedRow = row; selectedColumn = column;  turnEmptyCellIntoGreenSpace(selectedRow, selectedColumn)}}>
                <p style='font-size: 10px; transform: scale({temperatureTextScale})' class='blockText'>{temperature}°C</p>
                <!-- <img src={image} alt='space' class='spacesImage' style='background: {background}; width: calc({cellWidth}px - 30px); height: calc({cellWidth}px - 30px);'/> -->
            </div>
        {:else if type === 'water'}
            <div id={id} class='block' style='width: {cellWidth}px; height: {cellWidth}px; background: {background}; border-top: {borderTop}; border-bottom: {borderBottom}; border-right: {borderRight}; border-left: {borderLeft}; cursor: default;' on:click={()=>{selectedId = id; selectedRow = row; selectedColumn = column; }} on:keypress={()=>{assetsMenuDisplay = 'block'; selectedId = id; selectedRow = row; selectedColumn = column; }}>
                <!-- <p style='font-size: 10px;'>{temperature}°C</p> -->
                <!-- <img src={image} alt='space' class='spacesImage' style='background: {background}; width: calc({cellWidth}px - 30px); height: calc({cellWidth}px - 30px);'/> -->
            </div>
        {:else if type === 'plant'}
            <div id={id} class='block' style='width: {cellWidth}px; height: {cellWidth}px; background: {background}; border-top: {borderTop}; border-bottom: {borderBottom}; border-right: {borderRight}; border-left: {borderLeft}; cursor: default;' on:click={()=>{selectedId = id; selectedRow = row; selectedColumn = column;}} on:keypress={()=>{assetsMenuDisplay = 'block'; selectedId = id; selectedRow = row; selectedColumn = column;}}>
                <p style='font-size: 10px; transform: scale({temperatureTextScale})' class='blockText'>{temperature}°C</p>
                <!-- <img src={image} alt='space' class='spacesImage' style='background: {background}; width: calc({cellWidth}px - 30px); height: calc({cellWidth}px - 30px);'/> -->
            </div>
        {:else if type === 'buildingGreen'}
            <div id={id} class='block' style='width: {cellWidth}px; height: {cellWidth}px; background: {background}; border-top: {borderTop}; border-bottom: {borderBottom}; border-right: {borderRight}; border-left: {borderLeft}; cursor: default;' on:click={()=>{selectedId = id; selectedRow = row; selectedColumn = column;}} on:keypress={()=>{assetsMenuDisplay = 'block'; selectedId = id; selectedRow = row; selectedColumn = column;}}>
                <p style='font-size: 10px; transform: scale({temperatureTextScale})' class='blockText'>{temperature}°C</p>
                <!-- <img src={image} alt='space' class='spacesImage' style='background: {background}; width: calc({cellWidth}px - 30px); height: calc({cellWidth}px - 30px);'/> -->
            </div>
        {/if}
    {/each}
{/each}
</div>

{#if heatMapDisplay === true}
<div style='opacity: 0.35; position: absolute; z-index: 2; width: {cellWidth * widthNum + 120}px; height: {cellWidth * heightNum + 120}px; backdrop-filter: blur(20px) contrast(500%) grayscale(20%); -webkit-backdrop-filter: blur(20px) contrast(500%) grayscale(20%);'></div>
<div class='gridContainer' style='position: absolute; z-index: 1; grid-template-columns: repeat(10, {cellWidth}px);'>
    {#each cells as cell}
        {#each cell as {className, image, id, row, column, background, borderTop, borderBottom, borderRight, borderLeft, temperature, temperatureTextScale, type, aliveNow, liveNeighbours}}
            {#if temperature < 15}
                <div class='block' style='width: {cellWidth}px; height: {cellWidth}px; background: skyblue;'>
                    <!-- <p style='font-size: 10px; transform: scale({temperatureTextScale})' class='blockText'>{temperature}°C</p> -->
                    <!-- <p class='blockText'>{20 + temperature}°C</p> -->
                    <!-- <img src={image} alt='house' class='buildingImage' style='background: {background}; width: calc({cellWidth}px - 30px); height: calc({cellWidth}px - 30px);'/> -->
                </div>
            {:else if temperature >= 15 && temperature <= 18}
                <div class='block' style='width: {cellWidth}px; height: {cellWidth}px; background: lime;'>
                    <!-- <p style='font-size: 10px; transform: scale({temperatureTextScale})' class='blockText'>{temperature}°C</p> -->
                    <!-- <img src={image} alt='space' class='spacesImage' style='background: {background}; width: calc({cellWidth}px - 30px); height: calc({cellWidth}px - 30px);'/> -->
                </div>
            {:else if temperature > 18 && temperature <= 23}
                <div class='block' style='width: {cellWidth}px; height: {cellWidth}px; background: #f9c22e;'>
                    <!-- <p style='font-size: 10px;'>{temperature}°C</p> -->
                    <!-- <img src={image} alt='space' class='spacesImage' style='background: {background}; width: calc({cellWidth}px - 30px); height: calc({cellWidth}px - 30px);'/> -->
                </div>
            {:else if temperature > 23 && temperature <= 25}
                <div class='block' style='width: {cellWidth}px; height: {cellWidth}px; background: #ff8800;'>
                    <!-- <p style='font-size: 10px; transform: scale({temperatureTextScale})' class='blockText'>{temperature}°C</p> -->
                    <!-- <img src={image} alt='space' class='spacesImage' style='background: {background}; width: calc({cellWidth}px - 30px); height: calc({cellWidth}px - 30px);'/> -->
                </div>
            {:else if temperature > 25}
                <div class='block' style='width: {cellWidth}px; height: {cellWidth}px; background: #e01e37;'>
                    <!-- <p style='font-size: 10px; transform: scale({temperatureTextScale})' class='blockText'>{temperature}°C</p> -->
                    <!-- <img src={image} alt='space' class='spacesImage' style='background: {background}; width: calc({cellWidth}px - 30px); height: calc({cellWidth}px - 30px);'/> -->
                </div>
            {/if}
        {/each}
    {/each}
</div>
{/if}
</div>

<style>
    nav{
        width: calc(100% - 10px);
        min-height: 50px;
        /* display: flex; */
        /* margin-bottom: 10px; */
        position: fixed;
        padding: 5px;
        top: 0;
        left: 0;
        background: linear-gradient( 45deg, #ffffffc3, #ffffff90);
        backdrop-filter: blur(40px);
        -webkit-backdrop-filter: blur(40px);
        border-radius: 0 0 10px 10px;
        z-index: 10;
    }
    .navButtons{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .navMenu{
        /* width: calc(100% - 10px); */
        overflow-y: scroll;
        margin-bottom: 10px;
    }
    .smallMenuButton {
      background: none;
      border: none;
      color: #1a1a1a;
      font-family: Roboto, sans-serif;
      font-weight: 300;
      font-size: 1rem;
      text-decoration: none;
      display: flex;
      align-items: center;
      padding: 0 20px 0 0;
    }
    .smallMenuButton:hover {
      background: none;
      border: none;
      font-family: Roboto, sans-serif;
      font-weight: 300;
      font-size: 1rem;
      color: #3d95ee;
      text-decoration: underline;
      display: flex;
      align-items: center;
    }
    /* .dataContainer{
        width: calc(100% - 10px);
        min-height: 50px;
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 0px;
        left: 0px;
        z-index: 1;
        padding: 5px;
        background: linear-gradient( 45deg, #ffffffc3, #ffffff90);
        backdrop-filter: blur(40px);
        -webkit-backdrop-filter: blur(40px);
        border-radius: 10px 10px 0 0;
        overflow-y: auto;
    } */
    .analyzeButton{
        background: radial-gradient(#3d95ee, #4433fb);
        border: none;
        color: #f9f9f9;
        transform: scale(1.0);
    }
    .analyzeButton:hover{
        transform: scale(1.05);
    }
    .menuButton, .assetsMenuButton{
        padding: 5px;
        width: 50px;
        height: 50px;
        border: none;
        transform: scale(1.0);
    }
    .menuButton:hover, .assetsMenuButton:hover{
        background: none;
        transform: scale(1.1);
    }
    .statisticsContainer, .challengesContainer{
        /* width: 100%; */
        padding: 10px;
    }
    /* .statisticsGrid, .challengesGrid{
        display: grid;
    }
    .statisticsGridCard, .challengesGridCard{
        margin: 0 0 10px 0;
        padding: 10px;
        background: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0 0 10px #3d95ee50;
        box-sizing: border-box;
    }
    span{
        color: #4233fb;
    } */

    .assetsMenu{
        width: calc(100% - 10px);
        position: fixed;
        top: 60px;
        left: 0;
        z-index: 1;
        overflow-y: scroll;
        margin-bottom: 10px;
        background: linear-gradient( 45deg, #ffffffc3, #ffffff90);
        backdrop-filter: blur(40px);
        -webkit-backdrop-filter: blur(40px);
        padding: 10px;
    }
    .assetsMenuButton{
        position: fixed;
        top: 0;
        right: 10px;
    }
    /* .assetsGrid{
        display: grid;
    }
    .assetsButton{
        position: relative;
        border: none;
        background: none;
        color: #1a1a1a;
        padding: 10px;
        display: flex; 
        align-items: center;
        justify-content: center;
    }
    .assetsButton:hover{
        background: #4233fb30;
    }
    .assetsButtonText{
        position: absolute;
        margin: 0;
        top: 0px;
        right: 5px;
    }
    .assetsImage{
        box-sizing: border-box;
    } */
    .cityOutscirtsContainer{
        position: absolute;
        padding: 120px 60px 60px 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* background-image: linear-gradient(rgb(162, 201, 224) 60px, transparent 120px), linear-gradient(to right, rgb(162, 201, 224) 0px, transparent 60px), linear-gradient(to left, rgb(162, 201, 224) 0px, transparent 60px), linear-gradient(to top, rgb(162, 201, 224) 0px, transparent 60px); */
        /* background: #f9f9f9; */
        background-color: #dbedff;
    }
    .gridContainer{
        /* position: absolute; */
        /* left: 0; */
        display: grid;
        grid-template-columns: repeat(10, 200px);
        background: #f9f9f9;
        /* border: 2px solid #f9f9f9; */
    }


    /* .asphalt{
        box-sizing: border-box;
        background: black;
        display: grid;
        align-items: center;
        justify-content: center;
    } */
    /* .spacesImage{
        border-radius: 30px;
        box-sizing: border-box;
        cursor: pointer;
        box-shadow: 0 0 10px #1a1a1a;
        padding: 10px;
    }

    .buildingImage{
        border-radius: 30px;
        box-sizing: border-box;
        cursor: pointer;
        box-shadow: 0 0 10px #1a1a1a;
        padding: 10px;
    } */

    .block{
        position: relative;
        box-sizing: border-box;
        background: rgb(156, 156, 156);
        display: grid;
        align-items: center;
        justify-content: center;
        transform: scale(1.0);
    }
    .block:hover{
        transform: scale(1.02);
    }

    .blockText{
        position: absolute;
        top: 0;
        right: 0;
        margin: 5px;
        padding: 5px;
        background: #1a1a1a20;
        color: #f9f9f9;
        border-radius: 20px;
    }
</style>