<script>
    import { onMount } from "svelte";
    import { getFileLogoURL } from '$lib/utils'
    import { bgColor, textColor, secondaryColor, primaryColor, accentColor, height, resourcesPanelDisplay } from "./store";
    import DetailsCard from "./DetailsCard.svelte";
    import DetailsDocsCard from "./DetailsDocsCard.svelte";
    // import PuzzlePieceSvg from "./PuzzlePieceSVG.svelte";
    // let data
    let tutorialsListData = null, challengesListData = null;
    let tutorialData = null, challengeData = null, docsData = null;
    let searchInput, searchData = null;
    let button, dataPanelDisplay = 'none';

    let technologies = [
        {name: 'html', isHovered: false, heading: 'HTML', description: 'HyperText Markup Language is the markup language used to create web pages.'}, 
        {name: 'css', isHovered: false, heading: 'CSS', description: 'Cascading Style Sheets is a stylesheet language used to describe the styling of an HTML document.'}, 
        {name: 'javascript', isHovered: false, heading: 'JavaScript', description: 'JavaScript is a dynamic, interpreted programming language primarily used for enhancing interactivity and functionality on web pages.'}, 
        {name: 'p5js', isHovered: false, heading: 'p5.js', description: 'p5.js is a JavaScript library designed for creative coding.'}, 
        {name: 'threejs', isHovered: false, heading: 'three.js', description: 'Three.js is a JavaScript library used to create and display animated 3D computer graphics in a web browser using WebGL.'}, 
        {name: 'brainjs', isHovered: false, heading: 'brain.js', description: 'Brain.js is a JavaScript library designed for neural networking.'}
    ]

    async function fetchData(type = '', idOrDocsType = ''){
        dataPanelDisplay = 'block';
        let data = await fetch(`/api/${type}/${idOrDocsType}`)
        switch (type){
            case 'tutorials':
                tutorialData = await data.json();
            break;
            case 'challenges':
                challengeData = await data.json();
            break;
            case 'docs':
                docsData = await data.json();
            break;
        }
        
    }

    async function fetchSearchRequest(query = ''){
        console.log(query)
        let data = await fetch(`/api/search/${query}`)
        searchData = await data.json();
        console.log(searchData.docsSearchResult)
    }

    onMount(()=>{
        async function fetchAllData(){
            let tutorialsData = await fetch(`/api/tutorials/`)
            tutorialsListData = await tutorialsData.json();
            for(let data of tutorialsListData){
                data.isHovered = false
            }
            let challengesData = await fetch(`/api/challenges/`)
            challengesListData = await challengesData.json();
            for(let data of challengesListData){
                data.isHovered = false
            }
        }
        fetchAllData()
    })

    let SVGwidth = 30

    
</script>

<div class='panel' style='height: calc({$height}px - 60px); background: hsl({$bgColor}); border: 1px solid hsl({$textColor + ', 20%'})'>
    <button bind:this={button} class="panelButton" on:click={()=>{$resourcesPanelDisplay = 'none';}} >
        <svg xmlns="http://www.w3.org/2000/svg" width='10' height='10' viewBox="0 0 19.02 19.02"><title>icon_quit</title><line x1="0.5" y1="0.5" x2="18.52" y2="18.52" style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/><line x1="0.5" y1="18.52" x2="18.52" y2="0.5" style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/></svg>
    </button>

    <h3 style='color: hsl({$textColor}); margin: 0; height: 40px;'>Resources</h3>
    <div class='searchInputContainer'>
        <input bind:this = {searchInput} style='background: hsl({$secondaryColor}); color: hsl({$textColor});' placeholder='Ask anything. What are you stuck on?' />
        <div class='buttonWrapper' style='background: linear-gradient(hsl({$primaryColor}), hsl({$accentColor}))'>
            <button type="button" on:click={()=>{tutorialData = null; challengeData = null; docsData = null; searchData = null; fetchSearchRequest(searchInput.value); dataPanelDisplay = 'block';}} style='background: hsl({$bgColor}); color: hsl({$textColor});'>Search</button>
        </div>
    </div>
    <div class='container'>
        

        {#if dataPanelDisplay === 'none'}

        {#if challengesListData && tutorialsListData}
        <details style='border: none; border-bottom: 1px solid hsl({$textColor + ', 20%'});'>
            <summary>Hints</summary>
            <div style='width: 100%; display: flex; flex-direction: column; border: none; border-bottom: 1px solid hsl({$textColor + ', 20%'}); padding: 10px 0;'>
            {#each technologies as technology}
                <div style='display: flex; width: 100%;'>
                    <button class='tutorialFetchButton' style='color: hsl({$textColor}); border-bottom: 1px solid hsl({technology.isHovered ? $primaryColor : $textColor + ', 20%'})' on:click={()=>{tutorialData = null; challengeData = null; docsData = null; searchData = null; fetchData('docs', technology.name)}} on:pointerenter={()=>{technology.isHovered = true}} on:pointerleave={()=>{technology.isHovered = false}}>
                        <img src={getFileLogoURL(technology.name)} alt='logo' style='width: 20px'/>        
                        <p style='margin: 0 5px; color: hsl({$textColor});'>{technology.heading}</p>
                        <div style='border-radius: 5px; padding: 5px; font-size: 1rem; margin: 10px 0; background: hsl({$textColor + ', 20%'}); color: hsl({$textColor});'><p style='font-family: Source Code Pro, sans-serif; margin: 0;'>{technology.description}</p></div>
                    </button>
                </div>
            {/each}
        </div>
        </details>

            <details style='border: none; border-bottom: 1px solid hsl({$textColor + ', 20%'});'>
                <summary>Challenges</summary>
                {#each challengesListData as challenge}
                   
                        <button class='tutorialFetchButton' style='color: hsl({$textColor}); border-bottom: 1px solid hsl({challenge.isHovered ? $primaryColor : $textColor + ', 20%'});' 
                        on:click={()=>{tutorialData = null; challengeData = null; searchData = null; docsData = null; fetchData('challenges', challenge.id)}} 
                        on:pointerenter={()=>{challenge.isHovered = true}} 
                        on:pointerleave={()=>{challenge.isHovered = false}}
                        >
                            {#each challenge.technologies as technology}
                            <img src={getFileLogoURL(technology)} alt='logo' style='width: 20px'/> 
                            {/each}
                            <h3 style='margin: 0; color: hsl({$textColor});'>{challenge.heading}</h3>
                            <code style='width: fit-content; max-width: 50%; margin: 10px 0; background: hsl({$textColor + ', 20%'}); color: hsl({$textColor});'>{challenge.date}</code>
                        </button>
                    
                {/each}
            </details>

            <details style='border: none; border-bottom: 1px solid hsl({$textColor + ', 20%'}); margin-bottom: 10px;'>
                <summary>Tutorials</summary>
                {#each tutorialsListData as tutorial}
                    <button class='tutorialFetchButton' style='color: hsl({$textColor}); border-bottom: 1px solid hsl({tutorial.isHovered ? $primaryColor : $textColor + ', 20%'});' 
                    on:click={()=>{challengeData = null; tutorialData = null; searchData = null; docsData = null; fetchData('tutorials', tutorial.id)}}
                    on:pointerenter={()=>{tutorial.isHovered = true}} 
                    on:pointerleave={()=>{tutorial.isHovered = false}}
                    >
                    <div class='logosContainer' style='background: none;'>
                        {#each tutorial.technologies as technology}
                            <img src={getFileLogoURL(technology)} alt='logo' style='width: 20px'/>        
                        {/each}
                    </div>
                    <h3 style='margin: 0; color: hsl({$textColor});'>{tutorial.heading}</h3>
                    <code style='width: fit-content; max-width: 50%; margin: 10px 0; background: hsl({$textColor + ', 20%'}); color: hsl({$textColor});'>{tutorial.courseName}</code>
                    </button>
                {/each}
            </details>
        {:else}
            <div class='loaderDiv' style='background: hsl({$textColor + ', 20%'})'></div>
            <div class='loaderDiv' style='width: 90%; background: hsl({$textColor + ', 20%'})'></div>
            <div class='loaderDiv' style='width: 70%; background: hsl({$textColor + ', 20%'})'></div>
        {/if}
            
        {:else}
            <div class='dataPanel' style='display: {dataPanelDisplay}; background: hsl({$bgColor}); border: 1px solid hsl({$textColor + ", 20%"});'>
                <button bind:this={button} class="panelButton" on:click={()=>{dataPanelDisplay = 'none';}} >
                    <svg xmlns="http://www.w3.org/2000/svg" width='10' height='10' viewBox="0 0 19.02 19.02"><title>icon_quit</title><line x1="0.5" y1="0.5" x2="18.52" y2="18.52" style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/><line x1="0.5" y1="18.52" x2="18.52" y2="0.5" style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"/></svg>
                </button>
                {#if tutorialData != undefined}
                    <h3 style='border: none; border-bottom: 1px solid hsl({$textColor + ', 20%'}); color: hsl({$textColor}); margin: 0; height: 40px;'>{tutorialData.heading}</h3>
                    <div class='stepsWrapper'>
                        {#each tutorialData.stepsJSON.steps as step, i}
                            <DetailsCard id={i} step={step} />
                            <!-- <h3>{tutorialData.heading}</h3> -->
                        {/each}
                    </div>    
                {:else if challengeData != undefined}
                    <h3 style='border: none; border-bottom: 1px solid hsl({$textColor + ', 20%'}); color: hsl({$textColor}); margin: 0; height: 40px;'>{challengeData.heading}</h3>
                    <div class='stepsWrapper'>
                        {#each challengeData.stepsJSON.steps as step, i}
                            <DetailsCard id={i} step={step} />
                            <!-- <h3>{tutorialData.heading}</h3> -->
                        {/each}
                    </div>  
                {:else if docsData != undefined}
                    <h3 style='border: none; border-bottom: 1px solid hsl({$textColor + ', 20%'}); color: hsl({$textColor}); margin: 0; height: 40px;'>{docsData[0].technology}</h3>
                    <div class='stepsWrapper'>
                        {#each docsData as docData, i}
                            <DetailsDocsCard id={i} docData={docData} />                           
                        {/each}
                    </div>    
                {:else if searchData != undefined}
                    <h3 style='border: none; border-bottom: 1px solid hsl({$textColor + ', 20%'}); color: hsl({$textColor}); margin: 0; height: 40px;'>{searchInput.value}</h3>
                    <div class='stepsWrapper'>
                        {#if searchData.docsSearchResult.items.length > 0}
                            {#each searchData.docsSearchResult.items as result, i}
                                <DetailsDocsCard id={i} docData={result} />
                            {/each}
                        {/if}
                        {#if searchData.challengesSearchResult.length > 0}
                        {#each searchData.challengesSearchResult as challenge, i}
                            <button class='tutorialFetchButton' style='color: hsl({$textColor}); border-bottom: 1px solid hsl({challenge.isHovered ? $primaryColor : $textColor + ', 20%'});' 
                            on:click={()=>{tutorialData = null; challengeData = null; searchData = null; docsData = null; fetchData('challenges', challenge.id)}} 
                            on:pointerenter={()=>{challenge.isHovered = true}} 
                            on:pointerleave={()=>{challenge.isHovered = false}}
                            >
                                {#each challenge.technologies as technology}
                                <img src={getFileLogoURL(technology)} alt='logo' style='width: 20px'/> 
                                {/each}
                                <h3 style='margin: 0; color: hsl({$textColor});'>{challenge.heading}</h3>
                                <code style='width: fit-content; max-width: 50%; margin: 10px 0; background: hsl({$textColor + ', 20%'}); color: hsl({$textColor});'>{challenge.date}</code>
                            </button>
                            <!-- <h3>{challenge.heading}{challenge.technologies}</h3> -->
                        {/each}
                        {/if}
                        {#if searchData.docsSearchResult.items.length === 0 && searchData.challengesSearchResult.length === 0 }
                            <p>Nothing is found. Try another query.</p>
                        {/if}
                    </div>  
                {:else}
                    <div class='loaderDiv' style='width: 90%; background: hsl({$textColor + ', 20%'})'></div>
                    <div class='loaderDiv' style='width: 90%; background: hsl({$textColor + ', 20%'})'></div>
                    <div class='loaderDiv' style='width: 70%; background: hsl({$textColor + ', 20%'})'></div>
                {/if}

            </div>
        {/if}
    </div>
</div>

<style>
    h3{
        color: white;
        font-weight: 300;
    }
    .panel{
            width: 100%;
            position: relative;
            background: #fdfdfd;
            background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border-radius: 15px;
            /* box-shadow: 0 0 10px rgba(60, 150, 238, 0.3); */
            padding: 10px 10px 10px 10px;
            /* margin: 10px; */
            box-sizing: border-box;
            transition: all 0.25s;
        }
        .panelButton{
            position: absolute;
            top: 5px;
            right: 0px;
            margin-right: 5px;
            
            display: flex;
            align-items: center;
            justify-content: center;
            /* justify-content: space-between; */
            
            width: 20px;
            height: 20px;
            border-radius: 10px;
            border: none;
            background: #4233fb00;
            /* background: radial-gradient(#ca94ff, #4233fb); */
            color: white;
            box-sizing: content-box;
            padding: 0;
            
            cursor: pointer;
            transition: 0.25s;
        }
        .panelButton:hover{
            background: #4233fb20;
        }
        .contentContainer{
            width: 100%;
            height: 100%;
        }
        input{
            width: 100%;
            height: 40px;
            box-sizing: border-box;
            margin: 0;
            transition: all 0.25s;
            font-family: Source Code Pro, sans-serif;
            font-size: 1rem;
            border: none;
            border-radius: 10px;
            padding: 0 10px;
            box-sizing: border-box;
        }
        .searchInputContainer{
            display: flex;
            align-items: center;
            box-sizing: border-box;
            height: 40px;
            margin-bottom: 10px;
        }

        .buttonWrapper{
            width: fit-content;
            height: 40px;
            margin: 0 0 0 10px;
            padding: 2px;
            box-sizing: border-box;
            border-radius: 10px;
        }
        .buttonWrapper button{
            background: none;
            border: none;
            border-radius: 8px;
        }
    
        .container{
            width: 100%;
            height: calc(100% - 90px);
            padding-right: 5px;
            box-sizing: border-box;
            position: relative;
            overflow-y: auto;
        }
        .detailsDataWrapper{
            width: 100%;
            
        }
        details summary{
            cursor: pointer;
            padding: 10px 0;
        }
        .dataPanel{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            border-radius: 10px;
            padding: 10px;
            box-sizing: border-box;
            transition: all 0.25s;
        }
        .stepsWrapper{
            width: 100%;
            height: calc(100% - 40px);
            box-sizing: border-box;
            overflow-y: scroll;
            padding: 0 10px 0 0;
        }
        .logosContainer{
            width: 100%;
        }
        .tutorialFetchButton{
            border: none;
            width: 100%;
            margin: 0;
            padding: 10px 0;
            text-align: left;
            /* display: flex;
            align-items: center; */
            font-family: Montserrat, sans-serif;
            border-radius: 0;
            box-sizing: border-box;
        }
        .tutorialFetchButton:hover{
            background: none;
        }
        .loaderDiv{
            width: 100%;
            height: 30px;
            border-radius: 10px;
            animation: load 2s infinite;
            margin-bottom: 10px;
        }

        @keyframes load {
            0% {
                opacity: 0;
            }
            50%{
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
</style>