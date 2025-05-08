<script setup>
import { onMounted, ref } from 'vue';
import { logoutUser } from '@/services/api.js'; // Assurez-vous que le chemin est correct
import { useRouter } from 'vue-router';

const currentUser = ref({});
const router = useRouter();

onMounted(() => {
  const data = localStorage.getItem('currentUser');
  if (data) {
    currentUser.value = JSON.parse(data);
  }
});

const handleLogout = () => {
  logoutUser();
  router.push('/login'); // Redirige vers la page de connexion
};
</script>

<template>
  <div
    class="flex justify-between items-center w-full border-b border-gray-300 shadow-md px-4 py-3 bg-[#264a67] text-white z-20"
  >
    <!-- Logo -->
    <div class="flex items-center">
      <img src="../assets/image/khc.jfif" alt="logo" class="h-10" />
    </div>

    <!-- User Section -->
    <div class="flex items-center gap-4">
      <h1 class="text-sm font-medium">Bienvenue {{ currentUser.firstName }}</h1>

      <button
        @click="handleLogout"
        class="p-2 rounded-full bg-[#dc3545] hover:bg-red-600 transition"
      >
        <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 text-white">
          <path
            d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
