import Vue from 'vue'
import Router from 'vue-router'
import JoueursList from '@/components/JoueursList'
import JoueurForm from '@/components/JoueurForm'
import SaisonForm from '@/components/SaisonForm'


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
  ]
})
