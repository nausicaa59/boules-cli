<template>
    <div class="hello">
        <div class="container-page">
            <h1>{{label}}</h1>
            <div class="box">
                <div class="form-group valide">
                    <label>Saison :</label>
                    <select v-model="saison" class="form-control" disabled>
                        <option v-bind:value="saison">{{ this.nom_saison }}</option>
                    </select>
                </div>
                <div class="form-group" v-bind:class="classInError(erreurs().nom.valide)">
                    <label>Nom du challenge :</label>
                    <input type="text" v-model="nom" class="form-control">
                    <small class="form-text text-muted">{{erreurs().nom.erreurs.join(" | ")}}</small>
                </div>
                <div class="form-group" v-bind:class="classInError(erreurs().date_start.valide)">
                    <label>Date du challenge :</label>
                    <datepicker v-model="date_start" language="fr" input-class="form-control"></datepicker>
                    <small class="form-text text-muted">{{erreurs().date_start.erreurs.join(" | ")}}</small>
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
    name: 'JoueurForm',
    components: {
        Datepicker
    },
    data () {
        return {
            mode : "post",
            id : 0,
            date_start : "",
            nom : "",
            saison : 0,
            nom_saison : ""
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
                nom : this.nom,
                saison : this.saison            
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
                this.setFlashError(["Erreur de données", true]);
            }

            if(error.request.status == 500) {
                this.setFlashError(["Erreur serveur", true]);
            }

            if(error.request.status == 404 || error.request.status == 0) {
                console.log(error.response.data);
                this.setFlashError(["Erreur service introuvable", true]);
            } 
        },
        displaySuccess(msg) {
            this.setFlashSuccess([msg, true])
            this.$router.push({ name: 'ChallengesBySaisonList', params:{id_saison : this.saison} });   
        },
        save: function() {
            if(this.mode == "post") {
                this.post();
            }

            /*if(this.mode == "put") {
                this.put();
            }*/
        },
        getSaison : function(id) {
            var that = this;
            axios.get("http://127.0.0.1:5000/saison/" + id)
                .then(function (response) {
                    that.nom_saison = response.data.nom;
                })
                .catch(function (error) {
                    that.displayError(error);          
                });  
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
            /*var that = this;
            axios.put("http://127.0.0.1:5000/saison/" + this.id, this.getAll())
                .then(function (response) {
                    that.displaySuccess("Saison éditée !");
                })
                .catch(function (error) {
                    that.displayError(error);          
                });*/  
        },
        post: function(data) {
            var that = this;
            axios.post("http://127.0.0.1:5000/challenge", this.getAll())
                .then(function (response) {
                    that.displaySuccess("Challenge créer !");
                })
                .catch(function (error) {
                    that.displayError(error);          
                });  
        },
        erreurs : function() {
            return {
                date_start  : validationSaison.date_start(this.date_start),
                nom         : validationSaison.nom(this.nom)
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
        this.setCurrentSection("Challenge");
        this.clearFlashMessage();

        if(this.$route.params.id == undefined && this.$route.params.id_saison == undefined) {
            this.setFlashError(["Erreur service introuvable", true]);
            this.$router.push({ name: 'JoueursList' });
        }


        if(this.$route.params.id_saison != undefined) {
            this.mode = "post";
            this.label = "Créer un challenge";
            this.label_bt = "Créer";
            this.saison = parseInt(this.$route.params.id_saison);
            this.getSaison(this.saison);
        }

        if(this.$route.params.id != undefined) {
            this.mode = "put";
            //this.getById(this.$route.params.id);
            this.label = "Editer un challenge";
            this.label_bt = "Editer";
        }
    }
}
</script>



<style scoped lang="less">

</style>
