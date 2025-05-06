<script setup>
import { ref } from 'vue'
import FroalaTest from '@/components/FroalaTest.vue' // ajuste le chemin si nécessaire

const categories = ref([])

const newCategory = ref({
  title: '',
  description: ''
})

const addCategory = () => {
  if (newCategory.value.title.trim() && newCategory.value.description.trim()) {
    categories.value.push({ ...newCategory.value, id: Date.now() })
    resetForm()
  }
}

const deleteCategory = (id) => {
  categories.value = categories.value.filter(category => category.id !== id)
}

const editCategory = (category) => {
  newCategory.value = { ...category }
  deleteCategory(category.id)
}

const resetForm = () => {
  newCategory.value.title = ''
  newCategory.value.description = ''
}
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-6 p-4 bg-gray-100 min-h-screen">
    <!-- Formulaire -->
    <div class="lg:w-2/5 mt-40 p-6 bg-white text-gray-900 rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4 text-blue-600">Créer une catégorie</h2>
      <form @submit.prevent="addCategory" class="flex flex-col gap-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
          <input 
            id="title" 
            v-model="newCategory.title" 
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
          Ajouter
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
            <td class="px-6 py-4 text-sm text-gray-900">{{ category.title }}</td>
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
                @click="deleteCategory(category.id)" 
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
    </div>
  </div>
</template>
