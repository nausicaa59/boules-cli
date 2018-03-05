<template>
    <div class="hello">
        <div class="container-page">
            <h1>Liste des challenges</h1>
            <div class="box">
                <div class="form-group">
                    <select class="form-control" id="liste_saison" v-model="currentSaison" v-on:change="changeSaison()">
                        <option v-for="saison in saisons" v-bind:value="saison.id">
                            {{ saison.nom }}
                        </option>                        
                    </select>
                    <router-link :to="{ name: 'ChallengeForm', params:{id_saison : currentSaison} }" class="btn btn-success">Créer un challenge</router-link>
                </div>             
                <table class="table">
                    <thead>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Saison</th>
                        <th>Date Debut</th>
                        <th>Nb participant</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr v-for="challenge in challenges">
                            <td>{{challenge.id}}</td>
                            <td>{{challenge.nom}}</td>
                            <td>{{challenge.saison.nom}}</td>
                            <td>{{challenge.date_start}}</td>
                            <td>{{challenge.nb_joueur}}</td>
                            <td>
                                <router-link :to="{ name: 'JoueurFormEdit', params:{id : challenge.id} }" class="btn btn-secondary">Voir le classement</router-link>
                                <router-link :to="{ name: 'JoueurFormEdit', params:{id : challenge.id} }" class="btn btn-info">Saisir les scores</router-link>
                                <router-link :to="{ name: 'JoueurFormEdit', params:{id : challenge.id} }" class="btn btn-secondary">Editer</router-link>
                                <button class="btn btn-danger" href="#" role="button" v-on:click="delet(challenge.id)" v-bind:disabled="challenge.nb_joueur > 0">Supprimer</button>       
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<script>
import { mapMutations } from 'vuex';
import axios from 'axios';
import moment from 'moment';

export default {
    name: 'ChallengesList',
    data () {
        return {
            currentSaison : 0,
            saisons : [],
            challenges : []
        }
    },
    methods : {
        ...mapMutations("app", [
            "clearFlashMessage",
            "setFlashError",
            "setFlashSuccess",
            "setCurrentSection"
        ]),
        changeSaison: function() {
            var that = this;
            axios.get("http://127.0.0.1:5000/saison/" + this.currentSaison + "/challenges")
                .then(function (response) {
                    that.challenges = response.data;
                })
                .catch(function (error) {   
                    console.log("erreur !"); 
                });   
        },
        initialisation: function() {
            var that = this;
            axios.get("http://127.0.0.1:5000/saison")
                .then(function (response) {
                    that.saisons = response.data;
                    that.currentSaison = that.saisons[0].id;
                })
                .catch(function (error) {   
                    console.log("erreur !"); 
                });
        },
        delet : function(id) {

        },
        removeElement : function(id) {
            let i = this.challenges.findIndex(function(e) {
                return (e.id == id);
            })

            if(i != -1) {
                this.challenges.splice(i,1);
            }
        },
        displayDate : function(d) {
            return moment(d).format("YYYY-MM-DD");
        },
    },
    created() {
        this.setCurrentSection("challenge");
        this.clearFlashMessage();
        
        var that = this;
        axios.get("http://127.0.0.1:5000/saison")
            .then(function (response) {
                let defaultSaison = that.$route.params.id_saison;
                that.saisons = response.data;
                that.currentSaison = (defaultSaison != undefined) ? parseInt(defaultSaison) : that.saisons[0].id;
                that.changeSaison();
            })
            .catch(function (error) {   
                console.log("erreur !"); 
            });       
    },
}
</script>



<style scoped lang="less">
#liste_saison {
    width: 30%;
    min-width: 300px;
    display: inline-block;
}

.btn.btn-success {
    display: inline-block;
    margin-left: 20px;
}
</style>
