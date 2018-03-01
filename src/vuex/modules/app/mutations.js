import {validationJoueur} from '../../../validation/validation';


export const mutations = {
	setCurrentSection: (state, vals) => {
		state.currentSection 	= vals;
	},
	setFlashMessage: (state, vals) => {
		state.flashMessage.type 	= vals.type;
	    state.flashMessage.label 	= vals.label;
	    state.flashMessage.display 	= true;
	    state.flashMessage.compteur = (vals.persistant) ? 1 : 0;
	},
	setFlashError: (state, vals) => {
	    state.flashMessage.type 	= "error";
	    state.flashMessage.label 	= vals[0];
	    state.flashMessage.display 	= true;
	    state.flashMessage.compteur = vals[1] ? 0 : 1;
	},
	setFlashSuccess: (state, vals) => {
		state.flashMessage.type 	= "success";
	    state.flashMessage.label 	= vals[0];
	    state.flashMessage.display 	= true;
	    state.flashMessage.compteur = vals[1] ? 0 : 1;
	},
	clearFlashMessage: (state) => {
	    if(state.flashMessage.display) {
	    	state.flashMessage.compteur += 1;
	    }	    

	    if(state.flashMessage.compteur > 1) {
	    	state.flashMessage.display 	= false;
	    	state.flashMessage.compteur = 0;
	    	state.flashMessage.type 	= "";
	    	state.flashMessage.label 	= "";
	    }	    
	},
}
