import {validationJoueur} from '../../../validation/validation';


export const mutations = {
	setLabel: (state, vals) => {
	    state.label = vals;
	},
	setJoueurs: (state, vals) => {
	    state.joueurs = vals;
	},
	setCompteur: (state, vals) => {
		console.log(state.compteur);
	    state.compteur += vals;
	},
	setJoueurId: (state, vals) => {
	    state.joueur.id = vals;
	},
	setJoueurNom: (state, vals) => {
	    state.joueur.nom = vals;
	},
	setJoueurPrenom: (state, vals) => {
	    state.joueur.prenom = vals;
	},
	setJoueurPseudo: (state, vals) => {
	    state.joueur.pseudo = vals;
	},
	setJoueurPassword: (state, vals) => {
	    state.joueur.password = vals;
	},
	setJoueurActif: (state, vals) => {
	    state.joueur.actif = vals;
	},
	setJoueurEmail: (state, vals) => {
	    state.joueur.email = vals;
	},
	controllerJoueurNom: (state) => {
		let test = validationJoueur.nom(state.joueur.nom);
	    state.errorJoueur.nom.valide = test.valide;
	    state.errorJoueur.nom.erreurs = test.erreurs;
	},
	controllerJoueurPrenom: (state, vals) => {
		let test = validationJoueur.prenom(state.joueur.prenom);
	    state.errorJoueur.prenom.valide = test.valide;
	    state.errorJoueur.prenom.erreurs = test.erreurs;
	},
	controllerJoueurPseudo: (state, vals) => {
		let test = validationJoueur.pseudo(state.joueur.pseudo);
	    state.errorJoueur.pseudo.valide = test.valide;
	    state.errorJoueur.pseudo.erreurs = test.erreurs;
	},
	controllerJoueurPassword: (state, vals) => {
		let test = validationJoueur.password(state.joueur.password);
	    state.errorJoueur.password.valide = test.valide;
	    state.errorJoueur.password.erreurs = test.erreurs;
	},
	controllerJoueurActif: (state, vals) => {
		let test = validationJoueur.actif(state.joueur.actif);
	    state.errorJoueur.actif.valide = test.valide;
	    state.errorJoueur.actif.erreurs = test.erreurs;
	},
	controllerJoueurEmail: (state, vals) => {
		let test = validationJoueur.email(state.joueur.email);
	    state.errorJoueur.email.valide = test.valide;
	    state.errorJoueur.email.erreurs = test.erreurs;
	},
}
