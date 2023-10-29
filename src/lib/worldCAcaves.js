function generateCells(widthNum = 2, depthNum = 2, heightNum = 2){
    let cells = []
    for(let i=0; i<widthNum; i++){
        cells[i] = []
        for(let j=0; j<depthNum; j++){
            cells[i][j] = []
            for(let k=0; k<heightNum; k++){
                const seed = Math.random()
                if(seed > 0.5){
                    cells[i][j][k] = {
                        aliveNow: true,
                        aliveNext: false,
                        liveNeighbors: 0,
                        x: i,
                        y: k, 
                        z: j,
                    }
                } else {
                    cells[i][j][k] = {
                        aliveNow: false,
                        aliveNext: false,
                        liveNeighbors: 0,
                        x: i,
                        y: k, 
                        z: j,
                    }
                }
            }
        }
    }
    // console.log('generated CA world', cells)
    return cells
}


function cellIsAliveNextGeneration(cells){
    for(let i=0; i<cells.length; i++){
        for(let j=0; j<cells[i].length; j++){
            for(let k=0; k<cells[i][j].length; k++){
            cells[i][j][k].liveNeighbors = 0

            if(typeof cells[i-1] != 'undefined'){
                if(typeof cells[i-1][j-1] != 'undefined'){
                    if(typeof cells[i-1][j-1][k-1] != 'undefined' && cells[i-1][j-1][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i-1][j-1][k] != 'undefined' && cells[i-1][j-1][k].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i-1][j-1][k+1] != 'undefined' && cells[i-1][j-1][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                }

                if(typeof cells[i-1][j] != 'undefined'){
                    if(typeof cells[i-1][j][k-1] != 'undefined' && cells[i-1][j][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i-1][j][k] != 'undefined' && cells[i-1][j][k].aliveNow){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborXneg = true
                    } else {
                        cells[i][j][k].aliveNeighborXneg = false
                    }
                    if(typeof cells[i-1][j][k+1] != 'undefined' && cells[i-1][j][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                }

                if(typeof cells[i-1][j+1] != 'undefined'){
                    if(typeof cells[i-1][j+1][k-1] != 'undefined' && cells[i-1][j+1][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i-1][j+1][k] != 'undefined' && cells[i-1][j+1][k].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i-1][j+1][k+1] != 'undefined' && cells[i-1][j+1][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                }
            }

            if(typeof cells[i] != 'undefined'){
                if(typeof cells[i][j-1] != 'undefined'){
                    if(typeof cells[i][j-1][k-1] != 'undefined' && cells[i][j-1][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i][j-1][k] != 'undefined' && cells[i][j-1][k].aliveNow){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborZneg = true
                    } else {
                        cells[i][j][k].aliveNeighborZneg = false
                    }
                    if(typeof cells[i][j-1][k+1] != 'undefined' && cells[i][j-1][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                }

                if(typeof cells[i][j] != 'undefined'){
                    if(typeof cells[i][j][k-1] != 'undefined' && cells[i][j][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborYneg = true
                    } else {
                        cells[i][j][k].aliveNeighborYneg = false
                    }
                    // if(typeof cells[i][j][k] != 'undefined' && cells[i][j][k].aliveNow){
                    //     cells[i][j][k].liveNeighbors++
                    // }
                    if(typeof cells[i][j][k+1] != 'undefined' && cells[i][j][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborYpos = true
                    } else {
                        cells[i][j][k].aliveNeighborYpos = false
                    }
                }

                if(typeof cells[i][j+1] != 'undefined'){
                    if(typeof cells[i][j+1][k-1] != 'undefined' && cells[i][j+1][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i][j+1][k] != 'undefined' && cells[i][j+1][k].aliveNow){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborZpos = true
                    } else {
                        cells[i][j][k].aliveNeighborZpos = false
                    }
                    if(typeof cells[i][j+1][k+1] != 'undefined' && cells[i][j+1][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                }
            }

            if(typeof cells[i+1] != 'undefined'){
                if(typeof cells[i+1][j-1] != 'undefined'){
                    if(typeof cells[i+1][j-1][k-1] != 'undefined' && cells[i+1][j-1][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i+1][j-1][k] != 'undefined' && cells[i+1][j-1][k].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i+1][j-1][k+1] != 'undefined' && cells[i+1][j-1][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                }

                if(typeof cells[i+1][j] != 'undefined'){
                    if(typeof cells[i+1][j][k-1] != 'undefined' && cells[i+1][j][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i+1][j][k] != 'undefined' && cells[i+1][j][k].aliveNow){
                        cells[i][j][k].liveNeighbors++
                        cells[i][j][k].aliveNeighborXpos = true
                    } else {
                        cells[i][j][k].aliveNeighborXpos = false
                    }
                    if(typeof cells[i+1][j][k+1] != 'undefined' && cells[i+1][j][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                }

                if(typeof cells[i+1][j+1] != 'undefined'){
                    if(typeof cells[i+1][j+1][k-1] != 'undefined' && cells[i+1][j+1][k-1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i+1][j+1][k] != 'undefined' && cells[i+1][j+1][k].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                    if(typeof cells[i+1][j+1][k+1] != 'undefined' && cells[i+1][j+1][k+1].aliveNow){
                        cells[i][j][k].liveNeighbors++
                    }
                }
            }

                // if(typeof cells[i-1] != 'undefined' && cells[i-1][j][k].aliveNow){
                //     cells[i][j][k].liveNeighbors++
                //     cells[i][j][k].aliveNeighborXneg = true
                // } else {
                //     cells[i][j][k].aliveNeighborXneg = false
                // }
                // if(typeof cells[i+1] != 'undefined' && cells[i+1][j][k].aliveNow){
                //     cells[i][j][k].liveNeighbors++
                //     cells[i][j][k].aliveNeighborXpos = true
                // } else {
                //     cells[i][j][k].aliveNeighborXpos = false
                // }
                // if(typeof cells[i][j-1] != 'undefined' && cells[i][j-1][k].aliveNow){
                //     cells[i][j][k].liveNeighbors++
                //     cells[i][j][k].aliveNeighborZneg = true
                // } else {
                //     cells[i][j][k].aliveNeighborZneg = false
                // }
                // if(typeof cells[i][j+1] != 'undefined' && cells[i][j+1][k].aliveNow){
                //     cells[i][j][k].liveNeighbors++
                //     cells[i][j][k].aliveNeighborZpos = true
                // } else {
                //     cells[i][j][k].aliveNeighborZpos = false
                // }
                // if(typeof cells[i][j][k-1] != 'undefined' && cells[i][j][k-1].aliveNow){
                //     cells[i][j][k].liveNeighbors++
                //     cells[i][j][k].aliveNeighborYneg = true
                // } else {
                //     cells[i][j][k].aliveNeighborYneg = false
                // }
                // if(typeof cells[i][j][k+1] != 'undefined' && cells[i][j][k+1].aliveNow){
                //     cells[i][j][k].liveNeighbors++
                //     cells[i][j][k].aliveNeighborYpos = true
                // } else {
                //     cells[i][j][k].aliveNeighborYpos = false
                // }

                

            if(cells[i][j][k].liveNeighbors <= 8 || cells[i][j][k].liveNeighbors >= 15){
                cells[i][j][k].aliveNext = false
            } else {
                cells[i][j][k].aliveNext = true
            }
            
            }
        }
    }
    // console.log('checking if cell is alive next gen', cells)
}

function resetGeneration(cells){
    for(let i=0; i<cells.length; i++){
        for(let j=0; j<cells[i].length; j++){
            for(let k=0; k<cells[i][j].length; k++){  
                cells[i][j][k].aliveNow = cells[i][j][k].aliveNext
            }
        }
    }
    // console.log('updating cell current state with next state', cells)
}


export function updateWorld(widthNum = 10, depthNum = 10, heightNum = 10, gens = 3){
    let cells = generateCells(widthNum, depthNum, heightNum)
    // console.log('updating CA world', cells)
    cellIsAliveNextGeneration(cells)

    for(let i = 0; i < gens; i++){
        resetGeneration(cells)
        cellIsAliveNextGeneration(cells)
    }

    // await loadModels().then(()=>{

    // generateCells(widthNum, depthNum, heightNum)
    // cellIsAliveNextGeneration()

    // for(let i=0; i<10; i++){
    //     resetGeneration()
    //     cellIsAliveNextGeneration()
    // }

    // getAssetsData()
    // })

    return cells

}
