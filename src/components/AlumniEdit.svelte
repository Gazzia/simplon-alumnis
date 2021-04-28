<script>
	import {contactProps, displayContact, publicContactProps} from '../shared/contactprops';
	export let clickedAlumni;
	export let currentUser;
	export let modalOpened;
	export let db;
	$: isCurrentUser = currentUser && currentUser.id == clickedAlumni.id;
	$: editedUser = Object.assign({}, clickedAlumni);

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
</script>

<div class="modal alumniInfo">
	<aside class="left">
		<div class="photoContainer">
			<div class="imageWrapper">
				{#if clickedAlumni.photoURL?.length > 1}
					<img src={clickedAlumni.photoURL} alt="Photo de {clickedAlumni.prenom}" itemprop="image" />
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
		{#if isCurrentUser}
			<div class="radios">
				<div class="radio" class:checked={!editedUser.private} on:click={flipPrivate}>Profil public<div class="precisions" data-info="Email, cv, github, linkedin, technos, divers">*</div></div>
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
						{:else if contact == "steam"}
							<a href={getValidUrl("steamcommunity.com/id/"+clickedAlumni.contact[contact])}>
								{clickedAlumni.contact[contact]}
							</a>
						{:else}
							{clickedAlumni.contact[contact]}
						{/if}
					</div>
				</div>
			{/if}
		{/each}
		{#if isCurrentUser}
			<button on:click={parseAndPost}>Valider</button>
			<div class="explanations">* Données publiques pour employeurs: email, cv, github, linkedin, technos, divers</div>
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
		align-items: center;
	}
	.modal.alumniInfo aside {
		display: flex;
		flex-direction: column;
		justify-content: center;
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
		display: flex;
		align-items: center;
		gap: 11px;
	}
	.radio::before {
		content: '';
		width: 20px;
		height: 20px;
		background-color: white;
		border-radius: 4px;
		border: 1px solid #6732ff;
		transition: 0.17s;
	}
	.radio.checked::before {
		background-color: #6732ff;
	}
	.explanations {
		font-size: 12px;
		opacity: 0.7;
	}
	.precisions{
		margin-left:-5px;
		font-weight: bold;
		color: #6732ff;
	}
</style>
