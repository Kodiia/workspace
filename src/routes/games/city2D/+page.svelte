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
            description: "Try replacing some structures and public spaces with different types. See how city evolves by pressing 'Analyze impact' button. Try decreasing the overall temperature in the city. Make sure you don't turn into a parking desert or a forest!"
        }
    ]
    


    /**
	 * @type {string | any[]}
	 */
    let cells = []
    let houses = [concrete02, concrete03, wood02]
    let spaces = [parking01]
    const widthNum = 10
    const heightNum = 10
    let gridContainer

    // let gridContainer = document.createElement('div')
    // gridContainer.className = 'gridContainer'
    // gridContainer.style.zoom = '100%'
    // document.body.appendChild(gridContainer)

    function generateCells(width, height){
        for(let i=0; i<width; i++){
            cells[i] = []
            for(let j=0; j<height; j++){
            
            if(Math.random() > 0.5){
                let className = 'concrete'
                cells[i][j] = {
                aliveNow: true,
                aliveNext: false,
                liveNeighbours: 0,
                // element: `<div class=${className}></div>`,
                className: 'buildings',
                image: concrete1
                }
            } else {
                cells[i][j] = {
                aliveNow: false,
                aliveNext: false,
                liveNeighbours: 0,
                // element: `<div class='asphalt'></div>`,
                className: 'spaces',
                image: parking01
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

    generateCells(widthNum, heightNum)
    cellIsAliveNextGeneration();
    updateCells();
    resetGeneration();

    function updateCells(){
        for(let i=0; i<widthNum; i++){
            for(let j=0; j<heightNum; j++){
                if(cells[i][j].aliveNow){
                // let className = 'concrete' + Math.floor(Math.random()*4)
                // cells[i][j].element = `<div class='${className}'></div>`
                cells[i][j].className = 'buildings',
                cells[i][j].image = houses[Math.floor(Math.random()*houses.length)]
                } else {
                // cells[i][j].element = `<div class='asphalt'></div>`
                cells[i][j].className = 'spaces'
                cells[i][j].image = spaces[Math.floor(Math.random()*spaces.length)]
                }
            }
        }
    }


    function generationLoop(){
        cellIsAliveNextGeneration();
        updateCells();
        
        // gridContainer.innerHTML = ''
        // for(let i=0; i<widthNum; i++){
        //     for(let j=0; j<heightNum; j++){
        //         gridContainer.innerHTML += cells[i][j].element
        //     }
        // }
        
        resetGeneration();
    }
    

    // console.log(cells)
    let navMenuDisplay = 'none'

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
        <button class='analyzeButton' on:click={generationLoop}>Analyze impact</button>
    </div>
    <hr style='display: {navMenuDisplay}'>
    <div class='navMenu' style='display: {navMenuDisplay}; max-height: calc({$height}px - 70px);' transition:fade >
        <div class='statisticsContainer' style='margin-top: 10px;'>
            <h2>Statistics</h2>
            <div class='statisticsGrid' style='grid-template-columns: repeat(7, {cellWidth*1.2}px);'>
                <div class='statisticsGridCard' style='width: calc({cellWidth*1.2}px - 20px);'>
                    <p>Temperature: <span>40 °C</span></p>
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
        <!-- <button class='smallMenuButton'>Stats</button>
        <button class='smallMenuButton'>Challenges</button> -->
    </div>
</nav>
<!-- <h1>city building game</h1> -->
<div bind:this={gridContainer} class='gridContainer' style='grid-template-columns: repeat(10, {cellWidth}px);'>
{#each cells as cell}
    {#each cell as {className, image}}
        {#if className === 'buildings'}
            <div class='block' style='width: {cellWidth}px; height: {cellWidth}px;'>
                <img src={image} alt='house' class='buildingImage' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);'/>
            </div>
        {:else if className === 'spaces'}
            <div class='block' style='width: {cellWidth}px; height: {cellWidth}px;'>
                <img src={image} alt='space' class='spacesImage' style='width: calc({cellWidth}px - 20px); height: calc({cellWidth}px - 20px);'/>
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
    .menuButton{
        padding: 5px;
        width: 50px;
        height: 50px;
        border: none;
        transform: scale(1.0);
    }
    .menuButton:hover{
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
        background: linear-gradient(180deg, rgb(65, 65, 65), rgb(35, 35, 35));
        border: 2px solid #383838;
        border-radius: 30px;
        box-sizing: border-box;
    }

    .buildingImage{
        background: linear-gradient(180deg, rgb(156, 192, 156), rgb(63, 114, 63));
        border: 2px solid #f9f9f9;
        border-radius: 30px;
        box-sizing: border-box;
    }

    .block{
        box-sizing: border-box;
        background: black;
        display: grid;
        align-items: center;
        justify-content: center;
    }
</style>