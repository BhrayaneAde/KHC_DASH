// src/router/index.js ou router.js

import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/data/auth'

// Composants
import AuthView from '@/views/AuthView.vue'
import DashboardView from '@/views/DashboardView.vue'
import Utilisateurs from '@/components/Utilisateurs.vue'
import Evaluation from '@/views/evaluation.vue'
import ListeCriteres from '@/views/listeCriteres.vue'
import AudioStats from '@/views/audioStats.vue'
import StatistiqueGlobales from '@/views/StatistiqueGlobales.vue'
import Evaluateur from '@/views/Evaluateur.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
          path: '/evaluateur',
          name: 'evaluateur',
          component: Evaluateur,
        },
        {
          path: '/users',
          component: Utilisateurs,
        },
        {
          path: '/annotation',
          component: Evaluation
        },
        {
          path: '/critere-evaluation',
          component: ListeCriteres
        },
        {
          path: '/statistique',
          component: AudioStats,
        },
        {
          path: '/globale',
          name: 'globale',
          component: StatistiqueGlobales,
        },
       
      ]
    }
  ]
})

// Pinia
const pinia = createPinia()

// ✅ Garde de navigation
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(pinia)
  const token = localStorage.getItem('access_token') // Assure-toi que c’est 'access_token'

  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
