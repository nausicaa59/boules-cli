import approve from 'approvejs';

function formatReponse(test) {
	return {
		valide : test.approved,
		erreurs : test.errors
	};
}

export var validationJoueur = {
	nom:function(a){
		let test = approve.value(a, {
			required: {
				required: true,
				message: "Le nom est requis"
			},
			min: {
				min:2,
				message: 'Le nom est trop court'
			}
		});

		return formatReponse(test);
	},
	prenom:function(a){
		let test = approve.value(a, {
			required: {
				required: true,
				message: "Le prénom est requis"
			},
			min: {
				min:2,
				message: 'Le prénom est trop court'
			}
		});

		return formatReponse(test);
	},
	pseudo:function(a){
		let test = approve.value(a, {
			required: {
				required: true,
				message: "Le pseudo est requis"
			},
			min: {
				min:2,
				message: 'Le pseudo est trop court'
			}
		});

		return formatReponse(test);
	},
	password:function(a){
		let test = approve.value(a, {
			required: {
				required: true,
				message: "Le password est requis"
			},
			min: {
				min:4,
				message: 'Le password est trop court'
			}
		});

		return formatReponse(test);
	},	            
	actif:function(a){
		let test = approve.value(a, {
			required: {
				required: true,
				message: "Le status d'activité est requis"
			}
		});

		return formatReponse(test);
	},
	email:function(a){
		if(a == "") {
			return {
				valide : true,
				erreurs : []				
			};
		}

		let test = approve.value(a, {
			email: {
				message: "Le champs n'est pas un emai valide"
			}
		});

		return formatReponse(test);
	},
};


export var validationSaison = {
	date_start:function(a){
		let test = approve.value(a, {
			required: {
				required: true,
				message: "La date de début est requise"
			}
		});

		return formatReponse(test);
	},
	date_close:function(a){
		let test = approve.value(a, {
			required: {
				required: true,
				message: "La date de fin est requise"
			}
		});

		return formatReponse(test);
	},
	nom:function(a){
		let test = approve.value(a, {
			required: {
				required: true,
				message: "Le nom de la saison est requis"
			},
			min: {
				min:2,
				message: 'Le nom de la saison est trop court'
			}
		});

		return formatReponse(test);
	},
}