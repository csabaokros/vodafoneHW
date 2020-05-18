import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // Displays the contact list and the filters
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // Displays a form to add a new contact
  {
    path: '/contact/new',
    name: 'NewContact',
    component: () => import(/* webpackChunkName: "new" */ '../views/NewContact.vue')
  },
  // Displays a single contact on a separate page
  // Editing and deleting is also initiated here
  {
    path: '/contact/:uid',
    name: 'SingleContact',
    component: () => import(/* webpackChunkName: "single" */ '../views/SingleContact.vue')
  },
  // Displays the form to edit an existing user
  {
    path: '/contact/:uid/edit',
    name: 'EditContact',
    component: () => import(/* webpackChunkName: "edit" */ '../views/EditContact.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
