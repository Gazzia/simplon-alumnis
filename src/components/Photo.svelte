<script>
	export let user;
	export let files = [];
	export let canEdit;
</script>

<div class="imageWrapper">
	{#if user.photoURL?.length > 1}
		<img src={user.photoURL} alt="Photo de {user.prenom}" itemprop="image" />
	{:else}
		<img src="./assets/default.png" alt="Photo de {user.prenom}" itemprop="image" />
	{/if}
	{#if canEdit}
		<div class="input-file-container">
			<input
				class="input-file"
				id="my-file"
				type="file"
				accept="image/png, image/jpeg, image/webp"
				bind:files
			/>
			<label for="my-file" class="input-file-trigger" tabindex="0"> Modifier... </label>
		</div>
	{/if}
</div>

<style>
	.input-file-container {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 2;
		top: 0;
		left: 0;
		display: flex;
		align-items: flex-end;
	}

	.input-file-trigger {
		padding: 20px 10px;
		background: #47474791;
		color: #fff;
		font-size: 1em;
		transition: all 0.4s;
		cursor: pointer;
		opacity: 0;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		z-index: 2;
	}

	.input-file {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		padding: 14px 0;
		opacity: 0;
		cursor: pointer;
		height: 100%;
		z-index: 1;
	}

	/* quelques styles d'interactions */
	.input-file:hover + .input-file-trigger,
	.input-file:focus + .input-file-trigger,
	.input-file-trigger:hover,
	.input-file-trigger:focus {
		opacity: 1;
	}
</style>
