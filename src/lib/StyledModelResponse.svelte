<script>
	import { marked } from 'marked';
	import CodeSnippetMonaco from './CodeSnippetMonaco.svelte';
	import { textColor } from './store';

	export let htmlContent = ''; //markdown
	console.log(htmlContent);
	console.log(splitMarkdownText(htmlContent));

	function splitMarkdownText(markdownText = '') {
		const chunks = markdownText.split(/```/);

		return chunks.map((chunk, index) => {
			if (index % 2 === 0) {
				return { type: 'text', content: chunk };
			} else {
				// const [language, content] = chunk.split('\n').filter(Boolean);
				// return { type: 'code', language: language.trim(), content: content.trim() };
				const [language, ...lines] = chunk.split('\n').filter(Boolean);
				const lang = language.trim() || 'javascript';
            return { type: 'code', language: lang, content: lines.join('\n').trim() };
			}
		});
	}

	let chunks = [];
	async function getChunks(htmlContent = '') {
		let markdownChunksObjects = splitMarkdownText(htmlContent)
		for(let markdownChunk of markdownChunksObjects){
			if(markdownChunk.type === 'text'){
				chunks= [...chunks, {
					type: 'text', 
					content: await marked(markdownChunk.content)
				}]
			} else {
				chunks = [...chunks, markdownChunk]
			}
		}
		// if (htmlContent != '') {
		// 	const html = await marked(htmlContent);
		// 	chunks = splitCodeIntoChunks(html);
		// }
		console.log(chunks);
		return chunks;
	}

	getChunks(htmlContent);

	function getFileName(language = '') {
		let name = '';
		switch (language) {
			case 'html':
				name = 'index.html';
				break;
			case 'css':
				name = 'style.css';
				break;
			case 'javascript':
				name = 'script.js';
				break;
		}
		return name;
	}
</script>

<div class='styledModelResponse' style='background: hsl({$textColor + ', 10%'})'>
		{#each chunks as chunk}
			{#if chunk.type === 'code'}
				<CodeSnippetMonaco fileName={getFileName(chunk.language)} code={chunk.content} />
			{:else}
				{@html chunk.content}
			{/if}
		{/each}
</div>

<style>
	.styledModelResponse{
		width: 100%;
		padding: 10px;
		/* padding-right: 20px; */
		margin: 10px 0;
		border-radius: 10px 10px 10px 0;
		box-sizing: border-box;
	}
</style>

<!-- <style>
	div :global(h1),
	div :global(h2),
	div :global(p),
	div :global(ul),
	div :global(ol),
	div :global(li) {
		font-family: sans-serif;
		margin: 0;
		padding-top: 0;
	}
	div :global(br) {
		padding: 0;
	}
	div :global(pre) {
		border: 1px solid black;
		border-radius: 10px;
		background-color: #f9f9f9;
	}
	div :global(code) {
		font-family: 'Courier New', Courier, monospace;
		margin: 0;
		text-wrap: wrap;
		word-break: normal;
		overflow-x: auto;
		padding: 0 5px;
		background-color: #f9f9f9;
	}
</style> -->
