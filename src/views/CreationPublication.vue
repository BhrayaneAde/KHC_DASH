<script setup>
import { ref, onMounted } from 'vue';
import { getUserIdFromToken } from '@/services/api.js'
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
const link = ref('');
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

// Gérer le changement d'image et convertir en base64 (string)
const selectedFile = ref(null);

const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    selectedFile.value = file;
    console.log("Fichier sélectionné :", file);
  } else {
    selectedFile.value = null;
  }
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
// Vérifier si l'utilisateur est connecté
// et récupérer son ID depuis le token
// (Assurez-vous que cette fonction est définie dans votre service API)
// et que le token est valide)
// Si l'utilisateur n'est pas connecté, afficher un message d'erreur
// et ne pas envoyer la requête

const addPublication = async () => {
  const userConnected = getUserIdFromToken();

  if (!userConnected) {
    console.error("Impossible de récupérer l'ID utilisateur depuis le token.");
    return;
  }

  if (!title.value || !content.value || !selectedCategory.value) {
    console.warn("Tous les champs obligatoires ne sont pas remplis.");
    return;
  }

  const formData = new FormData();
  formData.append('titre', title.value);
  formData.append('description', content.value);
  formData.append('lien_pub', link.value || '');
  formData.append('id_categorie_publication', selectedCategory.value);
  formData.append('id_utilisateur', userConnected);

  if (selectedFile.value) {
    formData.append('photo', selectedFile.value); // nom du champ = "photo"
  }

  try {
    if (editingIndex.value !== null) {
      const publicationId = publications.value[editingIndex.value].id;
      await updatePublication(publicationId, formData);
      publications.value[editingIndex.value] = {
        ...publications.value[editingIndex.value],
        titre: title.value,
        description: content.value,
        lien_pub: link.value,
        id_categorie_publication: selectedCategory.value,
      };
      editingIndex.value = null;
    } else {
      const response = await createPublication(formData);
      if (response && response.id) {
        publications.value.push(response);
      } else {
        console.warn("⚠️ Données reçues invalides :", response);
      }
    }

    // Réinitialiser le formulaire
    title.value = '';
    content.value = '';
    selectedFile.value = null;
    link.value = '';
    selectedCategory.value = '';
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout ou modification de la publication :", error.response?.data);
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
               <label class="block text-sm font-medium mb-1">Lien</label>
               <input
                  v-model="link"
                  type="text"
                  class="w-full border rounded px-2 py-1"
                  placeholder="Lien de la publication"
               />
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
               :disabled="!title || !content || !selectedCategory"
               class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
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
        <th class="border border-gray-300 px-4 py-2">Lien</th>
        <th class="border border-gray-300 px-4 py-2">Image</th>
        <th class="border border-gray-300 px-4 py-2">Utilisateur</th>
        <th class="border border-gray-300 px-4 py-2">Catégorie</th>
        <th class="border border-gray-300 px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(publication, index) in publications" :key="publication.id">
        <td class="border border-gray-300 px-4 py-2">{{ publication.titre }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ publication.description }}</td>
        <td class="border border-gray-300 px-4 py-2">
          <a :href="publication.lien_pub" target="_blank" class="text-blue-500 hover:underline">
            {{ publication.lien_pub }}
          </a>
        </td>
        <td class="border border-gray-300 px-4 py-2">
          <img
            v-if="publication.photo"
            :src="publication.photo"
            alt="Image"
            class="w-16 h-16 object-cover"
          />
        </td>
        <td class="border border-gray-300 px-4 py-2">{{ publication.id_utilisateur }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ publication.id_categorie_publication }}</td>
        <td class="border border-gray-300 px-4 py-2">
          <button
            @click="() => { 
              editingIndex.value = index; 
              title.value = publication.titre; 
              content.value = publication.description; 
              link.value = publication.lien_pub; 
              selectedCategory.value = publication.id_categorie_publication; 
              image.value = null; 
            }"
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
</div>

   </div>
</template>
