export default {
	label				:	state => state.label,
	joueurs				: 	state => state.joueurs,
	joueur 				: 	state => state.joueur,
	joueur_id 			: 	state => state.joueur.id,
	joueur_nom 			: 	state => state.joueur.nom,
	joueur_prenom 		: 	state => state.joueur.prenom,
	joueur_pseudo 		: 	state => state.joueur.pseudo,
	joueur_password 	: 	state => state.joueur.password,
	joueur_actif 		: 	state => state.joueur.actif,
	joueur_email 		: 	state => state.joueur.email,
	joueur_nom_errors 		: 	state => state.errorJoueur.nom,
	joueur_prenom_errors 	: 	state => state.errorJoueur.prenom,
	joueur_pseudo_errors 	: 	state => state.errorJoueur.pseudo,
	joueur_password_errors 	: 	state => state.errorJoueur.password,
	joueur_actif_errors		: 	state => state.errorJoueur.actif,
	joueur_email_errors 	: 	state => state.errorJoueur.email
}