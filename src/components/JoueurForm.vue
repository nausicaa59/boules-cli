<template>
    <div class="hello">
        <div class="container-page">
            <h1>{{label}}</h1>
            <div class="box">
                <div class="form-group" v-bind:class="classInError(erreurs().nom.valide)">
                    <label>Nom :</label>
                    <input type="text" class="form-control" v-model="nom">
                    <small class="form-text text-muted">{{erreurs().nom.erreurs.join(" | ")}}</small>
                </div>
                <div class="form-group" v-bind:class="classInError(erreurs().prenom.valide)">
                    <label>Prenom :</label>
                    <input type="text" class="form-control" v-model="prenom">
                    <small class="form-text text-muted">{{erreurs().prenom.erreurs.join(" | ")}}</small>
                </div>
                <div class="form-group" v-bind:class="classInError(erreurs().pseudo.valide)">
                    <label>Pseudo :</label>
                    <input type="text" class="form-control" v-model="pseudo" readonly>
                    <small class="form-text text-muted">{{erreurs().pseudo.erreurs.join(" | ")}}</small>
                </div>
                <div class="form-group" v-bind:class="classInError(erreurs().password.valide)">
                    <label>Password :</label>
                    <input type="text" class="form-control" v-model="password">
                    <small class="form-text text-muted">{{erreurs().password.erreurs.join(" | ")}}</small>
                </div>
                <div class="form-group" v-bind:class="classInError(erreurs().email.valide)">
                    <label>Email :</label>
                    <input type="text" class="form-control" v-model="email">
                    <small class="form-text text-muted">{{erreurs().email.erreurs.join(" | ")}}</small>
                </div>
                <div class="form-group">
                    <button class="btn" v-on:click="save()" v-bind:class="btInError(formErrors())" v-bind:disabled="!formErrors()">{{label_bt}}</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { mapMutations } from 'vuex';
import {validationJoueur} from '../validation/validation';
import axios from 'axios'

export default {
    name: 'JoueurForm',
    data () {
        return {
            mode : "post",
            id : 0,
            nom : "",
            prenom : "",
            password : "",
            actif : 1,
            email : "",
            label : "",
            label_bt : ""
        }
    },
    methods : {
        ...mapMutations("app", [
            "setFlashError",
            "setFlashSuccess",
            "clearFlashMessage",
            "setCurrentSection"
        ]),
        getAll: function() {
            return {
                nom : this.nom,
                prenom : this.prenom,
                password : this.password,
                actif : this.actif,
                email : this.email,
                actif : this.actif,
                pseudo : this.pseudo                
            }      
        },
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
                console.log(error.response.data);
            }

            if(error.request.status == 500) {
                this.setFlashError(["Erreur serveur", true]);
            }

            if(error.request.status == 404 || error.request.status == 0) {
                this.setFlashError(["Erreur service introuvable", true]);
            } 
        },
        displaySuccess(msg) {
            this.setFlashSuccess([msg, true])
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
        getById : function(id) {
            var that = this;
            axios.get("http://127.0.0.1:5000/joueur/" + id)
                .then(function (response) {
                    that.id = response.data.id;
                    that.nom = response.data.nom;
                    that.prenom = response.data.prenom;
                    that.password = response.data.password;
                    that.actif = response.data.actif;
                    that.email = response.data.email;
                })
                .catch(function (error) {
                    that.displayError(error);          
                });  
        },
        put: function(data) {
            var that = this;
            axios.put("http://127.0.0.1:5000/joueur/" + this.id, this.getAll())
                .then(function (response) {
                    that.displaySuccess("Joueur édité !");
                })
                .catch(function (error) {
                    that.displayError(error);          
                });  
        },
        post: function(data) {
            var that = this;
            axios.post("http://127.0.0.1:5000/joueur", this.getAll())
                .then(function (response) {
                    that.displaySuccess("Joueur créer !");
                })
                .catch(function (error) {
                    that.displayError(error);          
                });  
        },
        erreurs : function() {
            return {
                nom       : validationJoueur.nom(this.nom),
                prenom    : validationJoueur.prenom(this.prenom),
                pseudo    : validationJoueur.pseudo(this.pseudo),
                password  : validationJoueur.password(this.password),
                actif     : validationJoueur.actif(this.actif),
                email     : validationJoueur.email(this.email),
            }
        },
        formErrors : function(){
            let erreurs = this.erreurs();
            for(var k in erreurs) {
                if(!erreurs[k].valide){
                    return false;
                }
            }

            return true;
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
        this.setCurrentSection("joueur");
        this.clearFlashMessage();

        if(this.$route.params.id == undefined) {
            this.mode = "post";
            this.label = "Créer un joueur";
            this.label_bt = "Créer";
        } else {
            this.mode = "put";
            this.getById(this.$route.params.id);
            this.label = "Editer un joueur";
            this.label_bt = "Editer";
        }
    }
}
</script>



<style scoped lang="less">
</style>
