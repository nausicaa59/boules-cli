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
				message: "Le prenom est requis"
			},
			min: {
				min:2,
				message: 'Le prenom est trop court'
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
		let test = approve.value(a, {
			required: {
				min:4,
				message: "Aucun auteur sélectionné"
			}
		});

		return formatReponse(test);
	},
};
