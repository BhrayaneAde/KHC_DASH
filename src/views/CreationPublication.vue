<script setup>
import { ref, onMounted } from 'vue';
import {
   getCategories,
   createPublication,
   getAllPublications,
   updatePublication,
   deletePublication,
} from '@/services/api';

const title = ref('');
const content = ref('');
const image = ref(null);
const selectedCategory = ref('');
const categories = ref([]);
const publications = ref([]);
const deletedPublications = ref([]);
const editingIndex = ref(null);

// Récupérer les catégories dynamiquement
const fetchCategories = async () => {
   try {
      const response = await getCategories();
      categories.value = response.data; // Assurez-vous que la réponse contient un tableau de catégories
   } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
   }
};
// Gérer le changement d'image
const handleImageChange = (e) => {
   image.value = e.target.files[0];
};


// Récupérer toutes les publications
const fetchPublications = async () => {
   try {
      const response = await getAllPublications();
      publications.value = response.data; // Assurez-vous que la réponse contient un tableau de publications
   } catch (error) {
      console.error('Erreur lors de la récupération des publications:', error);
   }
};

// Ajouter ou modifier une publication
const addPublication = async () => {
   console.log('Titre:', title.value);
   console.log('Contenu:', content.value);
   /* console.log('Image:', image.value); */
   console.log('Catégorie:', selectedCategory.value);
   const userConnected = 'Utilisateur Connecté'; // Remplacez par l'utilisateur connecté réel

   if (title.value && content.value && selectedCategory.value) {
      const formData = new FormData();
      formData.append('title', title.value);
      formData.append('content', content.value);
      formData.append('user', userConnected);
      formData.append('category', selectedCategory.value);

      if (image.value) {
         formData.append('image', image.value);
      }

      try {
         if (editingIndex.value !== null) {
            const publicationId = publications.value[editingIndex.value].id;
            await updatePublication(publicationId, formData); // Peut nécessiter adaptation côté backend
            publications.value[editingIndex.value] = { ...publications.value[editingIndex.value], title: title.value, content: content.value, category: selectedCategory.value };
            editingIndex.value = null;
         } else {
            const response = await createPublication(formData);
            publications.value.push(response.data);
         }

         // Réinitialiser le formulaire
         title.value = '';
         content.value = '';
         image.value = null;
         selectedCategory.value = '';
      } catch (error) {
         console.error("Erreur lors de l'ajout/modification de la publication:", error);
      }
   }
};


// Supprimer une publication
const deletePublicationHandler = async (index) => {
   try {
      const publicationId = publications.value[index].id; // Assurez-vous que chaque publication a un ID
      await deletePublication(publicationId);
      const deleted = publications.value.splice(index, 1)[0];
      deletedPublications.value.push(deleted);
   } catch (error) {
      console.error('Erreur lors de la suppression de la publication:', error);
   }
};

// Charger les données au montage du composant
onMounted(() => {
   fetchCategories();
   fetchPublications();
});
</script>


<template>
   <div class="flex items-center">
      <!-- Formulaire à gauche -->
      <div class="w-[30%] p-4 border-r">
         <h2 class="text-lg font-bold mb-4">Créer une publication</h2>
         <form @submit.prevent="addPublication()">
            <div class="mb-4">
               <label class="block text-sm font-medium mb-1">Titre</label>
               <input
                  v-model="title"
                  type="text"
                  class="w-full border rounded px-2 py-1"
                  placeholder="Titre de la publication"
               />
            </div>
            <div class="mb-4">
               <label class="block text-sm font-medium mb-1">Contenu</label>
               <textarea
                  v-model="content"
                  class="w-full border rounded px-2 py-1"
                  placeholder="Contenu de la publication"
               ></textarea>
            </div>
            <div class="mb-4">
               <label class="block text-sm font-medium mb-1">Image</label>
              <input
                  type="file"
                  @change="handleImageChange"
                  class="w-full border rounded px-2 py-1"
                  accept="image/*"
               />

            </div>
            <div class="mb-4">
               <label class="block text-sm font-medium mb-1">Catégorie</label>
               <select
               id="selectCategory"
                  v-model="selectedCategory"
                  class="w-full border rounded px-2 py-1"
               >
                  <option value="" disabled>Sélectionnez une catégorie</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                     {{ category.titre || 'Titre non disponible' }}
                  </option>
               </select>

            </div>
            <button
               type="submit"
               :disabled="!title || !content || !selectedCategory  || (editingIndex !== null && !image)"
               class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
               @click="editingIndex !== null ? (editingIndex = null) : null"
               @mouseover="editingIndex !== null ? (editingIndex = null) : null"
               @mouseout="editingIndex !== null ? (editingIndex = null) : null"
               @focus="editingIndex !== null ? (editingIndex = null) : null"
               @blur="editingIndex !== null ? (editingIndex = null) : null"
            >
               {{ editingIndex !== null ? 'Modifier' : 'Ajouter' }}
            </button>
         </form>
      </div>

      <!-- Tableau à droite -->
      <div class="w-[70%] p-4">
         <h2 class="text-lg font-bold mb-4">Publications</h2>
         <table class="w-full border-collapse border border-gray-300">
            <thead>
               <tr class="bg-gray-100">
                  <th class="border border-gray-300 px-4 py-2">Titre</th>
                  <th class="border border-gray-300 px-4 py-2">Contenu</th>
                  <th class="border border-gray-300 px-4 py-2">Image</th>
                  <th class="border border-gray-300 px-4 py-2">Utilisateur</th>
                  <th class="border border-gray-300 px-4 py-2">Catégorie</th>
                  <th class="border border-gray-300 px-4 py-2">Actions</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="(publication, index) in publications" :key="publication.id">
                  <td class="border border-gray-300 px-4 py-2">{{ publication.title }}</td>
                  <td class="border border-gray-300 px-4 py-2">{{ publication.content }}</td>
                  <td class="border border-gray-300 px-4 py-2">
                     <img
                        v-if="publication.image"
                        :src="publication.image"
                        alt="Image"
                        class="w-16 h-16 object-cover"
                     />
                  </td>
                  <td class="border border-gray-300 px-4 py-2">{{ publication.user }}</td>
                  <td class="border border-gray-300 px-4 py-2">{{ publication.category }}</td>
                  <td class="border border-gray-300 px-4 py-2">
                     <button
                        @click="() => { editingIndex.value = index; title.value = publication.title; content.value = publication.content; selectedCategory.value = publication.category; image.value = null; }"
                        class="text-blue-500 hover:underline mr-2"
                     >
                        Modifier
                     </button>
                     <button
                        @click="() => deletePublicationHandler(index)"
                        class="text-red-500 hover:underline"
                     >
                        Supprimer
                     </button>
                  </td>
               </tr>
            </tbody>
         </table>

         <h2 class="text-lg font-bold mt-8 mb-4">Publications supprimées</h2>
         <table class="w-full border-collapse border border-gray-300">
            <thead>
               <tr class="bg-gray-100">
                  <th class="border border-gray-300 px-4 py-2">Titre</th>
                  <th class="border border-gray-300 px-4 py-2">Contenu</th>
                  <th class="border border-gray-300 px-4 py-2">Utilisateur</th>
                  <th class="border border-gray-300 px-4 py-2">Catégorie</th>
                  <th class="border border-gray-300 px-4 py-2">Actions</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="(publication, index) in deletedPublications" :key="publication.id">
                  <td class="border border-gray-300 px-4 py-2">{{ publication.title }}</td>
                  <td class="border border-gray-300 px-4 py-2">{{ publication.content }}</td>
                  <td class="border border-gray-300 px-4 py-2">{{ publication.user }}</td>
                  <td class="border border-gray-300 px-4 py-2">{{ publication.category }}</td>
                  <td class="border border-gray-300 px-4 py-2">
                     <button
                        @click="() => { publications.value.push(publication); deletedPublications.value.splice(index, 1); }"
                        class="text-green-500 hover:underline"
                     >
                        Restaurer
                     </button>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>
</template>


<style scoped>
/* Ajoutez vos styles ici si nécessaire */
</style>