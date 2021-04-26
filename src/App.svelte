<script>
	import firebase from 'firebase/app';
	import 'firebase/firestore';
	import {users as alumnis2} from './ocazou';
	import {fade} from 'svelte/transition';

	var firebaseConfig = {
		apiKey: 'AIzaSyCGQfjkm9HhqW5On4ehh2O1shWmYw6epwA',
		authDomain: 'alumni-simplon.firebaseapp.com',
		projectId: 'alumni-simplon',
		storageBucket: 'alumni-simplon.appspot.com',
		messagingSenderId: '52608283217',
		appId: '1:52608283217:web:79fc793d9e14a93c6afe70',
	};
	firebase.initializeApp(firebaseConfig);
	var db = firebase.firestore();

	$: alumnis = [];
	let modalOpened = null;
	let clickedAlumni = null;

	// db.collection('alumnis').onSnapshot((sn) => {
	// 	const newAlumnis = [];
	// 	sn.forEach((doc) => {
	// 		newAlumnis.push(doc.data());
	// 	});
	// 	alumnis = newAlumnis.sort((a, b) => !a.searchingForAJob);
	// 	console.log(alumnis);
	// });
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
	<h1>Alumnis Simplon - Java Web</h1>
	<ul class="grid">
		{#each alumnis2 as alumni}
			<li itemscope itemtype="https://schema.org/Person">
				<div class="photoContainer">
					<div class="imageWrapper">
						{#if alumni.photoURL?.length > 1}
							<img src={alumni.photoURL} alt="Photo de {alumni.prenom}" itemprop="image" />
						{:else}
							<img src="./assets/default.png" alt="Photo de {alumni.prenom}" itemprop="image" />
						{/if}
					</div>
					{#if alumni.searchingForAJob}
						<div class="jobIcon" data-tooltip="Je cherche un poste !">
							<svg height="36px" viewBox="0 0 24 24" width="36px" fill="#6732FF"
								><path d="M0 0h24v24H0V0z" fill="none" /><path
									d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"
								/></svg
							>
						</div>
					{/if}
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
				>
					Infos ({Object.keys(alumni.contact).filter((k) => alumni.contact[k] != null).length})
				</button>
				<div class="icons">
					{#each ['email', 'phone', 'cv', 'address', 'github', 'linkedin', 'discord', 'steam'] as contact}
						{#if alumni.contact[contact]}
							<div class="icon" data-info={contact}>
								<img src="./assets/icons/{contact}.svg" alt={contact} />
							</div>
						{/if}
					{/each}
				</div>
			</li>
		{/each}
	</ul>
</main>
{#if modalOpened == 'alumniInfo'}
	<div class="modalContainer" transition:fade={{duration: 100}}>
		<div
			class="background"
			on:click={() => {
				modalOpened = null;
			}}
		/>
		<div class="modal alumniInfo">
			<aside class="left">
				<div class="photoContainer">
					<div class="imageWrapper">
						{#if clickedAlumni.photoURL?.length > 1}
							<img
								src={clickedAlumni.photoURL}
								alt="Photo de {clickedAlumni.prenom}"
								itemprop="image"
							/>
						{:else}
							<img src="./assets/default.png" alt="Photo de {clickedAlumni.prenom}" itemprop="image" />
						{/if}
					</div>
					{#if clickedAlumni.searchingForAJob}
						<div class="jobIcon" data-tooltip="Je cherche un poste !">
							<svg height="36px" viewBox="0 0 24 24" width="36px" fill="#6732FF"
								><path d="M0 0h24v24H0V0z" fill="none" /><path
									d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"
								/></svg
							>
						</div>
					{/if}
				</div>
				<div class="name">
					<div class="first" itemprop="givenName">{clickedAlumni.prenom}</div>
					<strong class="last" itemprop="familyName">{clickedAlumni.nom}</strong>
				</div>
			</aside>
			<div class="text">
				{#each ['email', 'phone', 'cv', 'address', 'github', 'linkedin', 'discord', 'steam'] as contact}
					{#if clickedAlumni.contact[contact]}
						<div class="field">
							<div class="icon" data-info={contact}>
								<img src="./assets/icons/{contact}.svg" alt={contact} />
							</div>
							<div class="value">
								{#if contact == 'email'}
									<a href="mailto:{clickedAlumni.contact[contact]}">
										{clickedAlumni.contact[contact]}
									</a>
								{:else if ["cv", "github", "linkedin"].includes(contact)}
									<a href={clickedAlumni.contact[contact]}>
										{clickedAlumni.contact[contact]}
									</a>
								{:else}
									{clickedAlumni.contact[contact]}
								{/if}
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
{:else if modalOpened == 'login'}
	<div class="modalContainer" transition:fade={{duration: 100}}>
		<div
			class="background"
			on:click={() => {
				modalOpened = null;
			}}
		/>
		<div class="modal" />
	</div>
{/if}

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
	h1 {
		color: #fa2358;
		letter-spacing: 0.055em;
		font-weight: bold;
		text-shadow: 1px 0px 1px white, -1px 0px 1px white, 0px 1px 1px white, 0px -1px 1px white;
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
	.photoContainer {
		width: 80px;
		height: 80px;
		position: relative;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.07);
		border-radius: 12px;
	}
	.photoContainer .imageWrapper {
		width: 100%;
		height: 100%;
		position: absolute;
		overflow: hidden;
		border-radius: 12px;
		background-color: white;
	}
	.photoContainer .imageWrapper img {
		max-width: 100%;
		max-height: 100%;
	}
	.photoContainer .jobIcon {
		background-color: white;
		width: 18px;
		height: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: 4px;
		right: 5px;
		box-shadow: 0 2px 2px #00000029;
		padding: 4px;
		border-radius: 50%;
		z-index: 2;
	}
	.name {
		text-align: center;
		margin: 7px 0;
	}
	.name .last {
		text-transform: uppercase;
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
	button.button-normal:hover {
		transform: scale(0.96);
		filter: brightness(1.03);
	}
	button.button-normal:active {
		transform: scale(0.87);
		filter: brightness(1.03);
	}
	.modalContainer {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 50;
	}
	.modalContainer .background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.212);
		z-index: 1;
	}
	.modalContainer .modal {
		position: relative;
		z-index: 2;
		padding: 20px;
		background-color: white;
		border-radius: 12px;
		box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02), 0 6.7px 5.3px rgba(0, 0, 0, 0.028),
			0 12.5px 10px rgba(0, 0, 0, 0.035), 0 22.3px 17.9px rgba(0, 0, 0, 0.042),
			0 41.8px 33.4px rgba(0, 0, 0, 0.05), 0 100px 80px rgba(0, 0, 0, 0.07);
	}

	.modal.alumniInfo {
		display: flex;
	}
	.modal.alumniInfo aside.left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-right: 20px;
	}
	.modal.alumniInfo aside.left .photoContainer {
		height: 150px;
		width: 150px;
	}
	.modal.alumniInfo aside.left .name {
		margin-bottom: 0;
	}
	.modal.alumniInfo .text {
		display: flex;
		flex-direction: column;
	}
	.modal.alumniInfo .text .field {
		display: flex;
	}
	.modal.alumniInfo .text .field .icon {
		margin-right: 5px;
	}
</style>
