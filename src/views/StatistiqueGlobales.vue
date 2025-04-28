<script setup>
import { ref } from 'vue';

const title = ref('');
const content = ref('');
const image = ref(null);
const selectedCategory = ref('');
const categories = ref(['Catégorie 1', 'Catégorie 2', 'Catégorie 3']); // Liste des catégories locales
const publications = ref([]);
const deletedPublications = ref([]);
const editingIndex = ref(null);

const addPublication = () => {
   const userConnected = 'Utilisateur Connecté'; // Remplacez par l'utilisateur connecté réel
   if (title.value && content.value && selectedCategory.value) {
      if (editingIndex.value !== null) {
         // Modifier une publication existante
         publications.value[editingIndex.value] = {
            title: title.value,
            content: content.value,
            image: image.value,
            user: userConnected,
            category: selectedCategory.value,
         };
         editingIndex.value = null;
      } else {
         // Ajouter une nouvelle publication
         publications.value.push({
            title: title.value,
            content: content.value,
            image: image.value,
            user: userConnected,
            category: selectedCategory.value,
         });
      }
      // Réinitialiser les champs du formulaire
      title.value = '';
      content.value = '';
      image.value = null;
      selectedCategory.value = '';
   }
};

const editPublication = (index) => {
   const publication = publications.value[index];
   title.value = publication.title;
   content.value = publication.content;
   image.value = publication.image;
   selectedCategory.value = publication.category;
   editingIndex.value = index;
};

const deletePublication = (index) => {
   const deleted = publications.value.splice(index, 1)[0];
   deletedPublications.value.push(deleted);
};

const restorePublication = (index) => {
   const restored = deletedPublications.value.splice(index, 1)[0];
   publications.value.push(restored);
};
</script>

<template>
   <div class="flex items-center">
      <!-- Formulaire à gauche -->
      <div class="w-[30%] p-4 border-r">
         <h2 class="text-lg font-bold mb-4">Créer une publication</h2>
         <form @submit.prevent="addPublication">
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
                  @change="(e) => (image.value = e.target.files[0])"
                  class="w-full border rounded px-2 py-1"
               />
            </div>
            <div class="mb-4">
               <label class="block text-sm font-medium mb-1">Catégorie</label>
               <select
                  v-model="selectedCategory"
                  class="w-full border rounded px-2 py-1"
               >
                  <option value="" disabled>Sélectionnez une catégorie</option>
                  <option v-for="category in categories" :key="category" :value="category">
                     {{ category }}
                  </option>
               </select>
            </div>
            <button
               type="submit"
               class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
               <tr v-for="(publication, index) in publications" :key="index">
                  <td class="border border-gray-300 px-4 py-2">{{ publication.title }}</td>
                  <td class="border border-gray-300 px-4 py-2">{{ publication.content }}</td>
                  <td class="border border-gray-300 px-4 py-2">
                     <img
                        v-if="publication.image"
                        :src="URL.createObjectURL(publication.image)"
                        alt="Image"
                        class="w-16 h-16 object-cover"
                     />
                  </td>
                  <td class="border border-gray-300 px-4 py-2">{{ publication.user }}</td>
                  <td class="border border-gray-300 px-4 py-2">{{ publication.category }}</td>
                  <td class="border border-gray-300 px-4 py-2">
                     <button
                        @click="editPublication(index)"
                        class="text-blue-500 hover:underline mr-2"
                     >
                        Modifier
                     </button>
                     <button
                        @click="deletePublication(index)"
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
               <tr v-for="(publication, index) in deletedPublications" :key="index">
                  <td class="border border-gray-300 px-4 py-2">{{ publication.title }}</td>
                  <td class="border border-gray-300 px-4 py-2">{{ publication.content }}</td>
                  <td class="border border-gray-300 px-4 py-2">{{ publication.user }}</td>
                  <td class="border border-gray-300 px-4 py-2">{{ publication.category }}</td>
                  <td class="border border-gray-300 px-4 py-2">
                     <button
                        @click="restorePublication(index)"
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