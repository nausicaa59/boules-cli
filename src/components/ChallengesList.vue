<template>
    <div class="hello">
        <div class="container-page">
            <h1>Liste des challenges</h1>
            <div class="box">
                <div class="form-group">
                    <select class="form-control" id="liste_saison">
                        <option v-for="saison in saisons" v-bind:value="saison.id">
                            {{ saison.nom }}
                        </option>                        
                    </select>
                    <router-link :to="{ name: 'ChallengeForm'}" class="btn btn-success">Créer un challenge</router-link>
                </div>             
                <table class="table">
                    <thead>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Date Debut</th>
                        <th>Nb participant</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr v-for="challenge in challenges">
                            <td>{{challenge.id}}</td>
                            <td>{{challenge.nom}}</td>
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
        getAll : function() {
            /*var that = this;
            axios.get("http://127.0.0.1:5000/saison")
                .then(function (response) {
                    that.joueurs = response.data;
                })
                .catch(function (error) {   
                    console.log("erreur !"); 
                });*/ 
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

        this.saisons = [
            {id : 1, nom : "Saison 2017 - Normal"},
            {id : 2, nom : "Saison 2018 - Normal"},
            {id : 3, nom : "Saison 2019 - Normal"},
            {id : 4, nom : "Saison 2020 - Normal"},
        ] 

        this.challenges = [
            {id : 1, nom : "Challenge 1", date_start : "2007-02-01", nb_joueur : 0},
            {id : 2, nom : "Challenge 2", date_start : "2007-03-01", nb_joueur : 10},
            {id : 3, nom : "Challenge 3", date_start : "2007-04-01", nb_joueur : 15},
            {id : 4, nom : "Challenge 4", date_start : "2007-05-01", nb_joueur : 10},
            {id : 5, nom : "Challenge 5", date_start : "2007-06-01", nb_joueur : 0},
            {id : 6, nom : "Challenge 6", date_start : "2007-07-01", nb_joueur : 20},
            {id : 7, nom : "Challenge 7", date_start : "2007-08-01", nb_joueur : 15},
            {id : 8, nom : "Challenge 8", date_start : "2007-09-01", nb_joueur : 10},
            {id : 9, nom : "Challenge 9", date_start : "2007-10-01", nb_joueur : 10}
        ]       
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
