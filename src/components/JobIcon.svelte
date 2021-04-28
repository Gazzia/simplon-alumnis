<script>
	export let active;
</script>

{#if active}
	<div class="jobIcon" data-tooltip="Je cherche un poste !">
		<svg height="36px" viewBox="0 0 24 24" width="36px" fill="#6732FF"
			><path d="M0 0h24v24H0V0z" fill="none" /><path
				d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"
			/></svg
		>
	</div>
{/if}
