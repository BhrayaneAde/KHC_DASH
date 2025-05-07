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
          {{ isLogin ? 'Connexion' : 'Inscription' }}
        </h1>

        <form @submit.prevent="isLogin ? handleLogin() : handleRegister()" class="flex flex-col items-center gap-4">
          <template v-if="isLogin">
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
          </template>

          <template v-else>
            <div class="w-full md:w-80 lg:w-96">
              <label class="text-white font-semibold mb-1 block">Nom d'utilisateur</label>
              <input v-model="username" type="text" placeholder="Identifiant"
                     class="w-full bg-[#CBD5E1] p-2 rounded-md" required />
            </div>

            <div class="w-full md:w-80 lg:w-96">
              <label class="text-white font-semibold mb-1 block">Email</label>
              <input v-model="email" type="email" placeholder="Votre email"
                     class="w-full bg-[#CBD5E1] p-2 rounded-md" required />
            </div>

            <div class="w-full md:w-80 lg:w-96">
              <label class="text-white font-semibold mb-1 block">Téléphone</label>
              <input v-model="telephone" type="text" placeholder="Votre téléphone"
                     class="w-full bg-[#CBD5E1] p-2 rounded-md" required />
            </div>

            <div class="w-full md:w-80 lg:w-96">
              <label class="text-white font-semibold mb-1 block">Mot de passe</label>
              <input v-model="password" type="password" placeholder="Mot de passe"
                     class="w-full bg-[#CBD5E1] p-2 rounded-md" required />
            </div>

            <div class="w-full md:w-80 lg:w-96">
              <label class="text-white font-semibold mb-1 block">Titre (optionnel)</label>
              <input v-model="titre" type="text" placeholder="Titre"
                     class="w-full bg-[#CBD5E1] p-2 rounded-md" />
            </div>

            <div class="w-full md:w-80 lg:w-96">
              <label class="text-white font-semibold mb-1 block">Motivation (optionnel)</label>
              <textarea v-model="motivation" placeholder="Décrivez vos motivations"
                        class="w-full bg-[#CBD5E1] p-2 rounded-md" rows="3"></textarea>
            </div>
          </template>

          <p v-if="errorMessage" class="text-[#dc3545] text-center text-sm mt-2">{{ errorMessage }}</p>

          <button type="submit"
                  class="bg-[#c6d5f541] hover:bg-[#7a8bad] text-white font-semibold py-2 px-6 rounded-md mt-4">
            {{ isLogin ? 'Se connecter' : "S'inscrire" }}
          </button>

          <p class="text-white mt-4 cursor-pointer underline" @click="toggleAuthMode">
            {{ isLogin ? "Pas encore de compte ? Inscrivez-vous" : "Déjà inscrit ? Connectez-vous" }}
          </p>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser, registerUser } from '@/services/api.js'

const isLogin = ref(true)
const loginInput = ref('')
const passwordInput = ref('')
const errorMessage = ref('')
const router = useRouter()

// Champs inscription
const username = ref('')
const email = ref('')
const telephone = ref('')
const password = ref('')
const titre = ref('')
const motivation = ref('')

// Basculer entre connexion et inscription
function toggleAuthMode() {
  isLogin.value = !isLogin.value
  errorMessage.value = ''
}

// Connexion
async function handleLogin() {
  try {
    await loginUser(loginInput.value, passwordInput.value)
    errorMessage.value = ''
    router.push('/admin')
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Erreur de connexion.'
  }
}

// Inscription
async function handleRegister() {
  const payload = {
    username: username.value,
    email: email.value,
    telephone: telephone.value,
    mot_de_passe: password.value,
    is_utilisateur_verifie: false,
    titre: titre.value,
    motivation: motivation.value,
    date_creation: new Date().toISOString()
  }

  try {
    const response = await registerUser(payload)

    if (response) {
      username.value = ''
      email.value = ''
      telephone.value = ''
      password.value = ''
      titre.value = ''
      motivation.value = ''

      alert('Compte créé et vérifié avec succès ! Vous pouvez maintenant vous connecter.')
      toggleAuthMode() // Passer à l'écran de connexion
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Erreur lors de l\'inscription.'
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
