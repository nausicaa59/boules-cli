import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import * as actions from './actions';
import {mutations} from './mutations';


const state = {
	joueurs : [],
  	label : "un petit test !",
  	compteur : 0,
  	joueur : {
  		id : null,
  		nom : "",
		prenom : "",
		pseudo : "",
		password : "",
		actif : "",
		email : ""
  	},
  	errorJoueur : {
  		id : 		{ valide:false, erreurs:[] },
  		nom : 		{ valide:false, erreurs:[] },
		prenom : 	{ valide:false, erreurs:[] },
		pseudo : 	{ valide:false, erreurs:[] },
		password : 	{ valide:false, erreurs:[] },
		actif : 	{ valide:false, erreurs:[] },
		email : 	{ valide:false, erreurs:[] }  		
  	}
}

export default {
	namespace: 'joueur/',
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
