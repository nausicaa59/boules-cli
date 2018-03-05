<template>
    <div class="hello">
        <div class="container-page">
            <h1>{{label}}</h1>
            <div class="box">
                <div class="form-group" v-bind:class="classInError(erreurs().date_start.valide)">
                    <label>Date de début :</label>
                    <datepicker v-model="date_start" language="fr" input-class="form-control"></datepicker>
                    <small class="form-text text-muted">{{erreurs().date_start.erreurs.join(" | ")}}</small>
                </div>
                <div class="form-group" v-bind:class="classInError(erreurs().date_close.valide)">
                    <label>Date de fin :</label>
                    <datepicker v-model="date_close" language="fr" input-class="form-control"></datepicker>
                    <small class="form-text text-muted">{{erreurs().date_close.erreurs.join(" | ")}}</small>
                </div>
                <div class="form-group" v-bind:class="classInError(erreurs().nom.valide)">
                    <label>Nom de la saison</label>
                    <input v-model="nom" class="form-control">
                    <small class="form-text text-muted">{{erreurs().nom.erreurs.join(" | ")}}</small>
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
import {validationSaison} from '../validation/validation';
import axios from 'axios'
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';

export default {
    name: 'saisonForm',
    components: {
        Datepicker
    },
    data () {
        return {
            mode : "post",
            id : 0,
            date_start : "",
            date_close : "",
            nom : ""
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
                date_start : moment(this.date_start).format('YYYY-MM-DD'),
                date_close : moment(this.date_close).format('YYYY-MM-DD'),
                nom : this.nom            
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
            axios.get("http://127.0.0.1:5000/saison/" + id)
                .then(function (response) {
                    that.id = response.data.id;
                    that.date_start = response.data.date_start;
                    that.date_close = response.data.date_close;
                    that.nom = response.data.nom;
                })
                .catch(function (error) {
                    that.displayError(error);          
                });  
        },
        put: function(data) {
            var that = this;
            axios.put("http://127.0.0.1:5000/saison/" + this.id, this.getAll())
                .then(function (response) {
                    that.setFlashSuccess(["Saison bien éditée !", true]);
                    that.$router.push({ name: 'SaisonsList' });
                })
                .catch(function (error) {
                    that.displayError(error);          
                });  
        },
        post: function(data) {
            var that = this;
            axios.post("http://127.0.0.1:5000/saison", this.getAll())
                .then(function (response) {
                    that.setFlashSuccess(["Saison bien créer !", true]);
                    that.$router.push({ name: 'SaisonsList' }); 
                })
                .catch(function (error) {
                    that.displayError(error);          
                });  
        },
        erreurs : function() {
            return {
                date_start    : validationSaison.date_start(this.date_start),
                date_close    : validationSaison.date_close(this.date_close),
                nom           : validationSaison.nom(this.nom)
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
    },
    created() {
        this.setCurrentSection("saison");
        this.clearFlashMessage();

        if(this.$route.params.id == undefined) {
            this.mode = "post";
            this.label = "Créer une saison";
            this.label_bt = "Créer";
        } else {
            this.mode = "put";
            this.getById(this.$route.params.id);
            this.label = "Editer une saison";
            this.label_bt = "Editer";
        }
    }
}
</script>



<style scoped lang="less">
</style>
