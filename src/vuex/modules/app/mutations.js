import {validationJoueur} from '../../../validation/validation';


export const mutations = {
	setFlashMessage: (state, vals) => {
	    state.flashMessage.type 	= vals.type;
	    state.flashMessage.label 	= vals.label;
	    state.flashMessage.display 	= true;
	    state.flashMessage.compteur = (vals.persistant) ? 1 : 0;
	},
	clearFlashMessage: (state) => {
	    state.flashMessage.type 	= "";
	    state.flashMessage.label 	= "";
	    state.flashMessage.compteur += 1;

	    if(state.flashMessage.compteur > 1) {
	    	state.flashMessage.display 	= false;
	    	state.flashMessage.compteur = 0;
	    }	    
	},
}
