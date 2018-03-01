<template>
    <div class="hello">
        <div class="container-page">
            <h1>Liste des saisons</h1>
            <div class="box">
                <div class="box-action">
                    <router-link :to="{ name: 'SaisonForm'}" class="btn btn-success">Créer une saison</router-link>
                </div>                
                <table class="table table_joueur">
                    <thead>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Date début</th>
                        <th>Date Fin</th>
                        <th>Nb. Challenge</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr v-for="saison in saisons" v-bind:class="isCurrentSaison(saison.date_start,saison.date_close)">
                            <td>{{saison.id}}</td>
                            <td>{{saison.nom}}</td>
                            <td>{{displayDate(saison.date_start)}}</td>
                            <td>{{displayDate(saison.date_close)}}</td>
                            <td>{{saison.nbChallenge}}</td>
                            <td>
                                <router-link :to="{ name: 'SaisonFormEdit', params:{id : saison.id}}" class="btn btn-secondary">Editer</router-link>
                                <button class="btn btn-danger" href="#" role="button" v-bind:disabled="parseInt(saison.nbChallenge) > 0" v-on:click="delet(saison.id)">Supprimer</button>
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
    name: 'SaisonsList',
    data () {
        return {
            saisons: []
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
            var that = this;
            axios.get("http://127.0.0.1:5000/saison")
                .then(function (response) {
                    that.saisons = response.data;
                })
                .catch(function (error) {   
                    console.log("erreur !"); 
                }); 
        },
        delet : function(id) {
            if(!confirm("Voulez-vous vraiment supprimer la saison ?")) {
                return true;
            }

            var that = this;
            axios.delete("http://127.0.0.1:5000/saison/" + id)
                .then(function (response) {
                    that.setFlashSuccess(["saison bien supprimée !", false]);
                    that.removeElement(id);
                })
                .catch(function (error) {
                    var msg = (error.request.status == 404) ? error.response.data[0] : "erreur serveur";
                    that.setFlashError([msg], false);                   
                });
        },
        removeElement : function(id) {
            let i = this.saisons.findIndex(function(e) {
                return (e.id == id);
            })

            if(i != -1) {
                this.saisons.splice(i,1);
            }
        },
        displayDate : function(d) {
            return moment(d).format("YYYY-MM-DD");
        },
        isCurrentSaison : function(d, f) {
            return {
                "isCurrentSaison" : moment().isBetween(d, f),
                "otherSaison" : !moment().isBetween(d, f)
            };
        }
    },
    created() {
        this.setCurrentSection("saison");
        this.clearFlashMessage();
        this.getAll();
    },
}
</script>



<style scoped lang="less">
.isCurrentSaison {
    font-weight: bold;
    color:black;
}

.otherSaison
{
    color:#6c6c6d;
}
</style>
