<script setup>
import { users,roles } from '@/data/userData';
import { onMounted, ref } from 'vue';

const currentUser = ref({})
 
onMounted(() => {
  const data = localStorage.getItem('currentUser')//recuperer dans data l'objet enregistrer dans currentUser
  if (data) {
    currentUser.value = JSON.parse(data)//affecte les informations de l'utilisateur a currentUser
  }
})


</script>

<template>
  <div
    class="flex justify-between items-center w-full border-b border-slate-200 shadow-md px-6 py-3 bg-white  z-20 max-h-[30%]"
  >
    <!-- Logo & Search -->
    <div class="flex items-center gap-10 w-1/2">
      <div class="h-20 flex items-center">
        <img src="../assets/image/fdd.svg" alt="logo" class="h-35" />
      </div>

      <div class="w-full max-w-md min-w-[300px]">
        <div class="relative flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="absolute w-5 h-5 top-2.5 left-3 text-gray-400"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clip-rule="evenodd"
            />
          </svg>

          <input
            class="w-full bg-white placeholder:text-gray-400 text-gray-800 text-sm border border-gray-300 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300"
            placeholder="Rechercher..."
          />

          <button
            class="ml-2 rounded-full bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-700 transition-all"
          >
            Search
          </button>
        </div>
      </div>
    </div>

    <!-- User section -->
    <div class="flex items-center gap-6">
      <div class="profil flex gap-2.5 justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
          />
        </svg>
        <h1 class="font-semibold text-lg text-gray-700">Bienvenue {{currentUser.firstName}}</h1>
      </div>

      <button class="hover:bg-gray-100 p-2 rounded-full transition cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-7 h-7 text-gray-700"
        >
          <path
            fill-rule="evenodd"
            d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <router-link to="/login">
        <button  class="hover:bg-gray-100 p-2 rounded-full transition cursor-pointer">
          <svg viewBox="0 0 24 24" fill="none" class="w-7 h-7 text-gray-700">
            <path
              d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </router-link>
    </div>
  </div>
</template>