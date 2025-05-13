<script setup>
import { ref, onMounted } from 'vue'
import { getUserIdFromToken } from '@/services/api.js'
import {
  createCharte,
  getAllChartes,
  updateCharte,
  deleteCharte
} from '@/services/api.js'

// Formulaire
const form = ref({
  titre: '',
  description: '',
  nom: '',
  prenom: '',
  poste: '',
  signature: '',
  id_utilisateur: getUserIdFromToken()
})

const chartes = ref([])
const isEditing = ref(false)
const editingId = ref(null)

// Charger les données au démarrage
onMounted(async () => {
  await fetchChartes()
})

// Récupérer la liste
const fetchChartes = async () => {
  try {
    const res = await getAllChartes()
    chartes.value = res.data
  } catch (err) {
    console.error("Erreur lors du chargement des chartes :", err)
  }
}

// Ajouter ou modifier une charte
const addCharte = async () => {
  try {
    if (isEditing.value) {
      await updateCharte(editingId.value, form.value)
    } else {
      await createCharte(form.value)
    }
    await fetchChartes()
    resetForm()
  } catch (err) {
    console.error("Erreur lors de l'envoi :", err)
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
    id_utilisateur: getUserIdFromToken()
  }
  isEditing.value = false
  editingId.value = null
}

// Préparer la modification
const editCharte = (charte) => {
  form.value = {
    titre: charte.titre,
    description: charte.description,
    nom: charte.nom,
    prenom: charte.prenom,
    poste: charte.poste,
    signature: charte.signature,
    id_utilisateur: getUserIdFromToken() // Remplace par celui du token actuel
  }
  isEditing.value = true
  editingId.value = charte.id
}

// Supprimer
const deleteCharteApi = async (id) => {
  try {
    await deleteCharte(id)
    await fetchChartes()
  } catch (err) {
    console.error("Erreur lors de la suppression :", err)
  }
}
</script>

<template>
  <section class="w-full min-h-screen flex flex-col lg:flex-row bg-gray-100">
    <!-- Formulaire -->
    <div class="w-full lg:w-1/2 mt-20 p-4 bg-white shadow-md">
      <h2 class="text-xl font-bold mb-4 text-[#264a67]">
        {{ isEditing ? 'Modifier une Charte' : 'Créer une Charte' }}
      </h2>
      <form @submit.prevent="addCharte" class="space-y-4">
        <!-- Titre -->
        <div>
          <label for="titre" class="block text-sm font-medium">Titre</label>
          <input v-model="form.titre" id="titre" type="text" class="w-full p-2 border rounded" placeholder="Titre" />
        </div>
        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium">Description</label>
          <textarea v-model="form.description" id="description" class="w-full p-2 border rounded" placeholder="Description"></textarea>
        </div>
        <!-- Nom -->
        <div>
          <label for="nom" class="block text-sm font-medium">Nom</label>
          <input v-model="form.nom" id="nom" type="text" class="w-full p-2 border rounded" placeholder="Nom" />
        </div>
        <!-- Prénom -->
        <div>
          <label for="prenom" class="block text-sm font-medium">Prénom</label>
          <input v-model="form.prenom" id="prenom" type="text" class="w-full p-2 border rounded" placeholder="Prénom" />
        </div>
        <!-- Poste -->
        <div>
          <label for="poste" class="block text-sm font-medium">Poste</label>
          <input v-model="form.poste" id="poste" type="text" class="w-full p-2 border rounded" placeholder="Poste" />
        </div>
        <!-- Signature -->
        <div>
          <label for="signature" class="block text-sm font-medium">Signature</label>
          <input v-model="form.signature" id="signature" type="text" class="w-full p-2 border rounded" placeholder="Signature" />
        </div>

        <button type="submit" class="w-full bg-[#264a67] text-white p-2 rounded hover:bg-[#1e3a56]">
          {{ isEditing ? 'Mettre à jour' : 'Ajouter' }}
        </button>
      </form>
    </div>

    <!-- Liste des chartes -->
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
                <button @click="editCharte(charte)" class="bg-[#264a67] text-white px-2 py-1 rounded hover:bg-[#1e3a56]">
                  Modifier
                </button>
                <button @click="deleteCharteApi(charte.id)" class="bg-[#dc3545] text-white px-2 py-1 rounded hover:bg-red-700">
                  Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Vous pouvez ajouter des styles supplémentaires ici si nécessaire */
</style>
