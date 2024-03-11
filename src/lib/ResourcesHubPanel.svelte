<script>
    import { onMount } from "svelte";
    import { getFileLogoURL } from '$lib/utils'
    import { bgColor, textColor, height, resourcesPanelDisplay } from "./store";
    import DetailsCard from "./DetailsCard.svelte";
    import DetailsDocsCard from "./DetailsDocsCard.svelte";
    import PuzzlePieceSvg from "./PuzzlePieceSVG.svelte";
    // let data
    let tutorialsListData = null, challengesListData = null;
    let tutorialData = null, challengeData = null, docsData = null;
    let button, dataPanelDisplay = 'none';

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

    onMount(()=>{
        async function fetchAllData(){
            let tutorialsData = await fetch(`/api/tutorials/`)
            tutorialsListData = await tutorialsData.json();
            let challengesData = await fetch(`/api/challenges/`)
            challengesListData = await challengesData.json();
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
    <div class='container'>
        <details style='border: none; border-bottom: 1px solid hsl({$textColor + ', 20%'});'>
            <summary>Docs</summary>
                <div style='width: 100%; display: flex; flex-direction: column; border: none; border-bottom: 1px solid hsl({$textColor + ', 20%'}); padding: 10px 0;'>
                    <div style='display: flex; width: 100%;'>
                        <img src={getFileLogoURL('html')} alt='logo' style='width: 20px'/>        
                        <h3 style='margin: 0 5px; color: hsl({$textColor});'>html</h3>
                    </div>
                    <!-- <code style='width: fit-content; max-width: 50%; margin: 10px 0; background: hsl({$textColor + ', 20%'}); color: hsl({$textColor});'>{challenge.date}</code> -->
                    <button class='tutorialFetchButton' style='color: hsl({$textColor});' on:click={()=>{tutorialData = null; challengeData = null; fetchData('docs', 'html')}}>more &gt;</button>
                </div>

                <div style='width: 100%; display: flex; flex-direction: column; border: none; border-bottom: 1px solid hsl({$textColor + ', 20%'}); padding: 10px 0;'>
                    <div style='display: flex; width: 100%;'>
                        <img src={getFileLogoURL('css')} alt='logo' style='width: 20px'/>        
                        <h3 style='margin: 0 5px; color: hsl({$textColor});'>css</h3>
                    </div>
                    <!-- <code style='width: fit-content; max-width: 50%; margin: 10px 0; background: hsl({$textColor + ', 20%'}); color: hsl({$textColor});'>{challenge.date}</code> -->
                    <button class='tutorialFetchButton' style='color: hsl({$textColor});' on:click={()=>{tutorialData = null; challengeData = null; fetchData('docs', 'css')}}>more &gt;</button>
                </div>
        </details>

        {#if challengesListData}
            <details style='border: none; border-bottom: 1px solid hsl({$textColor + ', 20%'});'>
                <summary>Challenges</summary>
                {#each challengesListData as challenge}
                    <div style='width: 100%; display: flex; flex-direction: column; border: none; border-bottom: 1px solid hsl({$textColor + ', 20%'}); padding: 10px 0;'>
                        <!-- <div class='logosContainer' style='background: none;'>
                        {#each tutorial.technologies as technology}
                            <img src={getFileLogoURL(technology)} alt='logo' style='width: 20px'/>        
                        {/each}
                        </div> -->

                        <h3 style='margin: 0; color: hsl({$textColor});'>{challenge.heading}</h3>
                        <code style='width: fit-content; max-width: 50%; margin: 10px 0; background: hsl({$textColor + ', 20%'}); color: hsl({$textColor});'>{challenge.date}</code>
                        <button class='tutorialFetchButton' style='color: hsl({$textColor});' on:click={()=>{tutorialData = null; challengeData = null; fetchData('challenges', challenge.id)}}>more &gt;</button>
                    </div>
                {/each}
            </details>
        {:else}
            <div class='loaderDiv' style='background: hsl({$textColor + ', 20%'})'>
                <!-- <PuzzlePieceSvg /> -->
            </div>
        {/if}

        {#if dataPanelDisplay === 'none'}
            {#if tutorialsListData}
            <details style='border: none; border-bottom: 1px solid hsl({$textColor + ', 20%'}); margin-bottom: 10px;'>
                <summary>Tutorials</summary>
                {#each tutorialsListData as tutorial}
                    <div style='width: 100%; display: flex; flex-direction: column; border: none; border-bottom: 1px solid hsl({$textColor + ', 20%'}); padding: 10px 0;'>
                        <div class='logosContainer' style='background: none;'>
                        {#each tutorial.technologies as technology}
                            <img src={getFileLogoURL(technology)} alt='logo' style='width: 20px'/>        
                        {/each}
                        </div>

                        <h3 style='margin: 0; color: hsl({$textColor});'>{tutorial.heading}</h3>
                        <code style='width: fit-content; max-width: 50%; margin: 10px 0; background: hsl({$textColor + ', 20%'}); color: hsl({$textColor});'>{tutorial.courseName}</code>
                        <button class='tutorialFetchButton' style='color: hsl({$textColor});' on:click={()=>{challengeData = null; tutorialData = null; fetchData('tutorials', tutorial.id)}}>more &gt;</button>
                    </div>
                {/each}
            </details>
            {:else}
                <div class='loaderDiv' style='width: 80%; background: hsl({$textColor + ', 20%'})'>
                <!-- <PuzzlePieceSvg /> -->
                </div>
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
                                <!-- <h3>{tutorialData.heading}</h3> -->
                            {/each}
                        </div>    
                {:else}
                    <div class='loaderDiv' style='width: 90%; background: hsl({$textColor + ', 20%'})'></div>
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
        .container{
            width: 100%;
            height: calc(100% - 40px);
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
            width: fit-content;
            margin: 0;
            padding: 0;
            text-decoration: underline;
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