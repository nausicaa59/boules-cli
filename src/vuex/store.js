import Vue from 'vue';
import Vuex from 'vuex';
import joueur from './modules/joueur/joueur';
import app from './modules/app/app';


Vue.use(Vuex)

const store = new Vuex.Store({
	modules : {
		joueur,
		app
	}
})

export default store