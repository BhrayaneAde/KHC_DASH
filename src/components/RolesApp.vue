<script setup>
import { ref } from 'vue';
import HeaderTable from './HeaderTable.vue'
import { users,roles } from '@/data/userData';
import Swal from 'sweetalert2';

let newRole = ref('');
let showForm = ref(false);
let isAdd = ref(false)
let actuelId = ref();

const closeForm = () => {
    showForm.value = false
    newRole.value = '';
  
}

// FONCTION POUR AJOUTER UN ROLE
function addRole() {
    if (
        newRole.value.trim() != '' 
      
        // newRuleId.value != ''
    ) 

    {
      let checkRole = roles.value.find(r=> r.libelleRole === newRole.value.toLocaleLowerCase())
      if(checkRole){
        alert(`Ce role existe déja, veillez choissir un autre.`)
        console.log(`Ce role existe déja, veillez choissir un autre.`);
        
      }else{ 
        roles.value.push({
            id: roles.value.length +1,
            libelleRole: newRole.value,        
        })
        newRole.value = '';     
    }
      }
        else {
        alert("Veuillez renseigner les champs svp!!!")
    }
    
}

// /Fonction pour supprimer une ligne du tableau
function deleteLine(index) {
    Swal.fire({
        title: "Voulez-vous supprimer la tache?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui!"
    }).then((result) => {
        if (result.isConfirmed) {
            roles.value.splice(index, 1);
            Swal.fire({
                title: "Supprimer!",
                text: "L'élement a été supprimé avec succès.",
                icon: "success"
            });
        }
    });

}


//Fonction pour ouvrir le formulaire de modification
const openUpadateForm = (isModif, role = {}, index = '') => {
    if (isModif) {
        isAdd.value = false
        newRole.value = role.libelleRole
        actuelId.value = index

    }else {
        isAdd.value = true;
    }
    showForm.value = true;
    console.log('index:', index)
    
}


/**
 * Fonction pour modifier la ligne selectionnée 
 */
function validatedUpdateRole(){
    let role = roles.value[actuelId.value]
    let checkRole = roles.value.find(r=> r.libelleRole === newRole.value.toLocaleLowerCase())
    if(checkRole){
      alert(`Ce role existe déja, veillez choissir un autre.`)
      console.log(`Ce role existe déja, veillez choissir un autre.`);
    }else {
      role.libelleRole = newRole.value 
    console.log('actuel id: ',actuelId)
    }   
}

</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <div class="flex mx-4 my-2 items-center justify-center">
          <svg
            class="w-6 h-6 mr-2.5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
            ></path>
          </svg>
          <nav class="text-md text-gray-500 mt-1 ml-4 flex gap-1.5">
            Home
            <svg
              class="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Rôles
            <svg
              class="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            List
          </nav>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl mx-4 my-2">Liste des rôles</h2>
      </div>
    </div>


    <!-- Debut composant header -->

         <!-- <HeaderTable @responseRoloe="showForm=true ; isAdd=true"/> -->

     <!-- Search & Actions -->
     <div class="flex items-center justify-between mb-4 ml-4">
      <div class="relative w-1/3 flex justify-between">
        <input
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          type="text"
          placeholder="Rechercher un utilisateur"
        />

        <div class="flex items-center space-x-2 ml-5 border-l border-l-gray-300 text-gray-500 pl-2">
          <a
            href="#"
            class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-300 hover:bg-gray-100 dark:hover:text-gray-900"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>

          <a
            href="#"
            class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-300 hover:bg-gray-100 dark:hover:text-gray-900"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>

          <a
            href="#"
            class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-300 hover:bg-gray-100 dark:hover:text-gray-900"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>

          <a
            href="#"
            class="inline-flex justify-center p-1text-gray-500 rounded cursor-pointer hover:text-gray-300 hover:bg-gray-100 dark:hover:text-gray-900"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <div class="flex gap-2">
        <button @click.prevent="showForm=true; isAdd=true" class="bg-blue-600 text-white px-4 py-2 font-bold rounded-lg">+ Ajouter</button>
        <button
          class="border px-3 py-2 mx-2 rounded-lg flex items-center font-semibold border-gray-300"
        >
          <svg
            class="w-5 h-5 mr-2 -ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Exporter
        </button>
      </div>
    </div>
<!-- fin composant Header -->
    

    <section v-if="showForm">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

        <article class="fixed inset-0 z-10 overflow-y-auto w-screen flex items-center justify-center h-screen">
            <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-semibold text-center text-gray-700">Formulaire d'ajout d'un role</h2>
                    <div class="my-4 flex justify-end">
                        <button class="flex gap-4 px-4 py-1 font-bold rounded-md" @click="closeForm()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                                <path fill="red"
                                    d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <form>                   

                    <!-- Champ prenom de l'utilisateur -->
                    
                    <div class="mb-4">
                        <label for="nom" class="block text-gray-700 font-medium mb-2">Libellé du role</label>
                        <input type="text" id="nom" name="nom" v-model="newRole"
                            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Entrez le role" required>
                    </div>


                     <!-- Boutons -->
                     <div class="flex justify-between mt-6 gap-4">
                        <button type="submit" v-if="isAdd" @click.prevent="addRole(); closeForm()" 
                            class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Envoyer
                        </button>

                        <button class="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" 
                        v-else  @click.prevent="validatedUpdateRole(); closeForm()">Modifier</button>
                        <button type="reset"
                            class="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">Vider
                            le formulaire</button>
                    </div>                              
                </form>
            </div>
        </article>
</section>


<!-- //Tableau pour afficher les données -->
    <table class="w-full text-left">
      <thead class="bg-gray-200 text-white">
        <tr class="text-gray-500 bg-gray-100 text-sm">
          <th class="px-4 py-2 text-left">
            <input type="checkbox" class="form-checkbox text-indigo-600" />
          </th>
          <th class="px-4 py-2 text-left">Identifiant</th>
          <th class="px-4 py-2 text-left">Libellé</th>
          <th class="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(role,index) in roles" :key="index" class="hover:bg-gray-100">
          <td class="px-4 py-2 border-b border-gray-300">
            <input type="checkbox" class="form-checkbox text-indigo-600" />
          </td>
          <td class="p-4 border-b border-gray-300">{{role.id}}</td>
          <td class="p-4 border-b border-gray-300">{{ role.libelleRole }}</td>
          <td class="p-4 border-b border-gray-300">

            <button  @click.prevent="openUpadateForm(true, role, index)"
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Modifier
            </button>
            <button  @click="deleteLine(index)"
              class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ml-2"
            >
              Supprimer
            </button>
          </td>
        </tr>
       
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>