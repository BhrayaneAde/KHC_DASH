<template>
  <div class="h-screen flex justify-center items-center bg-[#264a67]">
    <div class="w-full max-w-6xl flex flex-col md:flex-row justify-center items-center bg-gradient-to-b from-white to-[#264a67] shadow-xl h-full md:h-[80%] rounded-2xl">

      <!-- Section Logo -->
      <section class="flex items-center justify-center w-full md:w-1/2 h-[30%] md:h-full bg-white md:rounded-l-2xl">
        <img class="w-40 md:w-60 lg:w-96" src="@/assets/image/khc.jfif" alt="Logo phonéos">
      </section>

      <!-- Section Formulaire -->
      <section class="w-full md:w-1/2 h-[70%] md:h-full p-6 md:p-8 bg-[#264a67] md:rounded-r-2xl flex flex-col justify-center">
        <h1 class="text-center font-bold text-white text-xl md:text-3xl lg:text-4xl mb-6 md:mb-8">
          Connexion
        </h1>

        <form @submit.prevent="handleLogin" class="flex flex-col items-center gap-4">
          <div class="w-full md:w-80 lg:w-96">
            <label class="text-white font-semibold mb-1 block">Nom d'utilisateur</label>
            <div class="flex items-center bg-[#CBD5E1] rounded-md">
              <img src="@/assets/image/user.svg" alt="user" class="w-8 md:w-10 p-2">
              <input v-model="loginInput" type="text" placeholder="Entrez votre identifiant"
                     class="flex-1 bg-transparent p-2 focus:outline-none" required />
            </div>
          </div>

          <div class="w-full md:w-80 lg:w-96">
            <label class="text-white font-semibold mb-1 block">Mot de passe</label>
            <div class="flex items-center bg-[#CBD5E1] rounded-md">
              <img src="@/assets/image/password.svg" alt="password" class="w-8 md:w-10 p-2">
              <input v-model="passwordInput" type="password" placeholder="Entrez votre mot de passe"
                     class="flex-1 bg-transparent p-2 focus:outline-none" required />
            </div>
          </div>

          <p v-if="errorMessage" class="text-[#dc3545] text-center text-sm mt-2">{{ errorMessage }}</p>

          <button type="submit"
                  class="bg-[#c6d5f541] hover:bg-[#7a8bad] text-white font-semibold py-2 px-6 rounded-md mt-4">
            Se connecter
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '@/services/api.js'

const loginInput = ref('')
const passwordInput = ref('')
const errorMessage = ref('')
const router = useRouter()

// Connexion
async function handleLogin() {
  try {
    await loginUser(loginInput.value, passwordInput.value)
    errorMessage.value = ''
    router.push('/admin') // ✅ redirection ici
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Erreur de connexion.'
  }
}
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

@keyframes popupFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.popup-animation {
  animation: popupFadeIn 0.3s ease-out forwards;
}
</style>
