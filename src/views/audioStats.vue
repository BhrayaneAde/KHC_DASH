<script setup>
import { ref } from 'vue'

const chartes = ref([]) // Liste des chartes
const form = ref({
  titre: '',
  description: '',
  nom: '',
  prenom: '',
  poste: '',
  signature: '',
  id_utilisateur: '',
})

// Ajouter une charte
const addCharte = () => {
  if (form.value.titre && form.value.description && form.value.nom && form.value.prenom && form.value.poste && form.value.signature && form.value.id_utilisateur) {
    chartes.value.push({ ...form.value, id: Date.now() })
    resetForm()
  }
}

// Réinitialiser le formulaire
const resetForm = () => {
  form.value = {
    titre: '',
    description: '',
    nom: '',
    prenom: '',
    poste: '',
    signature: '',
    id_utilisateur: '',
  }
}

// Supprimer une charte
const deleteCharte = (id) => {
  chartes.value = chartes.value.filter((charte) => charte.id !== id)
}

// Modifier une charte
const editCharte = (charte) => {
  form.value = { ...charte }
  deleteCharte(charte.id)
}
</script>

<template>
  <section class="w-full h-screen flex bg-gray-100">
    <!-- Formulaire -->
    <div class="w-1/2 p-6 bg-white shadow-md">
      <h2 class="text-2xl font-bold mb-4">Créer une Charte</h2>
      <form @submit.prevent="addCharte" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Titre</label>
          <input v-model="form.titre" type="text" class="w-full p-2 border rounded" placeholder="Titre" />
        </div>
        <div>
          <label class="block text-sm font-medium">Description</label>
          <textarea v-model="form.description" class="w-full p-2 border rounded" placeholder="Description"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium">Nom</label>
          <input v-model="form.nom" type="text" class="w-full p-2 border rounded" placeholder="Nom" />
        </div>
        <div>
          <label class="block text-sm font-medium">Prénom</label>
          <input v-model="form.prenom" type="text" class="w-full p-2 border rounded" placeholder="Prénom" />
        </div>
        <div>
          <label class="block text-sm font-medium">Poste</label>
          <input v-model="form.poste" type="text" class="w-full p-2 border rounded" placeholder="Poste" />
        </div>
        <div>
          <label class="block text-sm font-medium">Signature</label>
          <input v-model="form.signature" type="text" class="w-full p-2 border rounded" placeholder="Signature" />
        </div>
        <div>
          <label class="block text-sm font-medium">ID Utilisateur</label>
          <input v-model="form.id_utilisateur" type="text" class="w-full p-2 border rounded" placeholder="ID Utilisateur" />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Ajouter</button>
      </form>
    </div>

    <!-- Tableau -->
    <div class="w-1/2 p-6">
      <h2 class="text-2xl font-bold mb-4">Liste des Chartes</h2>
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 p-2">Titre</th>
            <th class="border border-gray-300 p-2">Description</th>
            <th class="border border-gray-300 p-2">Nom</th>
            <th class="border border-gray-300 p-2">Prénom</th>
            <th class="border border-gray-300 p-2">Poste</th>
            <th class="border border-gray-300 p-2">Signature</th>
            <th class="border border-gray-300 p-2">ID Utilisateur</th>
            <th class="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="charte in chartes" :key="charte.id" class="odd:bg-gray-100 even:bg-white">
            <td class="border border-gray-300 p-2">{{ charte.titre }}</td>
            <td class="border border-gray-300 p-2">{{ charte.description }}</td>
            <td class="border border-gray-300 p-2">{{ charte.nom }}</td>
            <td class="border border-gray-300 p-2">{{ charte.prenom }}</td>
            <td class="border border-gray-300 p-2">{{ charte.poste }}</td>
            <td class="border border-gray-300 p-2">{{ charte.signature }}</td>
            <td class="border border-gray-300 p-2">{{ charte.id_utilisateur }}</td>
            <td class="border border-gray-300 p-2 space-x-2">
              <button @click="editCharte(charte)" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Modifier</button>
              <button @click="deleteCharte(charte.id)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
/* Ajoutez des styles personnalisés si nécessaire */
</style>
