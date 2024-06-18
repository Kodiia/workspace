<script>
	import { onMount } from 'svelte';
	import { PUBLIC_AI_API_URL } from '$env/static/public'
	import { getFileLogoURL } from '$lib/utils';
	import {
		bgColor,
		textColor,
		secondaryColor,
		primaryColor,
		accentColor,
		height,
		resourcesPanelDisplay
	} from './store';
	import DetailsCard from './DetailsCard.svelte';
	import DetailsDocsCard from './DetailsDocsCard.svelte';
	import StyledModelResponse from './StyledModelResponse.svelte';

	/**
	 * @type {null}
	 */
	let tutorialsListData = null,
		challengesListData = null;
	/**
	 * @type {{ heading: any; stepsJSON: { steps: any; }; } | null | undefined}
	 */
	let tutorialData = null,
		challengeData = null,
		modelAnswer = '',
		errMessage = '';
	let button,
		dataPanelDisplay = 'none';
	/**
	 * @type {HTMLInputElement}
	 */
	let queryInput;
	/**
	 * @type {any[]}
	 */
	let queries = [],
		answers = [];

	async function fetchData(type = '', idOrDocsType = '') {
		dataPanelDisplay = 'block';
		let data = await fetch(`/api/${type}/${idOrDocsType}`);
		switch (type) {
			case 'tutorials':
				tutorialData = await data.json();
				break;
			case 'challenges':
				challengeData = await data.json();
				break;
		}
	}

	let isFetchingRequest = false;
	async function fetchSearchRequest(query = '') {
		try {
			isFetchingRequest = true;
			// const answerData = await fetch(`/api/transformers/rag/${query}`);
			const answerData = await fetch(`${PUBLIC_AI_API_URL}/${query}`);
			const answerDataObject = await answerData.json();
			modelAnswer = answerDataObject;
			answers = [...answers, modelAnswer];
			console.log(answers);
			isFetchingRequest = false;
		} catch (err) {
			errMessage = `Something went wrong. ${err}`;
			console.log(err);
		}
	}

	onMount(() => {
		async function fetchAllData() {
			let tutorialsData = await fetch(`/api/tutorials/`);
			tutorialsListData = await tutorialsData.json();
			for (let data of tutorialsListData) {
				data.isHovered = false;
			}
			let challengesData = await fetch(`/api/challenges/`);
			challengesListData = await challengesData.json();
			for (let data of challengesListData) {
				data.isHovered = false;
			}
		}
		fetchAllData();
	});

	function updateTextareaHeight() {
		queryInput.style.height = `auto`;
		queryInput.style.height = `${queryInput.scrollHeight}px`;
	}

	function submitForm() {
		tutorialData = null;
		challengeData = null;
		queries = [...queries, queryInput.value];
		fetchSearchRequest(queryInput.value);
		updateRequestsNumber();
		updateTextareaHeight()
	}

	let requestsNumber = '';
	async function getRequestsNumber() {
		const number = await fetch(`/api/user/requests/get`);
		const numberData = await number.json();
		requestsNumber = numberData.requests;
	}
	async function updateRequestsNumber() {
		await fetch(`/api/user/requests/update`);
		getRequestsNumber();
	}

	getRequestsNumber();
</script>

<div
	class="panel"
	style="height: calc({$height}px - 60px); background: hsl({$bgColor}); border: 1px solid hsl({$textColor +
		', 20%'})"
>
	<button
		bind:this={button}
		class="panelButton"
		on:click={() => {
			$resourcesPanelDisplay = 'none';
		}}
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 19.02 19.02"
			><title>icon_quit</title><line
				x1="0.5"
				y1="0.5"
				x2="18.52"
				y2="18.52"
				style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"
			/><line
				x1="0.5"
				y1="18.52"
				x2="18.52"
				y2="0.5"
				style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"
			/></svg
		>
	</button>

	<h3 style="color: hsl({$textColor}); margin: 0; height: 40px;">Resources</h3>

	<!-- <h3
		style="border: none; border-bottom: 1px solid hsl({$textColor +
			', 20%'}); color: hsl({$textColor}); margin: 0; height: 40px;"
	>
		Answer
	</h3> -->

	<div class="container">
		{#each answers as answer, i}
			<p class="query" style="color: hsl({$textColor}); background: hsl({$textColor + ', 10%'});">
				{queries[i]}
			</p>
			<StyledModelResponse htmlContent={answer} />
		{/each}

		{#if isFetchingRequest}
			<div
				class="loaderDiv"
				style="margin-top: 10px; width: 90%; background: hsl({$textColor + ', 20%'})"
			></div>
			<div class="loaderDiv" style="width: 90%; background: hsl({$textColor + ', 20%'})"></div>
			<div class="loaderDiv" style="width: 70%; background: hsl({$textColor + ', 20%'})"></div>
		{/if}

		<div class="searchInputContainer">
			<form
				class="searchForm"
				style="background: hsl({$secondaryColor}); border: 1px solid hsl({$textColor + ', 10%'})"
				on:submit|preventDefault={submitForm}
			>
				<textarea
					bind:this={queryInput}
					on:input={updateTextareaHeight}
					style="color: hsl({$textColor}); "
					placeholder="Ask anything..."
				></textarea>

				<button
					type="submit"
					disabled={isFetchingRequest}
					style="color: hsl({$textColor}); border-left: 1px solid hsl({$textColor + ', 20%'});"
				>
					<svg width="20" height="20">
						<!-- <path d="M5,2 L20,10 L5,18 Z" fill="hsl({$textColor + ', 50%'})" /> -->
						<path d="M5,2 L15,10 L5,18 " fill="none" stroke='hsl({$textColor + ', 50%'})' stroke-width='2'/>
					</svg>
				</button>
			</form>
			<p style="font-size: 0.9rem;">AI requests remained: {requestsNumber}</p>
			<div class="useCasesContainer">
				<button
					style="color: hsl({$textColor}); border: 1px solid hsl({$textColor + ', 20%'});"
					disabled={isFetchingRequest}
					on:click={() => {
						queryInput.value = 'How do I create a 2D city simulation game?';
						submitForm();
					}}>🎮 How do i create a 2D city simulation game?</button
				>
				<button
					style="color: hsl({$textColor}); border: 1px solid hsl({$textColor + ', 20%'});"
					disabled={isFetchingRequest}
					on:click={() => {
						queryInput.value = 'How do i create an interactive 3D scene for architecture project?';
						submitForm();
					}}>🏗️ How do i create an interactive 3D scene for architecture project?</button
				>
				<button
					style="color: hsl({$textColor}); border: 1px solid hsl({$textColor + ', 20%'});"
					disabled={isFetchingRequest}
					on:click={() => {
						queryInput.value = 'How do i create a generative art piece?';
						submitForm();
					}}>🎨 How do i create a generative art piece?</button
				>
			</div>
		</div>

		{#if dataPanelDisplay === 'none'}
			{#if challengesListData && tutorialsListData}
				<details style="border: none; border-bottom: 1px solid hsl({$textColor + ', 20%'});">
					<summary>Challenges</summary>
					{#each challengesListData as challenge}
						<button
							class="tutorialFetchButton"
							style="color: hsl({$textColor}); border-bottom: 1px solid hsl({challenge.isHovered
								? $primaryColor
								: $textColor + ', 20%'});"
							on:click={() => {
								tutorialData = null;
								challengeData = null;
								fetchData('challenges', challenge.id);
							}}
							on:pointerenter={() => {
								challenge.isHovered = true;
							}}
							on:pointerleave={() => {
								challenge.isHovered = false;
							}}
						>
							{#each challenge.technologies as technology}
								<img src={getFileLogoURL(technology)} alt="logo" style="width: 20px" />
							{/each}
							<h3 style="margin: 0; color: hsl({$textColor});">{challenge.heading}</h3>
							<code
								style="width: fit-content; max-width: 50%; margin: 10px 0; background: hsl({$textColor +
									', 20%'}); color: hsl({$textColor});">{challenge.date}</code
							>
						</button>
					{/each}
				</details>

				<details
					style="border: none; border-bottom: 1px solid hsl({$textColor +
						', 20%'}); margin-bottom: 10px;"
				>
					<summary>Tutorials</summary>
					{#each tutorialsListData as tutorial}
						<button
							class="tutorialFetchButton"
							style="color: hsl({$textColor}); border-bottom: 1px solid hsl({tutorial.isHovered
								? $primaryColor
								: $textColor + ', 20%'});"
							on:click={() => {
								challengeData = null;
								tutorialData = null;
								fetchData('tutorials', tutorial.id);
							}}
							on:pointerenter={() => {
								tutorial.isHovered = true;
							}}
							on:pointerleave={() => {
								tutorial.isHovered = false;
							}}
						>
							<div class="logosContainer" style="background: none;">
								{#each tutorial.technologies as technology}
									<img src={getFileLogoURL(technology)} alt="logo" style="width: 20px" />
								{/each}
							</div>
							<h3 style="margin: 0; color: hsl({$textColor});">{tutorial.heading}</h3>
							<code
								style="width: fit-content; max-width: 50%; margin: 10px 0; background: hsl({$textColor +
									', 20%'}); color: hsl({$textColor});">{tutorial.courseName}</code
							>
						</button>
					{/each}
				</details>
			{:else}
				<div class="loaderDiv" style="background: hsl({$textColor + ', 20%'})"></div>
				<div class="loaderDiv" style="width: 90%; background: hsl({$textColor + ', 20%'})"></div>
				<div class="loaderDiv" style="width: 70%; background: hsl({$textColor + ', 20%'})"></div>
			{/if}
		{:else}
			<div
				class="dataPanel"
				style="display: {dataPanelDisplay}; background: hsl({$bgColor}); border: 1px solid hsl({$textColor +
					', 20%'});"
			>
				<button
					bind:this={button}
					class="panelButton"
					on:click={() => {
						dataPanelDisplay = 'none';
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 19.02 19.02"
						><title>icon_quit</title><line
							x1="0.5"
							y1="0.5"
							x2="18.52"
							y2="18.52"
							style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"
						/><line
							x1="0.5"
							y1="18.52"
							x2="18.52"
							y2="0.5"
							style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"
						/></svg
					>
				</button>
				{#if tutorialData != undefined}
					<h3
						style="border: none; border-bottom: 1px solid hsl({$textColor +
							', 20%'}); color: hsl({$textColor}); margin: 0; height: 40px;"
					>
						{tutorialData.heading}
					</h3>
					<div class="stepsWrapper">
						{#each tutorialData.stepsJSON.steps as step, i}
							<DetailsCard id={i} {step} />
							<!-- <h3>{tutorialData.heading}</h3> -->
						{/each}
					</div>
				{:else if challengeData != undefined}
					<h3
						style="border: none; border-bottom: 1px solid hsl({$textColor +
							', 20%'}); color: hsl({$textColor}); margin: 0; height: 40px;"
					>
						{challengeData.heading}
					</h3>
					<div class="stepsWrapper">
						{#each challengeData.stepsJSON.steps as step, i}
							<DetailsCard id={i} {step} />
							<!-- <h3>{tutorialData.heading}</h3> -->
						{/each}
					</div>
				{:else}
					<div class="loaderDiv" style="width: 90%; background: hsl({$textColor + ', 20%'})"></div>
					<div class="loaderDiv" style="width: 90%; background: hsl({$textColor + ', 20%'})"></div>
					<div class="loaderDiv" style="width: 70%; background: hsl({$textColor + ', 20%'})"></div>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	h3 {
		color: white;
		font-weight: 300;
	}
	.panel {
		width: 100%;
		position: relative;
		background: #fdfdfd;
		background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
		backdrop-filter: blur(25px);
		-webkit-backdrop-filter: blur(25px);
		border-radius: 15px;
		padding: 10px 10px 10px 10px;
		box-sizing: border-box;
		transition: all 0.25s;
	}
	.panelButton {
		position: absolute;
		top: 5px;
		right: 0px;
		margin-right: 5px;

		display: flex;
		align-items: center;
		justify-content: center;

		width: 20px;
		height: 20px;
		border-radius: 10px;
		border: none;
		background: #4233fb00;
		color: white;
		box-sizing: content-box;
		padding: 0;

		cursor: pointer;
		transition: 0.25s;
	}
	.panelButton:hover {
		background: #4233fb20;
	}
	form {
		box-sizing: border-box;
		transition: all 0.25s;
	}
	textarea {
		background: none;
		width: 100%;
		/* height: 40px; */
		box-sizing: border-box;
		margin: 0;
		transition: all 0.25s;
		font-family:
			Source Code Pro,
			sans-serif;
		font-size: 1rem;
		font-weight: 300;
		border: none;
		border-radius: 10px 0 0 10px;
		padding: 10px;
		box-sizing: border-box;
		resize: none;
	}
	textarea:focus {
		outline: none !important;
	}
	.searchInputContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		/* height: 40px; */
		margin-bottom: 10px;
	}
	.searchForm {
		display: flex;
		width: 100%;
		border-radius: 10px;
		padding: 5px;
		box-sizing: border-box;
	}
	.searchForm button {
		flex: 0 0 40px;
		width: fit-content;
		background: none;
		border: none;
		border-radius: 0;
		display: flex;
		justify-content: end;
		align-items: center;
		width: 100%;
	}

	.useCasesContainer {
		width: 100%;
	}
	.useCasesContainer button {
		border: none;
		background: none;
		margin: 5px 0;
		text-align: left;
		width: fit-content;
	}

	/* .buttonWrapper {
		width: fit-content;
		height: 40px;
		margin: 0;
		padding: 2px;
		box-sizing: border-box;
		border-radius: 0 10px 10px 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.buttonWrapper button {
		background: none;
		border: none;
		border-radius: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	} */

	.container {
		width: 100%;
		height: calc(100% - 40px);
		padding-right: 5px;
		box-sizing: border-box;
		position: relative;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
	}
	details summary {
		cursor: pointer;
		padding: 10px 0;
	}
	.dataPanel {
		position: relative;
		width: 100%;
		z-index: 2;
		border-radius: 10px;
		padding: 10px;
		box-sizing: border-box;
		transition: all 0.25s;
	}
	.stepsWrapper {
		width: 100%;
		max-height: calc(100% - 40px);
		box-sizing: border-box;
		padding: 0;
	}
	.logosContainer {
		width: 100%;
	}
	.tutorialFetchButton {
		border: none;
		width: 100%;
		margin: 0;
		padding: 10px 0;
		text-align: left;
		font-family: Montserrat, sans-serif;
		border-radius: 0;
		box-sizing: border-box;
	}
	.tutorialFetchButton:hover {
		background: none;
	}
	.loaderDiv {
		width: 100%;
		min-height: 10px;
		border-radius: 10px;
		animation: load 2s infinite;
		margin-bottom: 10px;
	}

	@keyframes load {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	.query {
		width: fit-content;
		align-self: flex-end;
		margin: 0;
		padding: 10px;
		padding-right: 20px;
		border-radius: 10px 10px 0 10px;
		box-sizing: border-box;
		text-align: right;
	}
</style>
