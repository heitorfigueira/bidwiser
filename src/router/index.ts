import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Cadastro from '../views/Cadastro.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import Perfil from '../views/Perfil.vue'
import LancesItems from '../views/LancesItems.vue'
import SubmeterItem from '../views/SubmeterItem.vue'
import ListaItems from '../views/ListaItems.vue'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/submeter-item',
    name: 'SubmeterItem',
    component: SubmeterItem,
    beforeEnter: AuthGuard
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    beforeEnter: AuthGuard
  },
  {
    path: '/lances-e-itens',
    name: 'LancesItems',
    component: LancesItems,
    beforeEnter: AuthGuard
  },
  {
    path: '/lista-de-itens',
    name: 'ListaItems',
    component: ListaItems
  },
]

const router = new VueRouter({
  routes,
  base: '',
  mode: 'history'
})

export default router
