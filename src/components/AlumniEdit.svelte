<script>
	import {contactProps, displayContact, publicContactProps} from '../shared/contactprops';
	import JobIcon from "./JobIcon.svelte"
	import Photo from './Photo.svelte';
	export let clickedAlumni;
	export let currentUser;
	export let modalOpened;
	export let db;
	export let bucket;
	$: isCurrentUser = currentUser && currentUser.id == clickedAlumni.id;
	$: editedUser = Object.assign({}, clickedAlumni);
	$: files = [];
	$: canValidate = files.length > 0 ? false : true;
	$: if(files.length > 0) uploadPicture();

	function parseAndPost() {
		db.collection('alumnis')
			.doc(editedUser.id)
			.update(editedUser)
			.then((res) => {
				modalOpened = false;
			})
			.catch((err) => {
				console.error(err);
			});
	}

	export const getValidUrl = (url = '') => {
		let newUrl = window.decodeURIComponent(url);
		newUrl = newUrl.trim().replace(/\s/g, '');

		if (/^(:\/\/)/.test(newUrl)) {
			return `http${newUrl}`;
		}
		if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
			return `http://${newUrl}`;
		}

		return newUrl;
	};

	function flipPrivate() {
		editedUser.private = !editedUser.private;
	}
	function flipJob() {
		editedUser.searchingForAJob = !editedUser.searchingForAJob;
	}

	function uploadPicture() {
		let uploadTask = bucket.child(editedUser.id + '.jpg').put(files[0]);
		uploadTask.on(
			'state_changed',
			() => {},
			(err) => {
				console.error(err);
			},
			() => {
				bucket
					.child(editedUser.id + '_250x250.webp')
					.getDownloadURL()
					.then((url) => {
						console.log('URL got');
						editedUser.photoURL = url;
						files = [];
					})
					.catch((err) => {
						console.error(err);
					});
			}
		);
	}
</script>

<div class="modal alumniInfo">
	<aside class="left">
		<div class="photoContainer">
			{#if currentUser}
				<Photo bind:user={editedUser} bind:canEdit={isCurrentUser} bind:files></Photo>
				{:else}
				<Photo bind:user={clickedAlumni}></Photo>
			{/if}
			<JobIcon bind:active={clickedAlumni.searchingForAJob}></JobIcon>
		</div>
		<div class="name">
			<div class="first" itemprop="givenName">{clickedAlumni.prenom}</div>
			<strong class="last" itemprop="familyName">{clickedAlumni.nom}</strong>
		</div>
	</aside>
	<div class="text">
		{#if isCurrentUser}
			<div class="radios">
				<div class="radio" class:checked={!editedUser.private} on:click={flipPrivate}>
					Profil public
					<div class="precisions" data-info="Email, cv, github, linkedin, technos, divers">*</div>
				</div>
				<div class="radio" class:checked={editedUser.searchingForAJob} on:click={flipJob}>
					Je cherche un taff
				</div>
			</div>
		{/if}
		{#each contactProps as contact}
			{#if isCurrentUser}
				<div class="editionField">
					<div class="labelWrapper">
						<div class="icon" data-info={displayContact[contact]}>
							<img src="./assets/icons/{contact}.svg" alt={contact} />
						</div>
						<div class="label">{displayContact[contact]}</div>
					</div>
					{#if ['stack', 'other'].includes(contact)}
						<textarea noresize bind:value={editedUser.contact[contact]} />
					{:else}
						<input type="text" bind:value={editedUser.contact[contact]} />
					{/if}
				</div>
			{:else if !isCurrentUser && clickedAlumni.contact[contact]?.length > 0 && (currentUser || publicContactProps.includes(contact))}
				<div class="field">
					<div class="icon" data-info={displayContact[contact]}>
						<img src="./assets/icons/{contact}.svg" alt={contact} />
					</div>
					<div class="value">
						{#if contact == 'email'}
							<a href="mailto:{clickedAlumni.contact[contact]}">
								{clickedAlumni.contact[contact]}
							</a>
						{:else if ['cv', 'github', 'linkedin'].includes(contact)}
							<a href={getValidUrl(clickedAlumni.contact[contact])}>
								{clickedAlumni.contact[contact]}
							</a>
						{:else if contact == 'steam'}
							<a href={getValidUrl('steamidfinder.com/lookup/' + clickedAlumni.contact[contact])}>
								{clickedAlumni.contact[contact]}
							</a>
						{:else}
							{clickedAlumni.contact[contact]}
						{/if}
					</div>
				</div>
			{/if}
		{/each}
		{#if isCurrentUser && canValidate}
			<button on:click={parseAndPost}>Valider</button>
			<div class="explanations">
				* Données publiques pour employeurs: email, cv, github, linkedin, technos, divers
			</div>
		{/if}
	</div>
</div>

<style>
	.modal.alumniInfo {
		display: flex;
		max-height: 80vh;
		max-width: 76vw;
		flex-wrap: wrap;
		justify-content: center;
		overflow: auto;
		gap: 20px;
	}
	.modal.alumniInfo aside {
		display: flex;
		flex-direction: column;
	}
	.modal.alumniInfo aside .photoContainer {
		height: 150px;
		width: 150px;
	}

	.modal.alumniInfo aside .name {
		margin-bottom: 0;
	}
	.modal.alumniInfo .text {
		display: flex;
		flex-direction: column;
	}
	.modal.alumniInfo .text .field {
		display: flex;
		align-items: flex-start;
	}
	.modal.alumniInfo .text .field + .field {
		margin-top: 5px;
	}
	.modal.alumniInfo .text .field .icon {
		margin-right: 8px;
		padding-top: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal.alumniInfo .text .field .value {
		white-space: pre-wrap;
	}

	.editionField {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.editionField + .editionField {
		margin-top: 5px;
	}
	.editionField .labelWrapper {
		display: flex;
		gap: 4px;
		font-size: 12px;
		text-transform: uppercase;
	}
	.editionField input {
		background-color: #f3f3f3;
		border: none;
		padding: 9px 13px;
		border-radius: 6px;
		font-size: 15px;
	}
	.editionField .labelWrapper .label {
		padding-top: 2px;
	}
	.radios {
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.radio {
		text-transform: uppercase;
		font-size: 14px;
		letter-spacing: 0.055em;
		display: inline-block;
	}
	.radio::before {
		content: '';
		width: 20px;
		height: 20px;
		background-color: white;
		border-radius: 4px;
		border: 1px solid #6732ff;
		transition: 0.17s;
		display: inline-block;
		margin-bottom: -6px;
		margin-right: 9px;
	}
	.radio.checked::before {
		background-color: #6732ff;
	}
	.radio * {
		flex-grow: 1;
		flex-wrap: nowrap;
	}
	.explanations {
		font-size: 12px;
		opacity: 0.7;
	}
	.precisions {
		margin-left: -5px;
		font-weight: bold;
		color: #6732ff;
		display: inline;
		margin-left: 5px;
	}
</style>
