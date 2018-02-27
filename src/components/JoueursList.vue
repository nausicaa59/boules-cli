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
                                <a class="btn btn-danger" href="#" role="button">Supprimer</a>
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
            joueurs: []
        }
    },
    methods : {
        ...mapMutations("app", [
            "clearFlashMessage"
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
        }
    },
    created() {
        this.clearFlashMessage();
        this.getAll();
    },
}
</script>



<style scoped lang="less">
</style>
