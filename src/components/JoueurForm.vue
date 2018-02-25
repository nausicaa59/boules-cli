<template>
    <div class="hello">
        <div class="container-page">
            <h1>Créer un joueur</h1>
            <div class="box">
                <div class="form-group" v-bind:class="classInError(joueur_nom_errors().valide)">
                    <label for="joueurNom">Nom :</label>
                    <input type="text" class="form-control" id="joueurNom" v-model="nom">
                    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group" v-bind:class="classInError(joueur_prenom_errors().valide)">
                    <label for="joueurPrenom">Prenom :</label>
                    <input type="text" class="form-control" id="joueurPrenom" v-model="prenom">
                    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group" v-bind:class="classInError(joueur_pseudo_errors().valide)">
                    <label for="joueurPseudo">Pseudo :</label>
                    <input type="text" class="form-control" id="joueurPseudo" v-model="pseudo" readonly>
                    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group" v-bind:class="classInError(joueur_password_errors().valide)">
                    <label for="joueurPassword">Password :</label>
                    <input type="text" class="form-control" id="joueurPassword" v-model="password">
                    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group" v-bind:class="classInError(joueur_email_errors().valide)">
                    <label for="joueurEmail">Email :</label>
                    <input type="text" class="form-control" id="joueurEmail" v-model="email">
                    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    name: 'JoueurForm',
    data () {
        return {

        }
    },
    methods : {
        ...mapGetters("joueur", [
            "joueur",
            "joueur_id",
            "joueur_nom",
            "joueur_prenom",
            "joueur_pseudo",
            "joueur_password",
            "joueur_actif",
            "joueur_email",
            "joueur_nom_errors",
            "joueur_prenom_errors",
            "joueur_pseudo_errors",
            "joueur_password_errors",
            "joueur_actif_errors",
            "joueur_email_errors"
        ]),
        ...mapActions("joueur",[
            "getAll"
        ]),
        ...mapMutations("joueur", [
            "setJoueurId",
            "setJoueurNom",
            "setJoueurPrenom",
            "setJoueurPseudo",
            "setJoueurPassword",
            "setJoueurActif",
            "setJoueurEmail",
            "controllerJoueurNom",
            "controllerJoueurPrenom",
            "controllerJoueurPseudo",
            "controllerJoueurPassword",
            "controllerJoueurActif",
            "controllerJoueurEmail"          
        ]),
        autoPseudo : function(){
            let combine = this.joueur_nom() + "." + this.joueur_prenom();
            this.setJoueurPseudo(combine);
            this.controllerJoueurPseudo();
        },
        classInError: function (isValide) {
            return {
                'valide': isValide,
                'err': !isValide,
            }
        }
    },
    computed : {
        nom: {
            get () {
                return this.joueur_nom();
            },
            set (value) {
                this.setJoueurNom(value);
                this.autoPseudo();
                this.controllerJoueurNom();
            }
        },
        prenom: {
            get () {
                return this.joueur_prenom();
            },
            set (value) {
                this.setJoueurPrenom(value);
                this.controllerJoueurPrenom();
                this.autoPseudo();
            }
        },
        pseudo: {
            get () {
                return this.joueur_pseudo();
            },
            set (value) {
                this.setJoueurPseudo(value);
            }
        },
        password: {
            get () {
                return this.joueur_password();
            },
            set (value) {
                this.setJoueurPassword(value);
                this.controllerJoueurPassword();
            }
        },
        email: {
            get () {
                return this.joueur_email();
            },
            set (value) {
                this.setJoueurEmail(value);
                this.controllerJoueurEmail();
            }
        },
    },
    created() {

    }
}
</script>



<style scoped lang="less">
.form-group
{
    padding-top: 20px;

    label
    {
        font-weight: bold;
    }

    input
    {
        border-radius: 0px;
        border-left: 4px solid #d1d1d1;
    }

    &:first-child 
    {
        padding-top: 0px;
    }

    &.err input
    {
        border-left: 4px solid red;
    }

    &.valide input
    {
        border-left: 4px solid green;
    }
}
</style>
