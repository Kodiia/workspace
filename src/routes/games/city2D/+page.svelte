<script>
    import concrete1 from '$lib/images/games/concrete1.webp'
    import concrete2 from '$lib/images/games/concrete2.webp'
    import concrete3 from '$lib/images/games/concrete3.webp'
    import wood1 from '$lib/images/games/wood1.webp'


    let cells = []
    let houses = [concrete1, concrete2, concrete3, wood1]
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
                className: className,
                image: concrete1
                }
            } else {
                cells[i][j] = {
                aliveNow: false,
                aliveNext: false,
                liveNeighbours: 0,
                // element: `<div class='asphalt'></div>`,
                className: 'asphalt',
                image: false
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
                cells[i][j].className = 'block',
                cells[i][j].image = houses[Math.floor(Math.random()*houses.length)]
                } else {
                // cells[i][j].element = `<div class='asphalt'></div>`
                cells[i][j].className = 'asphalt'
                cells[i][j].image = false
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
</script>


<nav>
    <button class='button'>Stats</button>
    <button class='button'>Challenges</button>
    <button class='button' on:click={generationLoop}>Next Generation</button>
</nav>
<!-- <h1>city building game</h1> -->
<div bind:this={gridContainer} class='gridContainer'>
{#each cells as cell}
    {#each cell as {className, image}}
        <div class={className}>
            {#if image}
                <img src={image} alt='house' class='image'/>
            {/if}
        </div>
    {/each}
{/each}
</div>

<style>
    nav{
        width: 100%;
        display: flex;
        margin-bottom: 10px;
    }
    .button{
        margin-right: 5px;
    }
    .gridContainer{
        display: grid;
        grid-template-columns: repeat(10, 200px);
        background: black;
    }
    /* .concrete0{
        border: 20px solid black;
        width: 200px;
        height: 200px;
        box-sizing: border-box;
        background: lightGrey;
        background-image: url('https://cdn.glitch.global/d5e3fc9c-4f11-4448-b74e-ec64c5193369/Alina_SA_lab_None_b7ed2e2a-cf01-411f-a74a-ac6b15703150.png?v=1689943927578');
        background-size: contain;
    }
    .concrete1{
        border: 20px solid black;
        border-radius: 50px;
        width: 200px;
        height: 200px;
        box-sizing: border-box;
        background: lightGrey;
        background-image: url('https://cdn.glitch.global/d5e3fc9c-4f11-4448-b74e-ec64c5193369/Alina_SA_lab_None_3372da37-44a2-42cf-975b-8d1865c62c8e.png?v=1689943927051');
        background-size: contain;
    }
    .concrete2{
        border: 20px solid black;
        width: 200px;
        height: 200px;
        box-sizing: border-box;
        background: lightGrey;
        background-image: url('https://cdn.glitch.global/d5e3fc9c-4f11-4448-b74e-ec64c5193369/Alina_SA_lab_None_1712a3ea-9f8c-469a-b554-4b40f63acc6b.png?v=1689943926424');
        background-size: contain;
    }
    .concrete3{
        border: 20px solid black;
        width: 200px;
        height: 200px;
        box-sizing: border-box;
        background: lightGrey;
        background-image: url('https://cdn.glitch.global/d5e3fc9c-4f11-4448-b74e-ec64c5193369/Alina_SA_lab_None_8d9bcc65-3ed6-4a57-ab1e-6038247dec9f.png?v=1689943925838');
        background-size: contain;
    } */

    .asphalt{
        /* border: 20px solid black;
        border-radius: 50px; */
        width: 200px;
        height: 200px;
        box-sizing: border-box;
        background: black;
    }

    .image{
        width: 100%;
        height: 100%;
        margin: 20px;
        background: lightgrey;
        border-radius: 50px;
    }

    .block{
        /* border: 20px solid black;
        border-radius: 50px; */
        width: 200px;
        height: 200px;
        box-sizing: border-box;
        background: black;
    }
</style>