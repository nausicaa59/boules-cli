<template>
    <div class="hello">
        <div class="container-page">
            <h1>Créer un joueur</h1>
            <div class="box">
                <div class="form-group" v-bind:class="classInError(erreurs().nom.valide)">
                    <label for="joueurNom">Nom :</label>
                    <input type="text" class="form-control" id="joueurNom" v-model="nom">
                    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group" v-bind:class="classInError(erreurs().prenom.valide)">
                    <label for="joueurPrenom">Prenom :</label>
                    <input type="text" class="form-control" id="joueurPrenom" v-model="prenom">
                    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group" v-bind:class="classInError(erreurs().pseudo.valide)">
                    <label for="joueurPseudo">Pseudo :</label>
                    <input type="text" class="form-control" id="joueurPseudo" v-model="pseudo" readonly>
                    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group" v-bind:class="classInError(erreurs().password.valide)">
                    <label for="joueurPassword">Password :</label>
                    <input type="text" class="form-control" id="joueurPassword" v-model="password">
                    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group" v-bind:class="classInError(erreurs().email.valide)">
                    <label for="joueurEmail">Email :</label>
                    <input type="text" class="form-control" id="joueurEmail" v-model="email">
                    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <button class="btn">Créer</button>
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import {validationJoueur} from '../validation/validation';

export default {
    name: 'JoueurForm',
    data () {
        return {
            mode : "post",
            id : 0,
            nom : "",
            prenom : "",
            password : "",
            actif : "",
            email : "",
        }
    },
    methods : {
        ...mapMutations("app", [
            "setFlashMessage",
            "clearFlashMessage"
        ]),
        classInError: function(isValide) {
            return {
                'valide': isValide,
                'err': !isValide,
            }
        },
        btInError: function(isValide) {
            return {
                'btn-success': isValide,
            }
        },
        displayError(error) {
            if(error.request.status == 400) {
                this.setErrorsArray("setErrorsArray", error.response.data);
            }

            if(error.request.status == 500) {
                this.setFlashMessage({
                    "type" : "error",
                    "label" : "Erreur serveur",
                    "persistant" : false
                });
            }

            if(error.request.status == 404 || error.request.status == 0) {
                this.setFlashMessage({
                    "type" : "error",
                    "label" : "Erreur service introuvable",
                    "persistant" : false
                });
            } 
        },
        displaySuccess(msg) {
            this.setFlashMessage({
                "type" : "success",
                "label" : msg,
                "persistant" : false
            });
            this.$router.push({ name: 'JoueursList' });   
        },
        save: function() {
            if(this.mode == "post") {
                this.post();
            }

            if(this.mode == "put") {
                this.put();
            }
        },
        post: function() {
            var that = this;
            this.clearFlashMessage();
            this.createArticle()
                .then(function (response) {
                    that.displaySuccess("Joueur créer !");
                })
                .catch(function (error) {
                    that.displayError(error);          
                });  
        },
        erreurs : function () {
            return {
                nom       : validationJoueur.nom(this.nom),
                prenom    : validationJoueur.prenom(this.prenom),
                pseudo    : validationJoueur.pseudo(this.pseudo),
                password  : validationJoueur.password(this.password),
                actif     : validationJoueur.actif(this.actif),
                email     : validationJoueur.email(this.email),
            }
        }
    },
    computed : {
        pseudo: {
            get: function () {
                return this.nom + '.' + this.prenom
            },
            set: function (newValue) {

            }
        }
    },
    created() {
        this.clearFlashMessage();
        console.log(this.$route.params);
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
        border-left: 4px solid #449d44;
    }
}
</style>
