<script>
	import {fade} from 'svelte/transition';
	export let modalOpened;
	export let name;
</script>

{#if modalOpened == name}
	 <div class="modalContainer" transition:fade={{duration: 100}}>
		 <div class="background" on:click={() => (modalOpened = null)} />
		 <slot></slot>
	 </div>
{/if}
