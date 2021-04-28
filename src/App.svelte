<script>
	import firebase from 'firebase/app';
	import 'firebase/firestore';
	import 'firebase/auth';
	import 'firebase/storage';

	import {users as alumnis2} from './ocazou';
	import {fade} from 'svelte/transition';
	import AlumniEdit from './components/AlumniEdit.svelte';
	import LoginForm from './components/LoginForm.svelte';
	import JobIcon from './components/JobIcon.svelte';
	import Photo from './components/Photo.svelte';
	import Modal from './components/Modal.svelte';
	import {contactProps, publicContactProps, displayContact} from './shared/contactprops';
	import LoginContainer from './components/LoginContainer.svelte';

	var firebaseConfig = {
		apiKey: 'AIzaSyCGQfjkm9HhqW5On4ehh2O1shWmYw6epwA',
		authDomain: 'alumni-simplon.firebaseapp.com',
		projectId: 'alumni-simplon',
		storageBucket: 'alumni-simplon.appspot.com',
		messagingSenderId: '52608283217',
		appId: '1:52608283217:web:79fc793d9e14a93c6afe70',
	};
	firebase.initializeApp(firebaseConfig);
	const db = firebase.firestore();
	const auth = firebase.auth();
	const bucket = firebase.storage().ref();

	let alumnis = [];
	let modalOpened = null;
	let clickedAlumni = null;
	$: currentUser = null;
	$: alumniList = currentUser ? alumnis : alumnis.filter((a) => !a.private);
	auth.onAuthStateChanged((user) => {
		if (!user) {
			currentUser = null;
		} else {
			const correspondingUser = alumnis.find((a) => a.id == user.uid);
			if (correspondingUser) {
				currentUser = correspondingUser;
			} else {
				db.collection('alumnis')
					.doc(user.uid)
					.get()
					.then((doc) => {
						currentUser = doc.data();
					});
			}
		}
	});

	function disconnect() {
		auth.signOut();
	}

	db.collection('alumnis').onSnapshot((sn) => {
		const newAlumnis = [];
		sn.forEach((doc) => {
			newAlumnis.push(doc.data());
		});
		alumnis = newAlumnis.sort((a, b) => {
			if (a.searchingForAJob === b.searchingForAJob)
				return getAlumniFilledContactsLength(b) - getAlumniFilledContactsLength(a);
			else if (a.searchingForAJob) return -1;
			else return 1;
		});
	});

	function getAlumniFilledContactsLength(alumni) {
		return Object.keys(alumni.contact).filter((k) => alumni.contact[k]?.length > 0).length;
	}
	function getAlumniFilledPublicContactsLength(alumni) {
		return Object.keys(alumni.contact).filter((k) => {
			return publicContactProps.includes(k) && alumni.contact[k]?.length > 0;
		}).length;
	}
</script>

<div class="blobs">
	<svg width="579" height="419" viewBox="0 0 579 419" fill="none" class="blobtopright">
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M216.249 -92.2906C261.052 -131.44 292.523 -183.438 344.841 -209.802C410.169 -242.722 484.098 -278.739 547.272 -259.099C612.065 -238.956 658.238 -177.149 669.138 -108.983C679.244 -45.7831 628.346 16.473 601.517 80.1198C580.652 129.616 565.166 179.272 529.891 221.351C491.275 267.416 447.581 314.067 391.901 330.17C334.654 346.727 274.118 337.558 228.834 308.421C186.306 281.057 182.24 222.318 156.463 178.682C126.734 128.355 52.6384 95.9692 66.4245 33.4856C80.1906 -28.9074 165.89 -48.2857 216.249 -92.2906Z"
			fill="#FA2358"
		/>
	</svg>
	<svg width="389" height="560" viewBox="0 0 389 560" fill="none" class="blobbotleft">
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M178.066 254.046C204.286 307.454 246.367 351.311 258.291 408.67C273.181 480.292 288.837 561.024 253.516 616.963C217.29 674.334 145.638 702.937 76.9734 695.823C13.3115 689.228 -33.6499 623.95 -88.1839 581.562C-130.593 548.598 -174.549 520.788 -206.065 475.824C-240.565 426.602 -274.318 372.322 -275.462 314.371C-276.637 254.79 -252.113 198.69 -212.248 162.49C-174.81 128.493 -117.02 139.768 -68.1991 126.164C-11.8924 110.473 38.5669 47.2845 95.3533 76.7728C152.057 106.218 148.595 194.013 178.066 254.046Z"
			fill="#FA2358"
		/>
	</svg>
</div>
<main>
	<LoginContainer bind:currentUser {disconnect} bind:modalOpened />
	<h1>Alumnis Simplon - Java Web</h1>
	<h2>
		{#if !currentUser}Profils publics{:else}Tous les profils{/if}
	</h2>
	<ul class="grid" in:fade={{delay: 400}}>
		{#each alumniList as alumni}
			<li itemscope itemtype="https://schema.org/Person">
				<div class="photoContainer">
					<Photo bind:user={alumni} />
					<JobIcon bind:active={alumni.searchingForAJob} />
				</div>
				<div class="name">
					<div class="first" itemprop="givenName">{alumni.prenom}</div>
					<strong class="last" itemprop="familyName">{alumni.nom}</strong>
				</div>
				<button
					class="button-normal"
					on:click={() => {
						modalOpened = 'alumniInfo';
						clickedAlumni = alumni;
					}}
					class:editable={currentUser?.id == alumni.id}
				>
					{#if currentUser?.id == alumni.id}Editer{:else}Infos{/if}
					{#if currentUser}
						({getAlumniFilledContactsLength(alumni)})
					{:else}
						({getAlumniFilledPublicContactsLength(alumni)})
					{/if}
				</button>
				<div class="icons">
					{#if currentUser}
						{#each contactProps as contact}
							{#if alumni.contact[contact]?.length > 0}
								<div class="icon" data-info={displayContact[contact]}>
									<img src="./assets/icons/{contact}.svg" alt={contact} />
								</div>
							{/if}
						{/each}
					{:else}
						{#each publicContactProps as contact}
							{#if alumni.contact[contact]?.length > 0}
								<div class="icon" data-info={displayContact[contact]}>
									<img src="./assets/icons/{contact}.svg" alt={contact} />
								</div>
							{/if}
						{/each}
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</main>
<Modal name="alumniInfo" bind:modalOpened>
	<AlumniEdit {db} {bucket} bind:clickedAlumni bind:currentUser bind:modalOpened />
</Modal>
<Modal name="login" bind:modalOpened>
	<LoginForm {auth} bind:modalOpened />
</Modal>

<style>
	.blobs {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		pointer-events: none;
	}
	.blobs .blobtopright {
		position: absolute;
		top: 0;
		right: 0;
	}
	.blobs .blobbotleft {
		position: absolute;
		bottom: 0;
		left: 0;
	}
	main {
		position: relative;
		padding: 20px 7vw;
		z-index: 2;
	}
	h1,
	h2 {
		color: #fa2358;
		letter-spacing: 0.055em;
		font-weight: bold;
		text-shadow: 1px 0px 0px white, -1px 0px 0px white, 0px 1px 0px white, 0px -1px 0px white;
	}
	h1 {
		margin-bottom: 2px;
	}
	h2 {
		margin-top: 0;
		font-size: 14px;
		text-transform: uppercase;
		font-weight: normal;
	}
	ul.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 30px;
		padding: 0;
	}
	ul.grid li {
		background-color: #f9f9f9;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 10px;
		padding: 10px 20px;
		/* box-shadow: 0px 2.92443px 7.10219px rgba(0, 0, 0, 0.0503198),
			0px 1.56354px 3.79717px rgba(0, 0, 0, 0.0417275), 0px 0.876509px 2.12866px rgba(0, 0, 0, 0.035),
			0px 0.465507px 1.13052px rgba(0, 0, 0, 0.0282725), 0px 0.193708px 0.470434px rgba(0, 0, 0, 0.0196802); */
		border: solid #0000000f;
		border-width: 0 0 1px 1px;
	}

	ul.grid li .icons {
		margin-top: 5px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 8px;
	}

	button.button-normal {
		background: #ffffff;
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
		border-radius: 5px;
		padding: 7px 18px;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 600;
		font-size: 12px;
		letter-spacing: 0.055em;
		color: #fa2358;
		text-transform: uppercase;
		cursor: pointer;
		transition: 0.2s;
	}
	button.button-normal.editable {
		color: #6732ff;
	}
	button.button-normal:hover {
		transform: scale(0.96);
		filter: brightness(1.03);
	}
	button.button-normal:active {
		transform: scale(0.87);
		filter: brightness(1.03);
	}
</style>
