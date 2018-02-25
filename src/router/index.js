import Vue from 'vue'
import Router from 'vue-router'
import JoueursList from '@/components/JoueursList'
import JoueurForm from '@/components/JoueurForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'JoueursList',
      component: JoueursList
    },
    {
      path: '/createJoueur',
      name: 'JoueurForm',
      component: JoueurForm
    }
  ]
})
