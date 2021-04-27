const defaultUser = {
	id: null,
	nom: null,
	prenom: null,
	private: true,
	searchingForAJob: false,
	photoURL: null,
	contact: {
		email: null,
		github: null,
		linkedin: null,
		discord: null,
		steam: null,
		phone: null,
		address: null,
		cv: null,
	},
};

export const users = [
	{
		id: 'a3tIaIfsVjQOn9JyLVMVdQvi7WN2',
		nom: 'Isambert',
		prenom: 'Franck',
		searchingForAJob:true,
		photoURL:
			'https://firebasestorage.googleapis.com/v0/b/alumni-simplon.appspot.com/o/a3tIaIfsVjQOn9JyLVMVdQvi7WN2.jpg?alt=media&token=0fe2cd36-db7d-4380-ae23-8067559816a9',
		contact: {
			email: 'franck.isambert.pro@gmail.com',
		},
	},
	{
		id: '3oEdcnCVNHbKwlhQiW1bf2ttC3V2',
		nom: 'Chevalier',
		prenom: 'Mariana',
		searchingForAJob:true,
		photoURL:
			'https://firebasestorage.googleapis.com/v0/b/alumni-simplon.appspot.com/o/3oEdcnCVNHbKwlhQiW1bf2ttC3V2.jpg?alt=media&token=bf959ce7-5ee2-4f61-a79f-260360773ba1',
		contact: {
			email: 'mariana.chevalier.mc@gmail.com',
		},
	},
	{
		id: 'bOkg6WL9UpZRZVyyFyJClsV7ikW2',
		nom: 'Epiard',
		prenom: 'Elodie',
		photoURL:
			'https://firebasestorage.googleapis.com/v0/b/alumni-simplon.appspot.com/o/bOkg6WL9UpZRZVyyFyJClsV7ikW2.jpg?alt=media&token=dc276103-f329-48da-ad0f-560a5ebe6af3',
		contact: {
			email: 'elodieepiard6@gmail.com',
		},
	},
	{
		id: 'hkhlTGjDsUXXY5mXvtAsd2R0xAm2',
		nom: 'Hurtis',
		prenom: 'Aurèle',
		searchingForAJob:true,
		photoURL:
			'https://firebasestorage.googleapis.com/v0/b/alumni-simplon.appspot.com/o/hkhlTGjDsUXXY5mXvtAsd2R0xAm2.jpg?alt=media&token=587b8fc9-33b9-48c8-989c-e62617ea674f',
		contact: {
			email: 'aurele.hurtis@gmail.com',
		},
	},
	{
		id: 'AofwxGqM4Lf352IX9H78vwxlHE32',
		nom: 'Silva',
		prenom: 'Marvin',
		photoURL:
			'https://firebasestorage.googleapis.com/v0/b/alumni-simplon.appspot.com/o/AofwxGqM4Lf352IX9H78vwxlHE32.jpg?alt=media&token=c0112037-8d27-4149-b3d4-7c7d5524e8b8',
		contact: {
			email: 'dejesusdasilva.marvin@gmail.com',
		},
	},
	{
		id: 'TR3G9JiGZCgyHBfwsJLu5BWeHN42',
		nom: 'Le Duc',
		prenom: 'Vivien',
		photoURL:
			'https://firebasestorage.googleapis.com/v0/b/alumni-simplon.appspot.com/o/TR3G9JiGZCgyHBfwsJLu5BWeHN42.jpg?alt=media&token=a0073893-5869-4de9-82e8-9c6ae74f0c65',
		contact: {
			email: 'leducvivien@gmail.com',
		},
	},
	{
		id: 'TsSQvKWmykcNDKx2TAyv72QGXLN2',
		nom: 'Sehla',
		prenom: 'Amin',
		photoURL:
			'https://firebasestorage.googleapis.com/v0/b/alumni-simplon.appspot.com/o/TsSQvKWmykcNDKx2TAyv72QGXLN2.jpg?alt=media&token=8713eed7-f4b8-4a9f-9270-d2b951d339de',
		contact: {
			email: 'amin.sehla2020@gmail.com',
		},
	},
	{
		id: 'oMUSAEfX6gVDdnJJCwYPwp4qYoi2',
		nom: 'Stempin',
		prenom: 'Matthieu',
		contact: {
			email: 'stempin.matthieu@gmail.com',
		},
	},
	{
		id: 'MNFodJGgnBPjvZZWXN1ZjYRGrzk1',
		nom: 'Blache',
		prenom: 'Alexandre',
		photoURL:
			'https://firebasestorage.googleapis.com/v0/b/alumni-simplon.appspot.com/o/MNFodJGgnBPjvZZWXN1ZjYRGrzk1.jpg?alt=media&token=85b9f7fb-d714-44a5-8407-a3877c79a61f',
		contact: {
			email: 'a.blache@gmail.com',
		},
	},
	{
		id: 'vNmmpraPOBPxO5EJYlE38VK0LvD3',
		nom: 'Valentin',
		prenom: 'Trystan',
		photoURL:
			'https://firebasestorage.googleapis.com/v0/b/alumni-simplon.appspot.com/o/vNmmpraPOBPxO5EJYlE38VK0LvD3.jpg?alt=media&token=90d58611-0f2f-42c3-813c-2ad6cff292c9',
		contact: {
			email: 'trystan.valentin@gmail.com',
		},
	},
	{
		id: 'Cbrs0FaoZoX0cXpICaCu0L6ZwYt1',
		nom: 'Lajdecki',
		prenom: 'Yannick',
		contact: {
			email: 'lajdecki.yannick.simplon@gmail.com',
		},
	},
	{
		id: '9NoKFDBjnDhMSxiqqAHInFF881u2',
		nom: 'Gréaume',
		prenom: 'Romain',
		photoURL:
			'https://firebasestorage.googleapis.com/v0/b/alumni-simplon.appspot.com/o/9NoKFDBjnDhMSxiqqAHInFF881u2.jpg?alt=media&token=fdf1ac53-ac79-40ec-9d5e-ca3449a01f57',
		contact: {
			email: 'romaingreaume@gmail.com',
		},
	},
	{
		id: 'PclVh053x6TNFzKONJRT2VhBqSE3',
		nom: 'Bignon',
		prenom: 'Lucas',
		photoURL:
			'https://firebasestorage.googleapis.com/v0/b/alumni-simplon.appspot.com/o/PclVh053x6TNFzKONJRT2VhBqSE3.jpg?alt=media&token=7481c2c5-14e9-4331-937e-3c13d9090735',
		contact: {
			email: 'bignonlucas.contact@gmail.com',
		},
	},
	{
		id: 'v0xHYvdId8NCHBRez2vmtvcg62y1',
		nom: 'Chasles',
		prenom: 'Gino',
		photoURL:
			'https://firebasestorage.googleapis.com/v0/b/alumni-simplon.appspot.com/o/v0xHYvdId8NCHBRez2vmtvcg62y1.jpg?alt=media&token=79d1b38f-39c9-4ad5-9bb4-d6db5b53f95b',
		contact: {
			email: 'gino.chasles@gmail.com',
		},
	},
	{
		id: '3eVQcOJSPeOIqL3LjUmk1v6OAMU2',
		nom: 'Allain',
		prenom: 'Joseph',
		photoURL:
			'https://firebasestorage.googleapis.com/v0/b/alumni-simplon.appspot.com/o/3eVQcOJSPeOIqL3LjUmk1v6OAMU2.jpg?alt=media&token=04126556-65b4-474f-b112-7e3f3ae32cb3',
		contact: {
			email: 'joseph.allain24@gmail.com',
			cv: "https://cv.jallain.fr",
			phone:"0634394117",
			github: "http://fkzeogfj",
			steam: "fe",
			address:"dzef",
			linkedin: "null",
			discord: "null",
		},
	},
	{
		id: 'RDtdDHlrmQhV0PIkdLg2EW1d0WE3',
		nom: 'Rahmani',
		prenom: 'Yasmina',
		photoURL:
			'https://firebasestorage.googleapis.com/v0/b/alumni-simplon.appspot.com/o/RDtdDHlrmQhV0PIkdLg2EW1d0WE3.jpg?alt=media&token=5a8ba9e4-e8e3-4ce9-9be7-539ddcf309d3',
		contact: {
			email: 'yasmina.rahmani@gmail.com',
		},
	},
	{
		id: 'u4FzVM59uEMcTrXfgdFrOZN0G973',
		nom: 'Huber',
		prenom: 'Aurélie',
		photoURL:
			'https://firebasestorage.googleapis.com/v0/b/alumni-simplon.appspot.com/o/u4FzVM59uEMcTrXfgdFrOZN0G973.jpg?alt=media&token=d4fec9e3-4d63-449b-9a64-0ab191ed516c',
		contact: {
			email: 'aureliehuber2020@gmail.com',
		},
	},
	{
		id: '4tDY0ZXaugXIS4RI1wRMBM9Ninz1',
		nom: 'Deveza',
		prenom: 'Kévin',
		photoURL:
			'https://firebasestorage.googleapis.com/v0/b/alumni-simplon.appspot.com/o/4tDY0ZXaugXIS4RI1wRMBM9Ninz1.jpg?alt=media&token=4dddbf6f-18c8-4816-841b-903cd617e922',
		contact: {
			email: 'kevin.deveza@gmail.com',
		},
	},
	{
		id: 's8GLkTr4jYYDpsLMTWyyWCoNf1Q2',
		nom: 'Bezzaz',
		prenom: 'Noemie',
		contact: {
			email: 'noemie.b.contact@gmail.com',
		},
	},
	{
		id: 'ywhROLcet2SwyxChEYGC9UDgmMz1',
		nom: 'Damene',
		prenom: 'Hamza',
		contact: {
			email: 'damenehamza4@gmail.com',
		},
	},
];