import Vue from 'vue';
import Vuex from 'vuex';
import joueur from './modules/joueur/joueur';

Vue.use(Vuex)

const store = new Vuex.Store({
	modules : {
		joueur
	}
})

export default store