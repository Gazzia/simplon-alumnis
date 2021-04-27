<script>
	export let auth;
	export let modalOpened;
	let email = "";
	let password = "";
	function parseAndPost(event){
		event.preventDefault();
		const valid = [email, password].every(field=>field&&field.length>0);
		if(valid){
			auth.signInWithEmailAndPassword(email, password).then(()=>{
				modalOpened = false;
			}).catch()
		}
	}
</script>

<div class="modal">
	<form>
		<input type="email" placeholder="Email" bind:value={email}>
		<input type="password" placeholder="Mot de passe" bind:value={password}>
		<button on:click={parseAndPost} >Requête de type POST</button>
	</form>

</div>

<style>
	form {
		display: flex;
		flex-direction: column;
	}
</style>

<!-- markup (zero or more items) goes here -->