<template>
    <div id="wrapper">
        <nav class="navbar navbar-toggleable-md navbar-light bg-faded fixed-top" id="navBarre">
            <a class="navbar-brand" href="#">Pétanque porteloise</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <span id="flashMessage" v-if="this.flashMessage().display">
                            <span v-bind:class="classFlashMessage(flashMessage().type)">
                                {{this.flashMessage().label}}
                            </span>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="collapse navbar-collapse justify-content-end">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">
                            <i class="fa fa-sign-out"></i> Déconnexion
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <div id="menu-verticale">
            <router-link :to="{ name: 'JoueursList' }" v-bind:class="isActiveSection('joueur')">
                <i class="fa fa-user"></i> Joueurs
            </router-link>
            <router-link :to="{ name: 'ChallengesList' }" v-bind:class="isActiveSection('challenge')">
                <i class="fa fa-file-excel-o"></i> Challenges
            </router-link>
            <router-link :to="{ name: 'SaisonsList' }" v-bind:class="isActiveSection('saison')">
                <i class="fa fa-calendar"></i> Saisons
            </router-link>
        </div>
        <div id="app">
            <router-view/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'App',
    methods : {
        ...mapGetters("app", [
            "flashMessage",
            "currentSection"
        ]),
        classFlashMessage: function (type) {
            return {
                'alert-danger': (type == "error")   ? true : false,
                'alert-success': (type == "success") ? true : false,
                'alert-warning': (type == "warning") ? true : false,
                'alert-info': (type == "info") ? true : false
            }
        },
        isActiveSection: function (section) {
            return {
                'actif' : section == this.currentSection()
            };
        }
    },
}
</script>

<style lang="less">
html, body
{
    background-color: #e0e8f5;
}


#wrapper
{
    min-height: 100%;
    font-family: "Open Sans";

    #navBarre
    {
        z-index: 1;
        background-color: white;
        color:black;
        padding-left:350px;
        padding-top:10px;
        padding-bottom: 10px;
        border-bottom: 2px solid #d1d1d1;

        .navbar-brand
        {
            background-color: #428bca;
            position: fixed;
            top:0px;
            left:0px;
            display: block;
            width: 300px;
            padding-left: 15px;
            padding-top: 15px;
            padding-bottom: 15px;
            color:white;
            border-bottom: 2px solid #428bca;
            font-weight: bold;
       }

        ul
        {
            a
            {
                &:hover
                {
                    color:#428bca;
                }
            }
        }
    }

    #flashMessage
    {

    }

    #app 
    {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        padding-top: 60px;
        margin-left: 300px;
        
        .container-page
        {
            width:calc(~"100% - 100px");
            margin-left: auto;
            margin-right: auto;
            padding-top: 40px;
            padding-bottom: 80px;
            
            h1
            {
                margin-bottom: 50px;
                font-size: 36px;
            }

            .box
            {
                background-color: white;
                padding:25px;

                .box-action
                {
                    padding-bottom: 30px;
                }

                .table
                {
                    font-size: 16px;

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
        }
    }



    #menu-verticale {
        position: fixed;
        top:0px;
        left:0px;
        width: 300px;
        min-height: 100%;
        background-color: #1f2937;
        padding-top: 85px;
        color:white;

        a
        {
            padding: 20px 15px;
            border-bottom:1px solid #3a475b;
            cursor:pointer;
            font-size: 18px;
            color: rgba(255, 255, 255, 0.39);
            display:block;
            text-decoration: none;

            &:hover
            {
                background-color: #3a475b; 
            }

            i
            {
                padding-right: 8px;
            }

            &.actif
            {
                background-color: #3a475b; 
                color: white;
                text-decoration:none;                        

                i
                {
                    color:#428bca;
                }
            }
        }
    }
}
</style>
