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
                <div class="form-group" v-bind:class="classInError(erreurs().date_close.valide)">
                    <label>Type de challenge</label>
                    <select class="form-control">
                        <option>Challenge Classique</option>
                        <option>Challenge +60 ans</option>
                    </select>
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

export default {
    name: 'JoueurForm',
    components: {
        Datepicker
    },
    data () {
        return {
            mode : "post",
            id : 0,
            date_start : "",
            date_close : "",
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
                date_start : this.date_start,
                date_close : this.date_close            
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
            console.log(this.getAll());
            /*if(this.mode == "post") {
                this.post();
            }

            if(this.mode == "put") {
                this.put();
            }*/
        },
        getById : function(id) {
            /*var that = this;
            axios.get("http://127.0.0.1:5000/saison/" + id)
                .then(function (response) {
                    that.id = response.data.id;
                    that.date_start = response.data.date_start;
                    that.date_close = response.data.date_close;
                })
                .catch(function (error) {
                    that.displayError(error);          
                });*/  
        },
        put: function(data) {
            var that = this;
            axios.put("http://127.0.0.1:5000/saison/" + this.id, this.getAll())
                .then(function (response) {
                    that.displaySuccess("Saison éditée !");
                })
                .catch(function (error) {
                    that.displayError(error);          
                });  
        },
        post: function(data) {
            var that = this;
            axios.post("http://127.0.0.1:5000/saison", this.getAll())
                .then(function (response) {
                    that.displaySuccess("Saison créer !");
                })
                .catch(function (error) {
                    that.displayError(error);          
                });  
        },
        erreurs : function() {
            return {
                date_start    : validationSaison.date_start(this.date_start),
                date_close    : validationSaison.date_close(this.date_close)
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
