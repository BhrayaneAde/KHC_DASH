// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

// Composants
import AuthView from '@/views/AuthView.vue'
import DashboardView from '@/views/DashboardView.vue'
import AllUtilisateursAdmin from '@/components/AllUtilisateursAdmin.vue'
import CreationCharte from '@/views/CreationCharte.vue'
import CreationPublication from '@/views/CreationPublication.vue'
import CreateCategorie from '@/views/CreateCategorie.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Connexion',
    component: AuthView,
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: DashboardView,
    children: [
      {
        path: '/CreateCategorie',
        name: 'CreateCategorie',
        component: CreateCategorie,
      },
      {
        path: '/AllUtilisateursAdmin',
        name: 'AllUtilisateursAdmin',
        component: AllUtilisateursAdmin,
      },
      {
        path: '/CreationCharte',
        name: 'CreationCharte',
        component: CreationCharte,
      },
      {
        path: '/CreationPublication',
        name: 'CreationPublication',
        component: CreationPublication,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Pinia
const pinia = createPinia()

// ✅ Garde de navigation
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token') // Assure-toi que c’est 'access_token'

  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
