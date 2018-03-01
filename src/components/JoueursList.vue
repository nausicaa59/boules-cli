<template>
    <div class="hello">
        <div class="container-page">
            <h1>Liste des joueurs</h1>
            <div class="box">
                <div class="box-action">
                    <router-link :to="{ name: 'JoueurForm'}" class="btn btn-success">Créer un joueur</router-link>
                </div>                
                <table class="table table_joueur">
                    <thead>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Actif</th>
                        <th>Nb Challenge</th>
                        <th>Dernière participation</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr v-for="joueur in joueurs">
                            <td>{{joueur.id}}</td>
                            <td>{{joueur.nom}}</td>
                            <td>{{joueur.prenom}}</td>
                            <td>
                                <span class="actif" v-if="joueur.actif == 1">Oui</span>
                                <span class="innactif" v-if="joueur.actif == 0">Non</span>
                            </td>
                            <td>{{joueur.nbChallenge}}</td>
                            <td>{{joueur.lastParticipation}}</td>
                            <td>
                                <router-link :to="{ name: 'JoueurFormEdit', params:{id : joueur.id} }" class="btn btn-secondary">Editer</router-link>
                                <span class="btn btn-danger" href="#" role="button" v-on:click="delet(joueur.id)" v-if="joueur.nbChallenge <= 0">Supprimer</span>
                                <span class="btn btn-warning" href="#" role="button" v-on:click="delet(joueur.id)" v-if="joueur.nbChallenge > 0">Déactivé</span>
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
import axios from 'axios'

export default {
    name: 'HelloWorld',
    data () {
        return {
            joueurs: [],
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
            axios.get("http://127.0.0.1:5000/joueur")
                .then(function (response) {
                    that.joueurs = response.data;
                })
                .catch(function (error) {   
                    console.log("erreur !"); 
                }); 
        },
        delet : function(id) {
            if(!confirm("Voulez-vous vraiment supprimer le joueur ?")) {
                return true;
            }

            var that = this;
            axios.delete("http://127.0.0.1:5000/joueur/" + id)
                .then(function (response) {
                    that.setFlashSuccess(["Joueur bien supprimer !", false]);
                    that.removeElement(id);
                })
                .catch(function (error) {
                    var msg = (error.request.status == 404) ? error.response.data[0] : "erreur serveur";
                    that.setFlashError([msg], false);                   
                }); 
        },
        removeElement : function(id) {
            let i = this.joueurs.findIndex(function(e) {
                return (e.id == id);
            })

            if(i != -1) {
                this.joueurs.splice(i,1);
            }
        }
    },
    created() {
        this.setCurrentSection("joueur");
        this.clearFlashMessage();
        this.getAll();
    },
}
</script>



<style scoped lang="less">
</style>
