import EvaluationPiste from '@/components/EvaluationPiste.vue'
import RolesApp from '@/components/RolesApp.vue'
import Utilisateurs from '@/components/Utilisateurs.vue'
import AnnotatorInterface from '@/views/annotatorInterface.vue'
import AudioStats from '@/views/audioStats.vue'
import AuthView from '@/views/AuthView.vue'
import DashboardView from '@/views/DashboardView.vue'
import Evaluateur from '@/views/Evaluateur.vue'
import Evaluation from '@/views/evaluation.vue'
import ListeCriteres from '@/views/listeCriteres.vue'
import { createRouter, createWebHistory } from 'vue-router'

import { createPinia } from 'pinia'
import { useAuthStore } from '@/data/auth'
import StatistiqueGlobales from '@/views/StatistiqueGlobales.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
        {  
          path:  '/', 
          redirect: '/login'
        },
        {  
          path:  '/login',
          name: 'Connexion',
          component: AuthView,
        },

       {
          path: '/admin',
          name: 'Dashboard',
          component: DashboardView,
          children: [
            {
              path: '/roles',
              component: RolesApp,
            },
            {
              path: '/users',
              component: Utilisateurs,
            },
            {
              path:'/annotation',
              component:Evaluation
            },
            {
              path:'/critere-evaluation',
              component:ListeCriteres
            },
            {
              path:'/statistique',
              component:AudioStats,
            },
            {
              path: '/globale',
              name: 'globale',
              component: StatistiqueGlobales,
            },
            {
              path:'/evaluateur',
              name: 'evaluateur',
              component:Evaluateur,
            },
          ],
        },
       
  ],
})

// ⚠️ Important : on initialise Pinia ici pour pouvoir accéder au store
const pinia = createPinia()

// Garde globale de navigation
router.beforeEach((to, from, next) => {
  // Désactiver temporairement la vérification d'authentification
  next()
})

export default router
