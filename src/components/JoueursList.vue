<template>
    <div class="hello">
        <div class="container-page">
            <h1>Liste des joueurs</h1>
            <div class="box">
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
                        <tr v-for="joueur in joueurs()">
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
                                <router-link :to="{ name: 'JoueurForm' }" class="btn btn-secondary">Editer</router-link>
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
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    name: 'HelloWorld',
    data () {
        return {

        }
    },
    methods : {
        ...mapGetters("joueur", [
            "label",
            "compteur",
            "joueurs"
        ]),
        ...mapActions("joueur",[
            "getAll"
        ]),
        ...mapMutations("joueur", [
            "setCompteur"            
        ]),
    },
    created() {
        this.getAll();
    },
}
</script>



<style scoped lang="less">
.box
{
    background-color: white;
    padding:25px;
}

.table
{
    font-size: 16px;

    &.table_joueur
    {
        thead
        {
            th
            {
                th:last-child
                {
                    text-align:center;                
                }         
            }
        }

        tr
        {
            td
            {
                text-align: left;

                &:last-child
                {
                    text-align:right;
                }

                .actif
                {
                    color : green;
                }

                .innactif
                {
                    color: red;
                }
            }

            &:hover
            {
                background-color: #f1f1f1;
            }            
        }
    }
}
</style>
