<script setup>
import AnnotatorInterface from '@/views/annotatorInterface.vue';
import Evaluation from '@/views/evaluation.vue';
import { ref } from 'vue'

// Contrôlent l'ouverture des sous-menus (on n'en aura plus pour Evaluations et Utilisateurs)
const openAnnotateurs = ref(false)
const openParametre = ref(false)
const openEvaluateur = ref(false)
</script>

<template>
  <div
    class=" flex w-full max-w-[15rem]  flex-col bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5 max-h-[100%]">
    <nav class="flex flex-col gap-4 p-2 font-sans text-base font-normal text-blue-gray-700">
      <!-- Dashboard -->
      <div class="relative block w-full">
        <div role="button"
          class="flex items-center w-full transition-all rounded-lg text-start hover:bg-gray-200 focus:bg-gray-200">
          <button type="button"
            class="flex items-center justify-between w-full p-3 text-left transition-colors rounded-md text-gray-800 hover:bg-gray-200 cursor-pointer">
            <div class="grid mr-6 place-items-center">
              <!-- Icône Dashboard -->
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                <path fill="#353535" d="M12 12V3h-1a10 10 0 1 0 10 10v-1Z" />
                <path fill="#353535" d="M14 10V1a9 9 0 0 1 9 9Z" />
              </svg>
            </div>
            <p class="mr-auto text-md">Dashboard</p>
          </button>
        </div>
      </div>

    <!-- Evaluations (sous-menu ici) -->
    <button @click="openEvaluateur = !openEvaluateur"
        class="flex items-center justify-between w-full p-4 rounded-md hover:bg-gray-200 text-gray-800">
        <div class="flex items-center gap-6">
          <!-- Icône Évaluateur -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M17.5 18.5v2q0 .2.15.35T18 21t.35-.15t.15-.35v-2h2q.2 0 .35-.15T21 18t-.15-.35t-.35-.15h-2v-2q0-.2-.15-.35T18 15t-.35.15t-.15.35v2h-2q-.2 0-.35.15T15 18t.15.35t.35.15zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v5q0 .425-.288.713T20 11t-.712-.288T19 10V5H5v14h5q.425 0 .713.288T11 20t-.288.713T10 21zm0-3v1V5v6.075V11zm2-2q0 .425.288.713T8 17h2.075q.425 0 .713-.288t.287-.712t-.287-.712t-.713-.288H8q-.425 0-.712.288T7 16m0-4q0 .425.288.713T8 13h5q.425 0 .713-.288T14 12t-.288-.712T13 11H8q-.425 0-.712.288T7 12m0-4q0 .425.288.713T8 9h8q.425 0 .713-.288T17 8t-.288-.712T16 7H8q-.425 0-.712.288T7 8m11 15q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23"
              />
            </svg>
          <p class="text-md">Actions</p>
        </div>
        <!-- Chevron pour ouvrir/fermer -->
        <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': openEvaluateur }" fill="none"
          stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <transition name="fade-slide">
        <div v-if="openEvaluateur" class="ml-8 mt-2 flex flex-col gap-4">
          <router-link to="/evaluateur" class="text-md text-gray-600 hover:text-gray-900 flex items-center gap-6">
            <!-- Icône Liste Piste -->
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M3 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3z" />
            </svg>
            Catégorie
          </router-link>
          <router-link to="/globale" class="text-md text-gray-600 hover:text-gray-900 flex items-center gap-6">
            <!-- Icône Rôles -->
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M3 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3z" />
            </svg>
            Publications
          </router-link>
          <router-link to="/statistique" class="text-md text-gray-600 hover:text-gray-900 flex items-center gap-6">
            <!-- Icône Rôles -->
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M3 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3z" />
            </svg>
            Chartes
          </router-link>
          <router-link to="/users"
          class="text-md text-gray-600 hover:text-gray-900 flex items-center gap-6">
          <div class="flex items-center gap-6">
            <!-- Icône Utilisateurs -->
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M3 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3z" />
            </svg>
            <p class="text-md">Utilisateurs</p>
          </div>
        </router-link>
        </div>
      </transition>


      <!-- Deconnexion (Nouvelle icône) -->
      <div class="relative block w-full">
        <div role="button"
          class="flex items-center w-full transition-all rounded-lg text-start hover:bg-gray-200 focus:bg-gray-200">
          <router-link to ="/login">
            <button type="button"
              class="flex items-center justify-between w-full p-4 text-left transition-colors rounded-md text-gray-800 hover:text-gray-900 cursor-pointer">
              <div class="grid mr-6 place-items-center">
                <!-- Nouvelle Icône Deconnexion -->
                <svg viewBox="0 0 24 24" fill="none" class="w-7 h-7 text-gray-700">
                  <path
                    d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <p class="mr-auto text-md">Déconnexion</p>
            </button>
          </router-link>
        </div>
      </div>



    </nav>
  </div>
</template>

<!-- Animations -->
<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
