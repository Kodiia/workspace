<script>
	import { bgColor, textColor, primaryColor, accentColor } from '$lib/store';

	import ProjectSharePanel from './ProjectSharePanel.svelte';

	export let project = {};

	let isHovered = false,
		isLinkHovered = false,
		isDeletingProject = false,
		isShared = false;

	let embedLabelText = 'Embed Code:'
	let copyLinkButtonText = 'Copy Link'

	function getProjectEditDate() {
		const dbDate = project.updated;
		const date = dbDate.split('.')[0];

		return date;
	}
	let projectUrl = `https://kodiia.me/projects/${project.id}`;
	let projectTitle = project.name;

	const copyLink = () => {
		navigator.clipboard.writeText(projectUrl);
		copyLinkButtonText = 'Copied!'
		setTimeout(()=>{
			copyLinkButtonText = 'Copy Link'
		}, 1000)
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
	on:pointerover={() => {
		isHovered = true;
	}}
	on:pointerleave={() => {
		isHovered = false;
	}}
>
	<div class="projectMenuContainer">
		<div>
			<h3>{project.name}</h3>
			<!-- <p class='editDateText'>{getProjectEditDate}</p> -->
			<code style="background: hsl({$textColor + ', 20%'}); color: hsl({$textColor});"
				>{getProjectEditDate()}</code
			>
		</div>
		<div class="buttonsMenu">
			<a
				href="/projects/{project.id}/edit"
				style="background: linear-gradient(45deg, hsl({$primaryColor}) 50%, hsl({$accentColor})); box-shadow: {isLinkHovered
					? `0 0 10px hsl(${$primaryColor})`
					: 'none'}"
				on:pointerover={() => {
					isLinkHovered = true;
				}}
				on:pointerleave={() => {
					isLinkHovered = false;
				}}>Edit</a
			>
			<div
				class="buttonWrapper"
				style="background: linear-gradient(hsl({$primaryColor}), hsl({$accentColor}))"
			>
				<!-- <a
				href="/projects/{project.id}"
				target="_blank"
				style="background: hsl({$bgColor}); color: hsl({$textColor}); width: 83px;">Share</a
			> -->
				<button
					style="background: hsl({$bgColor}); color: hsl({$textColor}); width: 83px;"
					on:click={() => {
						isShared = !isShared;
					}}>Share</button
				>
			</div>
			<form action="?/deleteProject" method="POST">
				<!-- <a href='/api/projects/{project.id}/delete'>Delete</a> -->
				<input type="hidden" name="projectId" value={project.id} />
				<div
					class="buttonWrapper"
					style="background: linear-gradient(hsl({$primaryColor}), hsl({$accentColor}))"
				>
					<button
						type="submit"
						style="background: hsl({$bgColor}); color: hsl({$textColor}); width: 83px;"
						on:click={() => {
							isDeletingProject = true;
						}}
						>{@html isDeletingProject
							? `<span class="loader" style="margin: 0; border-color: hsl(${$textColor}) transparent;"></span>`
							: 'Delete'}</button
					>
				</div>
			</form>
		</div>
	</div>
	<div class="sharePanelContainer">
		{#if isShared}
			<!-- <ProjectSharePanel {project} /> -->
			<div class="share-component" style="border: 1px solid hsl({$textColor + ', 20%'});">
				<button
					class="panelButton"
					on:click={() => {
						isShared = false;
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

				<h3>Share this project</h3>
				<div class="shareButtons" >
					<button style='color: hsl({$textColor});' on:click={copyLink}>{copyLinkButtonText}</button>
					<button style='color: hsl({$textColor});' on:click={shareOnTwitter}>X</button>
					<button style='color: hsl({$textColor});' on:click={shareOnTelegram}>Telegram</button>
					<button style='color: hsl({$textColor});' on:click={shareOnLinkedIn}>LinkedIn</button>
					<button style='color: hsl({$textColor});' on:click={shareViaEmail}>Email</button>
				</div>
				<div>
					<label for="embed-code">{embedLabelText}</label>
					<textarea
						id="embed-code"
						style="background: hsl({$textColor + ', 20%'}); color: hsl({$textColor});"
						readonly
						on:click={() => {
							navigator.clipboard.writeText(projectUrl);
							embedLabelText = 'Copied!'
							setTimeout(()=>{
								embedLabelText = 'Embed Code: '
							}, 1000)
						}}>{`<iframe src="${projectUrl}" title="${project.name}"></iframe>`}</textarea
					>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.projectWrapper {
		background: none;
		padding: 10px 0;
	}
	.projectMenuContainer {
		display: flex;
		justify-content: space-between;
	}
	.buttonWrapper {
		height: 40px;
		padding: 2px;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 5px;
		box-sizing: border-box;
	}
	h3 {
		font-weight: 300;
		margin: 0;
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
		border-radius: 8px;
		box-sizing: border-box;
		transition: all 0.25s;
	}
	.buttonsMenu {
		display: flex;
		height: 40px;
	}

	.share-component {
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
	textarea:focus{
		outline: none !important;
	}

	.shareButtons {
		display: flex;
		box-sizing: border-box;
	}
	.shareButtons button{
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
	.shareButtons button:hover{
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
</style>
