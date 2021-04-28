<script>
	import Photo from './Photo.svelte';
	export let currentUser;
	export let disconnect;
	export let modalOpened;
</script>

<aside class="topLoginContainer">
	{#if currentUser}
		<button class="connect" on:click={disconnect}>Déconnexion</button>
		<div class="photoContainer">
			<Photo bind:user={currentUser} />
		</div>
	{:else}
		<button class="connect" on:click={() => (modalOpened = 'login')}>Connexion</button>
	{/if}
</aside>

<style>
		button.connect {
		background-color: transparent;
		border: 1px solid white;
		border-radius: 6px;
		font-size: 11px;
		padding: 5px 10px;
		text-transform: uppercase;
		letter-spacing: 0.055em;
		color: white;
		opacity: 0.9;
		cursor: pointer;
		transition: 0.17s;
	}
	button.connect:hover {
		transform: scale(0.96);
		opacity: 1;
	}
	button.connect:active {
		transform: scale(0.87);
		opacity: 1;
	}
	.topLoginContainer {
		position: absolute;
		top: 15px;
		right: 15px;
		color: white;
		display: flex;
		gap: 7px;
		justify-content: center;
	}
	.topLoginContainer .photoContainer {
		height: 25px;
		width: 25px;
	}
</style>