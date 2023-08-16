<script>
    export let width = 100

    const widthNum = 10
    let cellWidth = width / widthNum
    let cells = []


    function generateCells(width, height){
        // console.log('generating cells')
        for(let i=0; i<width; i++){
            cells[i] = []
            for(let j=0; j<height; j++){
            
            if(Math.random() > 0.5){
                // const num = Math.floor(Math.random()*buildings.length)
                // const blockType = 'water'
                // const blockData = getBlockData(num, blockType) 

                cells[i][j] = {
                aliveNow: true,
                aliveNext: false,
                liveNeighbours: 0,
                opacity: 1,
                // id: i + '-' + j,
                // row: i,
                // column: j,
                // className: 'water',
                // type: blockType,
                // // image: blockData.image,
                // background: blockData.background,
                // borderTop: 'none',
                // borderBottom: 'none',
                // borderRight: 'none',
                // borderLeft: 'none',
                // temperature: blockData.temperature,
                // temperatureTextScale: 1,
                // temperatureBackgroundColor: getTemepratureTextBackgroundColor(blockData.temperature),
                // structure: blockData.structure
                }
            } else {
                // const num = Math.floor(Math.random()*buildings.length)
                // const blockType = 'building'
                // const blockData = getBlockData(num, blockType) 

                cells[i][j] = {
                aliveNow: false,
                aliveNext: false,
                liveNeighbours: 0.2,
                opacity: 0,
                // id: i + '-' + j,
                // row: i,
                // column: j,
                // className: 'buildings',
                // type: blockType,
                // // image: blockData.image,
                // background: blockData.background,
                // borderTop: 'none',
                // borderBottom: 'none',
                // borderRight: 'none',
                // borderLeft: 'none',
                // temperature: blockData.temperature,
                // temperatureTextScale: 1,
                // temperatureBackgroundColor: getTemepratureTextBackgroundColor(blockData.temperature),
                // structure: city[Math.floor(Math.random()*city.length)]
                }        
            }
        }
        }    
    }

    function cellIsAliveNextGeneration(){
        //console.log('checking if cell is alive next generation')
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

                if(cells[i][j].aliveNow && cells[i][j].liveNeighbours >= 4){
                    cells[i][j].aliveNext = true
                } else {
                    cells[i][j].aliveNext = false
                }

                cells[i][j].opacity = (cells[i][j].liveNeighbours + 0.5)/9

            }
        }
    }

    function resetGeneration(){
        // console.log('resetting generation data')
        for(let i=0; i<cells.length; i++){
            for(let j=0; j<cells[i].length; j++){  
                cells[i][j].aliveNow = cells[i][j].aliveNext
            }
        }
    }

    generateCells(widthNum, widthNum)
    for(let i=0; i<3; i++){
        cellIsAliveNextGeneration()
        resetGeneration()
    }

</script>

<div class='watercontainer' style='width:{width}px; height: {width}px; grid-template-columns: repeat({widthNum}, {Math.floor(width / widthNum)}px);'>
    <!-- <p>{width}</p> -->
    {#each cells as cell}
        {#each cell as {opacity}}
            <div style='width: {Math.floor(width / widthNum)}px; height: {Math.floor(width / widthNum)}px; opacity: {opacity}' class='water'></div>
        {/each}
    {/each}
</div>

<style>
    .watercontainer{
        /* position: absolute; */
        /* left: 0; */
        display: grid;
        
        background: #b7dbff;
        /* border: 2px solid #f9f9f9; */
    }
    .water{
        /* background: #dbedff; */
        border-radius: 50%;
        background: #3d9eff;
    }
</style>
