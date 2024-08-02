<script>
	import { bgColor, textColor, primaryColor, accentColor, width } from '$lib/store';

	export let project = {};
	console.log(project);

	let isHovered = false,
		isEditButtonHovered = false,
		isShareButtonHovered = false,
		isDeleteButtonHovered = false,
		isDoNotDeleteButtonHovered = false,
		isDeletingProject = false,
		isShared = false,
		isDeleted = false;

	let embedLabelText = 'Embed Code:';
	let copyLinkButtonText = 'Copy Link: ';

	function getProjectEditDate() {
		const dbDate = project.updated;
		const date = dbDate.split('.')[0];

		return date;
	}
	let projectUrl = `https://kodiia.me/projects/${project.id}`;
	let projectTitle = project.name;

	const copyLink = () => {
		navigator.clipboard.writeText(projectUrl);
		copyLinkButtonText = 'Copied!';
		setTimeout(() => {
			copyLinkButtonText = 'Copy Link: ';
		}, 1000);
	};

	const shareOnTwitter = () => {
		window.open(
			`https://twitter.com/intent/tweet?url=${encodeURIComponent(projectUrl)}&text=${encodeURIComponent(projectTitle)}`,
			'_blank'
		);
	};

	const shareOnTelegram = () => {
		window.open(
			`https://telegram.me/share/url?url=${encodeURIComponent(projectUrl)}&text=${encodeURIComponent(projectTitle)}`,
			'_blank'
		);
	};

	const shareOnLinkedIn = () => {
		window.open(
			`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectUrl)}`,
			'_blank'
		);
	};

	const shareViaEmail = () => {
		window.location.href = `mailto:?subject=${encodeURIComponent(projectTitle)}&body=${encodeURIComponent(projectUrl)}`;
	};
</script>

<div
	class="projectWrapper"
	style="border: none; border-bottom: {isHovered
		? `1px solid hsl(${$primaryColor})`
		: `1px solid hsl(${$textColor + ', 20%'})`};"
>
	<div class="projectMenuContainer">
		<div style="width: 100%;">
			<h3>{project.name}</h3>
			<code style="background: hsl({$textColor + ', 20%'}); color: hsl({$textColor});"
				>{getProjectEditDate()}</code
			>
		</div>
		<div class="buttonsMenu">
			<div class="buttonWrapper" style="background: hsl({$textColor})">
				<a
					href="/projects/{project.id}/edit"
					style="background: {isEditButtonHovered
						? 'hsl(' + $bgColor + ', 70%)'
						: 'hsl(' + $bgColor + ')'}; color: hsl({$textColor})"
					on:pointerover={() => {
						isEditButtonHovered = true;
					}}
					on:pointerleave={() => {
						isEditButtonHovered = false;
					}}>Edit</a
				>
			</div>

			<div class="buttonWrapper" style="background: hsl({$textColor})">
				<button
					style="background: {isShareButtonHovered
						? 'hsl(' + $bgColor + ', 70%)'
						: 'hsl(' + $bgColor + ')'}; color: hsl({$textColor}); width: 83px;"
					on:click={() => {
						isShared = !isShared;
					}}
					on:pointerover={() => {
						isShareButtonHovered = true;
					}}
					on:pointerleave={() => {
						isShareButtonHovered = false;
					}}>Share</button
				>
			</div>

			<div class="buttonWrapper" style="background: hsl({$textColor})">
				<button
					style="background: {isDeleteButtonHovered
						? 'hsl(' + $bgColor + ', 70%)'
						: 'hsl(' + $bgColor + ')'}; color: hsl({$textColor}); width: 83px;"
					on:click={() => {
						isDeleted = !isDeleted;
					}}
					on:pointerover={() => {
						isDeleteButtonHovered = true;
					}}
					on:pointerleave={() => {
						isDeleteButtonHovered = false;
					}}>Delete</button
				>
			</div>
		</div>

		
	</div>
</div>
{#if isShared}
			<div class="sharePanelContainer" style="display: {isShared ? 'flex' : 'none'}">
				<div
					class="share-component"
					style="border: 1px solid hsl({$textColor + ', 20%'}); background: hsl({$bgColor});"
				>
					<button
						class="panelButton"
						on:click={() => {
							isShared = false;
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20"
							><title>icon_quit</title><line
								x1="0.5"
								y1="0.5"
								x2="19.5"
								y2="19.5"
								style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"
							/><line
								x1="0.5"
								y1="19.5"
								x2="19.5"
								y2="0.5"
								style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"
							/></svg
						>
					</button>

					<h3>{project.name}</h3>
					<div class="shareButtons">
						<button style="color: hsl({$textColor}); margin-right: 10px;" on:click={shareOnTwitter}
							><svg
								xmlns="http://www.w3.org/2000/svg"
								fill="hsl({$textColor + ', 80%'})"
								width="20"
								height="20"
								viewBox="0 0 300 300"
							>
								<path
									d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"
								/>
							</svg></button
						>
						<button style="color: hsl({$textColor}); margin-right: 10px;" on:click={shareOnTelegram}
							><svg
								width="40"
								height="40"
								viewBox="0 0 52 52"
								fill="hsl({$textColor + ', 80%'})"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M36.3843 15.7006L12.0687 24.9093C10.7376 25.2937 10.7835 26.6076 11.7646 26.9231L17.8579 28.828L20.1873 35.9769C20.4685 36.7572 20.7037 37.0556 21.1856 37.0613C21.6963 37.0671 21.8913 36.8835 22.4192 36.413C23.0388 35.8335 23.9798 34.9155 25.4658 33.4697L31.8058 38.1515C32.9705 38.7941 33.8139 38.4613 34.1065 37.0671L38.0769 17.4104C38.5014 15.7006 37.4974 15.1957 36.3843 15.7006ZM18.816 28.3862L32.6664 19.6939C33.3492 19.2349 33.5614 19.7455 33.2573 20.1013L21.7594 30.446L21.1684 35.6097L18.816 28.3919V28.3862Z"
								></path></svg
							></button
						>
						<button style="color: hsl({$textColor}); margin-right: 10px;" on:click={shareOnLinkedIn}
							><svg
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								version="1.1"
								width="30"
								height="30"
								viewBox="0 0 30 30"
								><path
									fill="hsl({$textColor + ', 80%'})"
									d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z"
								/></svg
							>
						</button>
						<button
							style="color: hsl({$textColor + ', 80%'}); margin-right: 10px;"
							on:click={shareViaEmail}
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								class="bi bi-envelope"
								viewBox="0 0 16 16"
							>
								<path
									d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"
								/>
							</svg></button
						>
					</div>
					<div>
						<label for="copy-link">{copyLinkButtonText}</label>
						<textarea
							id="copy-link"
							style="background: hsl({$textColor + ', 20%'}); color: hsl({$textColor});"
							readonly
							on:click={copyLink}>{projectUrl}</textarea
						>
					</div>
					<div>
						<label for="embed-code">{embedLabelText}</label>
						<textarea
							id="embed-code"
							style="background: hsl({$textColor + ', 20%'}); color: hsl({$textColor});"
							readonly
							on:click={() => {
								navigator.clipboard.writeText(projectUrl);
								embedLabelText = 'Copied!';
								setTimeout(() => {
									embedLabelText = 'Embed Code: ';
								}, 1000);
							}}>{`<iframe src="${projectUrl}" title="${project.name}"></iframe>`}</textarea
						>
					</div>
				</div>
			</div>
		{/if}
		{#if isDeleted}
			<div class="deletePanelContainer" style="display: {isDeleted ? 'flex' : 'none'}">
				<div
					class="delete-component"
					style="border: 1px solid hsl({$textColor + ', 20%'}); background: hsl({$bgColor});"
				>
					<button
						class="panelButton"
						on:click={() => {
							isDeleted = false;
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20"
							><title>icon_quit</title><line
								x1="0.5"
								y1="0.5"
								x2="19.5"
								y2="19.5"
								style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"
							/><line
								x1="0.5"
								y1="19.5"
								x2="19.5"
								y2="0.5"
								style="fill:none;stroke: hsl({$textColor});stroke-linecap:round;stroke-linejoin:round; stroke-width: 3;"
							/></svg
						>
					</button>

					<h3>{project.name}</h3>
					<p>Do you really want to delete this project? This action can't be undone.</p>
					<form action="?/deleteProject" method="POST">
						<input type="hidden" name="projectId" value={project.id} />
						<div style="display: flex;">
							<div class="buttonWrapper" style="width: fit-content; background: hsl({$textColor})">
								<button
									type="submit"
									style="background: red; color: hsl({$textColor}); width: 83px;"
									on:click={() => {
										isDeletingProject = true;
									}}
									>{@html isDeletingProject
										? `<span class="loader" style="margin: 0; border-color: hsl(${$textColor}) transparent;"></span>`
										: 'Delete'}</button
								>
							</div>

							<div class="buttonWrapper" style="width: fit-content; background: hsl({$textColor})">
								<button
									type="button"
									style="background: {isDoNotDeleteButtonHovered
										? 'hsl(' + $bgColor + ', 70%)'
										: 'hsl(' + $bgColor + ')'}; color: hsl({$textColor}); width: 83px;"
									on:click={() => {
										isDeleted = false;
									}}
									on:pointerover={() => {
										isDoNotDeleteButtonHovered = true;
									}}
									on:pointerleave={() => {
										isDoNotDeleteButtonHovered = false;
									}}>No</button
								>
							</div>
						</div>
					</form>
				</div>
			</div>
		{/if}

<style>
	.projectWrapper {
		background: none;
		padding: 10px 0;
	}
	.projectMenuContainer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.buttonWrapper {
		height: 40px;
		padding: 0px;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 5px;
		box-sizing: border-box;
	}
	h3 {
		font-weight: 500;
		margin: 0;
		max-width: 80%;
	}
	a,
	button {
		width: fit-content;
		height: 100%;
		color: #1a1a1a;
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		border: none;
		border-radius: 9px;
		box-sizing: border-box;
		transition: all 0.25s;
	}
	.buttonsMenu {
		display: none;
		height: 40px;
	}
	.projectMenuContainer:hover > .buttonsMenu {
		display: flex;
	}
	.projectMenuContainer:active > .buttonsMenu {
		display: flex;
	}
	.sharePanelContainer,
	.deletePanelContainer {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		z-index: 2;
		justify-content: center;
		align-items: center;
		padding: 10px;
		box-sizing: border-box;
	}
	.share-component,
	.delete-component {
		width: calc(100% - 10px);
		max-width: 400px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		position: relative;
		margin-top: 20px;
		padding: 10px;
		border-radius: 10px;
	}
	textarea {
		resize: none;
		width: 100%;
		height: fit-content;
		box-sizing: border-box;
		margin-top: 10px;
		transition: all 0.25s;
		font-family:
			Source Code Pro,
			sans-serif;
		font-size: 1rem;
		font-weight: 300;
		border: none;
		border-radius: 10px;
		padding: 0 10px;
		box-sizing: border-box;
	}
	textarea:focus {
		outline: none !important;
	}

	.shareButtons {
		display: flex;
		box-sizing: border-box;
	}
	.shareButtons button {
		background: none;
		border: none;
		height: 30px;
		border-radius: 0;
		font-size: 1.2rem;
		padding: 10px 0;
		margin-right: 10px;
		box-sizing: border-box;
		border-bottom: 1px solid #1a1a1a00;
		transition: none;
	}
	.shareButtons button:hover {
		border-bottom: 1px solid;
		box-sizing: border-box;
	}
	.panelButton {
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

	@media screen and (max-width: 400px) {
		.projectMenuContainer {
			flex-direction: column;
			/* grid-template-columns: 1fr; */
		}
		.buttonsMenu {
			padding-left: 0;
			margin-top: 10px;
		}
	}
</style>
