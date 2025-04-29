<template>
  <div class="h-screen flex justify-center items-center bg-[#F8FAFC]">
    <div
      class="w-full max-w-6xl flex flex-col md:flex-row justify-center items-center bg-gradient-to-b from-white to-[#1b3253] shadow-xl h-full md:h-[80%] rounded-2xl">

      <!-- Section Logo -->
      <section class="flex items-center justify-center w-full md:w-1/2 h-[30%] md:h-full bg-white md:rounded-l-2xl">
        <img class="w-60 md:w-96" src="../assets/image/logo.svg" alt="Logo phonéos">
      </section>

      <!-- Section Formulaire -->
      <section class="w-full md:w-1/2 h-[70%] md:h-full p-8 bg-[#1b314e] md:rounded-r-2xl flex flex-col justify-center">
        <h1 class="text-center font-bold text-white text-2xl md:text-4xl mb-8">
          {{ isLogin ? 'Connexion' : 'Inscription' }}
        </h1>

        <form @submit.prevent="isLogin ? login() : register()" class="flex flex-col items-center gap-4">
          <template v-if="isLogin">
            <!-- FORMULAIRE DE CONNEXION -->
            <div class="w-full md:w-96">
              <label for="username" class="text-white font-semibold mb-1 block">Nom d'utilisateur</label>
              <div class="flex items-center bg-[#CBD5E1] rounded-md">
                <img src="../assets/image/user.svg" alt="Icône utilisateur" class="w-10 p-2">
                <input v-model="loginInput" id="username" type="text" placeholder="Entrez votre identifiant"
                  class="flex-1 bg-transparent p-2 focus:outline-none" required />
              </div>
            </div>

            <div class="w-full md:w-96">
              <label for="password" class="text-white font-semibold mb-1 block">Mot de passe</label>
              <div class="flex items-center bg-[#CBD5E1] rounded-md">
                <img src="../assets/image/password.svg" alt="Icône mot de passe" class="w-10 p-2">
                <input v-model="passwordInput" id="password" type="password" placeholder="Entrez votre mot de passe"
                  class="flex-1 bg-transparent p-2 focus:outline-none" required />
              </div>
            </div>
          </template>

          <template v-else>
            <!-- FORMULAIRE D'INSCRIPTION -->
            <div class="w-full md:w-96">
              <label class="text-white font-semibold mb-1 block">Nom d'utilisateur</label>
              <input v-model="username" type="text" placeholder="Choisissez un identifiant"
                class="w-full bg-[#CBD5E1] p-2 rounded-md focus:outline-none" required />
            </div>

            <div class="w-full md:w-96">
              <label class="text-white font-semibold mb-1 block">Email</label>
              <input v-model="email" type="email" placeholder="Votre email"
                class="w-full bg-[#CBD5E1] p-2 rounded-md focus:outline-none" required />
            </div>

            <div class="w-full md:w-96">
              <label class="text-white font-semibold mb-1 block">Téléphone</label>
              <input v-model="telephone" type="text" placeholder="Votre téléphone"
                class="w-full bg-[#CBD5E1] p-2 rounded-md focus:outline-none" required />
            </div>

            <div class="w-full md:w-96">
              <label class="text-white font-semibold mb-1 block">Mot de passe</label>
              <input v-model="password" type="password" placeholder="Créez un mot de passe"
                class="w-full bg-[#CBD5E1] p-2 rounded-md focus:outline-none" required />
            </div>

            <div class="w-full md:w-96">
              <label class="text-white font-semibold mb-1 block">Titre (optionnel)</label>
              <input v-model="titre" type="text" placeholder="Votre titre (ex: Chauffeur, Manager...)"
                class="w-full bg-[#CBD5E1] p-2 rounded-md focus:outline-none" />
            </div>

            <div class="w-full md:w-96">
              <label class="text-white font-semibold mb-1 block">Motivation (optionnel)</label>
              <textarea v-model="motivation" placeholder="Décrivez vos motivations"
                class="w-full bg-[#CBD5E1] p-2 rounded-md focus:outline-none" rows="3"></textarea>
            </div>
          </template>

          <!-- Message d'erreur -->
          <p v-if="errorMessage" class="text-red-300 text-center text-sm mt-2">{{ errorMessage }}</p>

          <!-- Bouton submit -->
          <button type="submit"
            class="bg-[#c6d5f541] hover:bg-[#7a8bad] text-white font-semibold py-2 px-6 rounded-md mt-4">
            {{ isLogin ? 'Se connecter' : "S'inscrire" }}
          </button>

          <!-- Lien basculer entre login/register -->
          <p class="text-white mt-4 cursor-pointer underline" @click="isLogin = !isLogin">
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
import { loginUser, registerUser } from '@/services/api.js' // On importe l'API propre

const isLogin = ref(true)
const loginInput = ref('')
const passwordInput = ref('')
const errorMessage = ref('')
const router = useRouter()

// Formulaire d'inscription
const username = ref('')
const email = ref('')
const telephone = ref('')
const password = ref('')
const titre = ref('')
const motivation = ref('')

// Fonction login
async function login() {
  try {
    const response = await loginUser(loginInput.value, passwordInput.value);

    errorMessage.value = '';

    // Redirection vers la page admin
    router.push('/admin');

    // Reset les champs
    loginInput.value = '';
    passwordInput.value = '';
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = 'Erreur de connexion.';
    }
  }
}


/**
 * Fonction pour s'inscrire
 */
async function register() {
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
    await registerUser(payload)

    alert('Compte créé avec succès ! Connectez-vous.')
    isLogin.value = true

    // Reset les champs
    username.value = ''
    email.value = ''
    telephone.value = ''
    password.value = ''
    titre.value = ''
    motivation.value = ''
  } catch (error) {
    console.error(error)
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = 'Erreur lors de l\'inscription.'
    }
  }
}
</script>
