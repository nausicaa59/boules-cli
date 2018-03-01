import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import * as actions from './actions';
import {mutations} from './mutations';


const state = {
	currentSection : "",
	flashMessage : {
		display: false,
		type: "",
		label: "",
		compteur: 0
	}
}

export default {
	namespace: 'app/',
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
