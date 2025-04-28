<script setup>
import { ref } from 'vue'

// Données des catégories
const categories = ref([])

// Formulaire de création
const newCategory = ref({
  title: '',
  description: ''
})

// Ajouter une catégorie
const addCategory = () => {
  if (newCategory.value.title && newCategory.value.description) {
    categories.value.push({ ...newCategory.value, id: Date.now() })
    newCategory.value.title = ''
    newCategory.value.description = ''
  }
}

// Supprimer une catégorie
const deleteCategory = (id) => {
  categories.value = categories.value.filter(category => category.id !== id)
}

// Modifier une catégorie
const editCategory = (category) => {
  newCategory.value = { ...category }
  deleteCategory(category.id)
}
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-4">
    <!-- Formulaire de création -->
    <div class="lg:w-[40%] p-4 bg-gray-100 rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Créer une catégorie</h2>
      <form @submit.prevent="addCategory" class="flex flex-col gap-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
          <input 
            id="title" 
            v-model="newCategory.title" 
            type="text" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
            placeholder="Titre de la catégorie" 
            required 
          />
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            id="description" 
            v-model="newCategory.description" 
            rows="3" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
            placeholder="Description de la catégorie" 
            required
          ></textarea>
        </div>
        <button 
          type="submit" 
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
          Ajouter
        </button>
      </form>
    </div>

    <!-- Tableau des catégories -->
    <div class="lg:w-[60%] p-4 bg-white rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Liste des catégories</h2>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="category in categories" :key="category.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ category.title }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ category.description }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button 
                @click="editCategory(category)" 
                class="text-blue-600 hover:text-blue-900 mr-2">
                Modifier
              </button>
              <button 
                @click="deleteCategory(category.id)" 
                class="text-red-600 hover:text-red-900">
                Supprimer
              </button>
            </td>
          </tr>
          <tr v-if="categories.length === 0">
            <td colspan="3" class="px-6 py-4 text-center text-sm text-gray-500">Aucune catégorie disponible</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
