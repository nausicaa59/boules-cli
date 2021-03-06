import Vue from 'vue';
import Router from 'vue-router';
import JoueursList from '@/components/JoueursList';
import JoueurForm from '@/components/JoueurForm';
import SaisonForm from '@/components/SaisonForm';
import SaisonsList from '@/components/SaisonsList';
import ChallengesList from '@/components/ChallengesList';
import ChallengeForm from '@/components/ChallengeForm';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'JoueursList',
      component: JoueursList
    },
    {
      path: '/joueur/create',
      name: 'JoueurForm',
      component: JoueurForm
    },
    {
      path: '/joueur/edit/:id',
      name: 'JoueurFormEdit',
      component: JoueurForm
    },
    {
      path: '/saison/create',
      name: 'SaisonForm',
      component: SaisonForm
    },
    {
      path: '/saison/edit/:id',
      name: 'SaisonFormEdit',
      component: SaisonForm
    },
    {
      path: '/saison',
      name: 'SaisonsList',
      component: SaisonsList
    },
    {
      path: '/challenge',
      name: 'ChallengesList',
      component: ChallengesList
    },
    {
      path: '/challenge/:id_saison',
      name: 'ChallengesBySaisonList',
      component: ChallengesList
    },
    {
      path: '/challenge/create/:id_saison',
      name: 'ChallengeForm',
      component: ChallengeForm
    },
  ]
})
