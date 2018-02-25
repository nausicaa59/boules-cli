import axios from 'axios'

export const getAll = ({ commit, getters }) => {
	var urlRecherche = "http://127.0.0.1:5000/joueur";
	axios.get(urlRecherche)
		.then(function (response) {
			commit("setJoueurs", response.data);
		})
		.catch(function (error) {   
			console.log("erreur !"); 
		});  
}
