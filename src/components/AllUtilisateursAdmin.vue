<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Gestion des Utilisateurs</h1>

    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
      {{ errorMessage }}
    </div>

    <!-- Utilisateurs actifs -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Utilisateurs Actifs</h2>
      <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
        <th class="border border-gray-300 px-4 py-2">ID</th>
        <th class="border border-gray-300 px-4 py-2">Nom</th>
        <th class="border border-gray-300 px-4 py-2">Email</th>
        <th class="border border-gray-300 px-4 py-2">Téléphone</th>
        <th class="border border-gray-300 px-4 py-2">Statut</th>
        <th class="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in activeUsers" :key="user.id">
        <td class="border border-gray-300 px-4 py-2">{{ user.id }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ user.nom || 'N/A' }} {{ user.prenoms || 'N/A' }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ user.telephone }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ user.statut }}</td>
        <td class="border border-gray-300 px-4 py-2">
          <button class="bg-yellow-500 text-white px-3 py-1 rounded mr-2" @click="handleSuspendUser(user.id)">
          Suspendre
          </button>
          <button class="bg-red-500 text-white px-3 py-1 rounded" @click="handleDeleteUser(user.id)">
          Supprimer
          </button>
        </td>
        </tr>
      </tbody>
      </table>
    </div>

    <!-- Utilisateurs suspendus -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Utilisateurs Suspendus</h2>
      <table class="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2">ID</th>
            <th class="border border-gray-300 px-4 py-2">Nom</th>
            <th class="border border-gray-300 px-4 py-2">Email</th>
            <th class="border border-gray-300 px-4 py-2">Téléphone</th>
            <th class="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in suspendedUsers" :key="user.id">
            <td class="border border-gray-300 px-4 py-2">{{ user.id }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ user.nom }} {{ user.prenoms }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ user.telephone }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <button class="bg-green-500 text-white px-3 py-1 rounded mr-2" @click="handleRestoreUser(user.id)">
                Restaurer
              </button>
              <button class="bg-red-500 text-white px-3 py-1 rounded" @click="handleDeleteUser(user.id)">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Utilisateurs supprimés -->
    <div>
      <h2 class="text-xl font-semibold mb-2">Utilisateurs Supprimés</h2>
      <table class="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2">ID</th>
            <th class="border border-gray-300 px-4 py-2">Nom</th>
            <th class="border border-gray-300 px-4 py-2">Email</th>
            <th class="border border-gray-300 px-4 py-2">Téléphone</th>
            <th class="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in deletedUsers" :key="user.id">
            <td class="border border-gray-300 px-4 py-2">{{ user.id }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ user.nom }} {{ user.prenoms }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ user.telephone }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <button class="bg-green-500 text-white px-3 py-1 rounded" @click="handleRestoreDeletedUser(user.id)">
                Restaurer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { 
  getUsers, 
  suspendUserById, 
  deleteUserById, 
  restoreUserById, 
  restoreDeletedUserById 
} from '@/services/api.js';

const users = ref([]);
const errorMessage = ref('');

// Charger les utilisateurs avec gestion d'erreur
const loadUsers = async () => {
  try {
    const response = await getUsers();
    users.value = response.data;
    errorMessage.value = '';
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs', error);

    if (error.response?.status === 401) {
      errorMessage.value = "Session expirée. Redirection en cours...";
      localStorage.removeItem('access_token');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } else {
      errorMessage.value = "Une erreur est survenue lors du chargement des utilisateurs.";
    }
  }
};

onMounted(() => {
  loadUsers();
});

// Filtres
const activeUsers = computed(() => users.value.filter(user => user.statut === 'Actif'));
const suspendedUsers = computed(() => users.value.filter(user => user.statut === 'Suspendu'));
const deletedUsers = computed(() => users.value.filter(user => user.statut === 'Supprimé'));

// Actions
const handleSuspendUser = async (id) => {
  try {
    await suspendUserById(id);
    loadUsers();
    alert('Utilisateur suspendu.');
  } catch (error) {
    console.error('Erreur lors de la suspension', error);
  }
};

const handleDeleteUser = async (id) => {
  try {
    await deleteUserById(id);
    loadUsers();
    alert('Utilisateur supprimé.');
  } catch (error) {
    console.error('Erreur lors de la suppression', error);
  }
};

const handleRestoreUser = async (id) => {
  try {
    await restoreUserById(id);
    loadUsers();
    alert('Utilisateur restauré.');
  } catch (error) {
    console.error('Erreur lors de la restauration', error);
  }
};

const handleRestoreDeletedUser = async (id) => {
  try {
    await restoreDeletedUserById(id);
    loadUsers();
    alert('Utilisateur restauré.');
  } catch (error) {
    console.error("Erreur lors de la restauration d'un utilisateur supprimé", error);
  }
};
</script>
