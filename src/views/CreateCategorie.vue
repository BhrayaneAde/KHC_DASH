<script setup>
import { ref, onMounted } from 'vue'
import FroalaTest from '@/components/FroalaTest.vue'
import { 
  createCategorie, 
  getCategories, 
  updateCategorie, 
  deleteCategorieById, 
  deleteCategorieBySelection 
} from '@/services/api.js'

const categories = ref([])

const newCategory = ref({
  id: null, // Utilisation de l'ID pour la mise à jour
  titre: '',
  description: ''
})

const fetchCategories = async () => {
  try {
    const response = await getCategories()
    categories.value = response.data.map(category => ({
      ...category,
      id: category.id // Assurez-vous que `id` est utilisé
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error)
  }
}

const addCategory = async () => {
  if (newCategory.value.titre.trim() && newCategory.value.description.trim()) {
    try {
      const response = await createCategorie(newCategory.value)
      categories.value.push(response.data)
      resetForm()
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie:', error)
    }
  }
}

const updateCategory = async () => {
  if (newCategory.value.id && newCategory.value.titre.trim() && newCategory.value.description.trim()) {
    try {
      const response = await updateCategorie(newCategory.value.id, newCategory.value)
      const index = categories.value.findIndex(cat => cat.id === newCategory.value.id)
      if (index !== -1) {
        categories.value[index] = response.data
      }
      resetForm()
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error)
    }
  } else {
    console.error('ID ou données invalides pour la mise à jour.')
  }
}

const deleteCategoryById = async (id) => {
  try {
    await deleteCategorieById(id)
    categories.value = categories.value.filter(category => category.id !== id)
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie par ID:', error)
  }
}

const deleteCategoryBySelection = async (selectedId) => {
  try {
    await deleteCategorieBySelection(categories.value, selectedId)
    categories.value = categories.value.filter(category => category.id !== selectedId)
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie par sélection:', error)
  }
}

const editCategory = (category) => {
  newCategory.value = { ...category }
}

const resetForm = () => {
  newCategory.value = {
    id: null, // Réinitialisation de l'ID
    titre: '',
    description: ''
  }
}

// Charger les catégories au montage du composant
onMounted(() => {
  fetchCategories()
})
</script>


<template>
  <div class="flex flex-col lg:flex-row gap-6 p-4 bg-gray-100 min-h-screen">
    <!-- Formulaire -->
    <div class="lg:w-2/5 mt-40 p-6 bg-white text-gray-900 rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4 text-blue-600">Créer ou modifier une catégorie</h2>
      <form @submit.prevent="newCategory.id ? updateCategory() : addCategory()" class="flex flex-col gap-4">
        <div>
          <label for="titre" class="block text-sm font-medium text-gray-700">Titre</label>
          <input 
            id="titre" 
            v-model="newCategory.titre" 
            type="text" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition duration-200 ease-in-out hover:border-blue-400 hover:shadow-md" 
            placeholder="Titre de la catégorie" 
            required 
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <FroalaTest 
            v-model="newCategory.description"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
        <button 
          type="submit" 
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          {{ newCategory.id ? 'Mettre à jour' : 'Ajouter' }}
        </button>
      </form>
    </div>

    <!-- Liste des catégories -->
    <div class="lg:w-3/5 p-6 bg-white rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4 text-blue-600">Liste des catégories</h2>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="category in categories" :key="category.id">
            <td class="px-6 py-4 text-sm text-gray-900">{{ category.titre }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">
              <div v-html="category.description"></div>
            </td>
            <td class="px-6 py-4 text-right text-sm font-medium">
              <button 
                @click="editCategory(category)" 
                class="text-blue-600 hover:text-blue-400 mr-2 transition">
                Modifier
              </button>
              <button 
                @click="deleteCategoryById(category.id)" 
                class="text-red-500 hover:text-red-700 transition">
                Supprimer
              </button>
            </td>
          </tr>
          <tr v-if="categories.length === 0">
            <td colspan="3" class="px-6 py-4 text-center text-sm text-gray-500">Aucune catégorie disponible</td>
          </tr>
        </tbody>
      </table>

      <!-- Suppression par sélection -->
      <div class="mt-6">
        <label for="selectCategory" class="block text-sm font-medium text-gray-700">Supprimer par sélection</label>
        <select 
          id="selectCategory" 
          v-model="selectedCategoryId" 
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          <option value="" disabled>Choisissez une catégorie</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.titre || 'Titre non disponible' }}
          </option>
        </select>
        <button 
          @click="deleteCategoryBySelection(selectedCategoryId)" 
          class="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition">
          Supprimer la catégorie sélectionnée
        </button>
      </div>
    </div>
  </div>
</template>
