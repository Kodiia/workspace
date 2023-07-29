<script>
    import { width, height } from '$lib/store'
    import { fade } from 'svelte/transition';
    import habitat from '$lib/logos/habitat.svg'
    import concrete1 from '$lib/images/games/concrete1.webp'
    import concrete2 from '$lib/images/games/concrete2.webp'
    import concrete3 from '$lib/images/games/concrete3.webp'
    import concrete02 from '$lib/images/games/concrete_02.webp'
    import concrete03 from '$lib/images/games/concrete_03.webp'
    import wood1 from '$lib/images/games/wood1.webp'
    import wood02 from '$lib/images/games/wood_02.webp'
    import parking01 from '$lib/images/games/parking_01.webp'

    let cellWidth
    width.subscribe(()=>{
        cellWidth = ($width - 20) / 10;
        if(cellWidth < 200){
            cellWidth = 200
        }
    })

    const challenges = [
        {
            number: 1,
            title: 'Decrease overall temperature',
            description: "Try replacing some structures and public spaces with different types. See how city evolves by pressing '+ 10 years' button. Try decreasing the overall temperature in the city. Make sure you don't turn it into a parking desert or a forest!"
        }
    ]
    


    /**
	 * @type {string | any[]}
	 */
    let cells = []
    
    const concreteBuildings = [
        {
            url: concrete02,
            background: 'linear-gradient(180deg, rgb(190, 190, 190), rgb(120, 120, 120))',
            temperature: 40,
        }, 
        {
            url:  concrete03,
            background: 'linear-gradient(180deg, rgb(190, 190, 190), rgb(120, 120, 120))',
            temperature: 40, 
        } ]
    const woodenBuildings = [
        {
            url: wood02,
            background: 'linear-gradient(180deg, rgb(190, 190, 190), rgb(120, 120, 120))',
            temperature: 30,
        } ]
    const parkings = [ 
        {
            url: parking01,
            background: 'linear-gradient(180deg, rgb(65, 65, 65), rgb(35, 35, 35))',
            temperature: 50,
        } ]
    const plazas = [ 
        { 
            url: parking01,
            background: 'linear-gradient(180deg, rgb(35, 35, 35), rgb(65, 65, 65))',
            temperature: 50,
        } ]

    const widthNum = 10
    const heightNum = 10
    let gridContainer

    function generateCells(width, height){
        for(let i=0; i<width; i++){
            cells[i] = []
            for(let j=0; j<height; j++){
            
            if(Math.random() > 0.5){
                const num = Math.floor(Math.random()*concreteBuildings.length)
                const blockType = 'concrete'
                const blockData = getBlockData(num, blockType) 

                let className = 'concrete'
                cells[i][j] = {
                aliveNow: true,
                aliveNext: false,
                liveNeighbours: 0,
                id: i + '-' + j,
                row: i,
                column: j,
                className: 'buildings',
                type: blockType,
                image: blockData.image,
                background: blockData.background,
                temperature: blockData.temperature
                }
            } else {
                const num = Math.floor(Math.random()*parkings.length)
                const blockType = 'parking'
                const blockData = getBlockData(num, blockType)

                cells[i][j] = {
                aliveNow: false,
                aliveNext: false,
                liveNeighbours: 0,
                id: i + '-' + j,
                row: i, 
                column: j,
                className: 'spaces',
                type: blockType,
                image: blockData.image,
                background: blockData.background,
                temperature: blockData.temperature
                }
            }
            
            // if(i == 0 && j == 0 || i === width-1 && j === height-1){
            //   cells[i][j] = {
            //     aliveNow: true,
            //     aliveNext: false,
            //     liveNeighbours: 0
            //   }
            // } else {
            //   cells[i][j] = {
            //     aliveNow: false,
            //     aliveNext: false,
            //     liveNeighbours: 0
            //   }
            // }

            }
        }
    }

    function getBlockData(num = 0, type = 'concrete'){
        let blockImage, blockBackground, blockTemperature
        switch (type){
            case 'concrete':
                blockImage = concreteBuildings[num].url
                blockBackground = concreteBuildings[num].background
                blockTemperature = concreteBuildings[num].temperature
            break;
            case 'wood':
                blockImage = woodenBuildings[num].url
                blockBackground = woodenBuildings[num].background
                blockTemperature = woodenBuildings[num].temperature
            break;
            case 'parking':
                blockImage = parkings[num].url
                blockBackground = parkings[num].background
                blockTemperature = parkings[num].temperature
            break;
            case 'plaza':
                blockImage = plazas[num].url
                blockBackground = plazas[num].background
                blockTemperature = plazas[num].temperature
             break;    
        }
        return {
            image: blockImage,
            background: blockBackground,
            temperature: blockTemperature
        }
    }

    function cellIsAliveNextGeneration(){
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

            if(cells[i][j].liveNeighbours === 0 || cells[i][j].liveNeighbours === 4){
                cells[i][j].aliveNext = false
            } else {
                cells[i][j].aliveNext = true
            }
            
            }
        }
    }

    function resetGeneration(){
        for(let i=0; i<cells.length; i++){
            for(let j=0; j<cells[i].length; j++){  
            cells[i][j].aliveNow = cells[i][j].aliveNext
            }
        }
    }



    function updateCells(){
        for(let i=0; i<widthNum; i++){
            for(let j=0; j<heightNum; j++){
                if(cells[i][j].aliveNow){
                    const num = Math.floor(Math.random()*concreteBuildings.length)
                    const blockType = 'concrete'
                    const blockData = getBlockData(num, blockType)
                    cells[i][j].className = 'buildings',
                    cells[i][j].type = blockType,
                    cells[i][j].image = blockData.image
                    cells[i][j].temperature = blockData.temperature
                    cells[i][j].background = blockData.background
                } else {
                    const num = Math.floor(Math.random()*parkings.length)
                    const blockType = 'parking'
                    const blockData = getBlockData(num, blockType)
                    cells[i][j].className = 'spaces'
                    cells[i][j].type = blockType
                    cells[i][j].image = blockData.image
                    cells[i][j].temperature = blockData.temperature
                    cells[i][j].background = blockData.background
                }
            }
        }
    }


    function generationLoop(){
        cellIsAliveNextGeneration();
        updateCells();
        getTemperatureValue()
        getBuildingsNumber()
        getSpacesNumber()
        resetGeneration()
    }

    let temperature = 0
    function getTemperatureValue(){
        temperature = 0
        for(let i=0; i<widthNum; i++){
            for(let j=0; j<heightNum; j++){
                temperature += cells[i][j].temperature
            }
        }
        temperature = temperature / (widthNum * heightNum)
        return temperature
    }

    let buildingsNumber = 0
    function getBuildingsNumber(){
        buildingsNumber = 0
        for(let i=0; i<widthNum; i++){
            for(let j=0; j<heightNum; j++){
                if(cells[i][j].aliveNow){
                    buildingsNumber += 1
                } else {
                    buildingsNumber += 0
                }
            }
        }
        return buildingsNumber
    }

    let spacesNumber = 0
    function getSpacesNumber(){
        spacesNumber = 0
        for(let i=0; i<widthNum; i++){
            for(let j=0; j<heightNum; j++){
                if(cells[i][j].aliveNow){
                    spacesNumber += 0
                } else {
                    spacesNumber += 1
                }
            }
        }
        return spacesNumber
    }
    
    function updateCellData(i = 0, j = 0, type = 'concrete', image = concrete02, background = 'grey', temperature = 40){
        cells[i][j].type = type
        cells[i][j].image = image
        cells[i][j].background = background
        cells[i][j].temperature = temperature
    }

    let selectedId, selectedRow = 0, selectedColumn = 0, selectedType = 'concrete'

    // console.log(cells)
    let navMenuDisplay = 'none'
    let assetsMenuDisplay = 'none'

    generateCells(widthNum, heightNum)
    cellIsAliveNextGeneration();
    updateCells();
    getTemperatureValue();
    getBuildingsNumber()
    getSpacesNumber()
    resetGeneration();
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
        <img src='{habitat}' width='100' alt='habitat'/>
        <button class='analyzeButton' on:click={generationLoop}>+ 10 years</button>
    </div>
    <hr style='display: {navMenuDisplay}'>
    <div class='navMenu' style='display: {navMenuDisplay}; max-height: calc({$height}px - 70px);' transition:fade >
        <div class='statisticsContainer' style='margin-top: 10px;'>
            <h2>City statistics</h2>
            <div class='statisticsGrid' style='grid-template-columns: repeat(auto-fill, {cellWidth*1.2}px);'>
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
            </div>
        </div>
        <div class='challengesContainer'>
            <h2>Challenges</h2>
            <div class='challengesGrid' style='grid-template-columns: repeat(auto-fill, {cellWidth*2}px);'>
                {#each challenges as {number, title, description}}
                    <div class='challengesGridCard' style='width: calc({cellWidth*2}px - 20px);'>
                        <h3>{number}. {title}</h3>
                        <p>{description}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</nav>

<div style='display: {assetsMenuDisplay}; width: {$width}px; max-height: calc({$height}px - 70px);' class='assetsMenu'>
    <button class='assetsMenuButton' on:click={()=>{assetsMenuDisplay = 'none'}}>
        <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <line x1="15" y1="15" x2="35" y2="35" stroke="#1a1a1a" stroke-width='2' />
            <line x1="15" y1="35" x2="35" y2="15" stroke="#1a1a1a" stroke-width='2' />
        </svg>
    </button>
    <h3>{selectedRow}-{selectedColumn}</h3>
    <div class='assetsGrid' style='grid-template-columns: repeat(auto-fill, {cellWidth}px);'>
        <h3>Concrete buildings</h3>
        {#each concreteBuildings as concreteBuilding, i}
            <button class='assetsButton' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);' on:click={()=>{selectedType = 'concrete'; updateCellData(selectedRow, selectedColumn, selectedType, concreteBuildings[i].url, concreteBuildings[i].background, concreteBuildings[i].temperature); assetsMenuDisplay = 'none'}}> 
                <p class='assetsButtonText'>{i}</p>
                <img src='{concreteBuilding.url}' alt='concrete building' class='assetsImage' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);'/>
            </button>
        {/each}
    </div>
    <div class='assetsGrid' style='grid-template-columns: repeat(auto-fill, {cellWidth}px);'>
        <h3>Wooden buildings</h3>
        {#each woodenBuildings as woodenBuilding, i}
            <button class='assetsButton' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);' on:click={()=>{selectedType = 'wood'; updateCellData(selectedRow, selectedColumn, selectedType, woodenBuildings[i].url, woodenBuildings[i].background, woodenBuildings[i].temperature); assetsMenuDisplay = 'none'}}> 
                <p class='assetsButtonText'>{i}</p>
                <img src='{woodenBuilding.url}' alt='wooden building' class='assetsImage' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);'/>
            </button>
        {/each}
    </div>
    <div class='assetsGrid' style='grid-template-columns: repeat(auto-fill, {cellWidth}px);'>
        <h3>Parkings</h3>
        {#each parkings as parking, i}
            <button class='assetsButton' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);' on:click={()=>{selectedType = 'parking'; updateCellData(selectedRow, selectedColumn, selectedType, parkings[i].url, parkings[i].background, parkings[i].temperature); assetsMenuDisplay = 'none'}}> 
                <p class='assetsButtonText'>{i}</p>
                <img src='{parking.url}' alt='parking' class='assetsImage' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);'/>
            </button>
        {/each}
    </div>
    <div class='assetsGrid' style='grid-template-columns: repeat(auto-fill, {cellWidth}px); margin-bottom: 20px;'>
        <h3>Plazas</h3>
        {#each plazas as plaza, i}
            <button class='assetsButton' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);' on:click={()=>{selectedType = 'plaza'; updateCellData(selectedRow, selectedColumn, selectedType, plazas[i].url, plazas[i].background, plazas[i].temperature); assetsMenuDisplay = 'none'}}> 
                <p class='assetsButtonText'>{i}</p>
                <img src='{plaza.url}' alt='plaza' class='assetsImage' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);'/>
            </button>
        {/each}
    </div>
</div>

<div bind:this={gridContainer} class='gridContainer' style='grid-template-columns: repeat(10, {cellWidth}px);'>
{#each cells as cell}
    {#each cell as {className, image, id, row, column, background}}
        {#if className === 'buildings'}
            <div id={id} class='block' style='width: {cellWidth}px; height: {cellWidth}px;' on:click={()=>{assetsMenuDisplay = 'block'; selectedId = id; selectedRow = row; selectedColumn = column;}} on:keypress={()=>{assetsMenuDisplay = 'block'; selectedId = id; selectedRow = row; selectedColumn = column; }}>
                <img src={image} alt='house' class='buildingImage' style='background: {background}; width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);'/>
            </div>
        {:else if className === 'spaces'}
            <div id={id} class='block' style='width: {cellWidth}px; height: {cellWidth}px;' on:click={()=>{assetsMenuDisplay = 'block'; selectedId = id; selectedRow = row; selectedColumn = column;}} on:keypress={()=>{assetsMenuDisplay = 'block'; selectedId = id; selectedRow = row; selectedColumn = column;}}>
                <img src={image} alt='space' class='spacesImage' style='background: {background}; width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);'/>
            </div>
        {/if}
    {/each}
{/each}
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
        z-index: 2;
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
    .statisticsGrid, .challengesGrid{
        /* width: 100%; */
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
    }

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
        position: absolute;
        top: 0;
        right: 10px;
    }
    .assetsGrid{
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
        background: #4233fb10;
    }
    .assetsButtonText{
        position: absolute;
        margin: 0;
        top: 0px;
        right: 5px;
    }
    .assetsImage{
        margin-bottom: 10px;
        box-sizing: border-box;
    }
    .gridContainer{
        margin-top: 50px;
        display: grid;
        grid-template-columns: repeat(10, 200px);
        background: black;
    }


    /* .asphalt{
        box-sizing: border-box;
        background: black;
        display: grid;
        align-items: center;
        justify-content: center;
    } */
    .spacesImage{
        border: 2px solid #383838;
        border-radius: 30px;
        box-sizing: border-box;
        cursor: pointer;
    }

    .buildingImage{
        border: 2px solid #f9f9f9;
        border-radius: 30px;
        box-sizing: border-box;
        cursor: pointer;
    }

    .block{
        box-sizing: border-box;
        background: black;
        display: grid;
        align-items: center;
        justify-content: center;
    }
</style>