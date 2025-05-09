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
  <section class="w-full min-h-screen flex flex-col lg:flex-row bg-gray-100">
    <!-- Formulaire -->
    <div class="w-full lg:w-1/2 mt-20 p-4 bg-white shadow-md">
      <h2 class="text-xl font-bold mb-4 text-[#264a67]">Créer une Charte</h2>
      <form @submit.prevent="addCharte" class="space-y-4">
        <div v-for="(label, key) in { titre: 'Titre', description: 'Description', nom: 'Nom', prenom: 'Prénom', poste: 'Poste', signature: 'Signature', id_utilisateur: 'ID Utilisateur' }" :key="key">
          <label :for="key" class="block text-sm font-medium">{{ label }}</label>
          <input v-model="form[key]" :id="key" :type="key === 'description' ? 'textarea' : 'text'" class="w-full p-2 border rounded" :placeholder="label" />
        </div>
        <button type="submit" class="w-full bg-[#264a67] text-white p-2 rounded hover:bg-[#1e3a56]">Ajouter</button>
      </form>
    </div>

    <!-- Tableau -->
    <div class="w-full lg:w-1/2 mt-20 p-4">
      <h2 class="text-xl font-bold mb-4 text-[#264a67]">Liste des Chartes</h2>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr class="bg-[#264a67] text-white">
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
                <button @click="editCharte(charte)" class="bg-[#264a67] text-white px-2 py-1 rounded hover:bg-[#1e3a56]">Modifier</button>
                <button @click="deleteCharte(charte.id)" class="bg-[#dc3545] text-white px-2 py-1 rounded hover:bg-red-700">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Ajoutez des styles personnalisés si nécessaire */
</style>
