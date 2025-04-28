<script setup>
 import { ref } from 'vue'
import Swal from 'sweetalert2'



let criteres = ref([
    {id: 1, name: 'Critère de performance'},
    {id: 2, name: 'Critère de précision'},
    {id: 3, name: 'Critère de créativité'},
]);

let isAdd = ref(true);
let newName = ref('');
let id = 0;
let showForm = ref(false);

/**
 * Méthode qui permet de fermer le formulaire d'ajout ou de modification
 */
const closeForm = () => {
    showForm.value = false;
    newName.value = ''  
}

// Bouton Envoyer du formulaire 

function addCriteres() {
    if (
        newName.value.trim() != ''
        
    ) {
        criteres.value.push({
            id: id++,
            name: newName.value
            
        })
        newName.value = ''
    
    }else {
        Swal.fire(" Veuillez renseigner ce champ !");
    }

}

function deleteLine(index) {
    Swal.fire({
        title: "Voulez-vous supprimer ce critère ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui !",
        cancelButtonText: "Annuler"
    }).then((result) => {
        if (result.isConfirmed) {
            criteres.value.splice(index, 1);
            Swal.fire({
                title: "Supprimer!",
                text: "Ce critère a été supprimé avec succès.",
                icon: "success"
            });
        }
    });

}

let showName = ref ('')

// Méthode qui fait apparaitre le formulaire et permet de modifier la ligne


const openForm = (isModif, critere = {}, index = '') => {
    if (isModif) {
        isAdd.value = false
        newName.value = critere.name
        
        actuelId = index
    }else {
        isAdd.value = true;
    }
    showForm.value = true;
    
}


// Modifier la ligne

let actuelId = ref('')

function validatedCritere(){
    let critere = criteres.value[actuelId]
    critere.name = newName.value
}
</script>

<template>
    <section class="w-[100%] h-screen">
        <div class="bg-[#F1F5F9] h-[100%]">
            <h1 class="font-bold text-3xl bg-gray-300 p-4 text-center">Liste des criteres</h1>
            <div class="max-w-[96%] mx-auto">
                <div class="my-4 flex justify-end">
                    <button class="flex gap-4 bg-blue-500 hover:bg-blue-700 text-white px-3 py-3 mr-12 font-bold rounded-md"
                        @click="openForm(false)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 12 12">
                            <path fill="currentColor"
                                d="M6 1.75a.75.75 0 0 1 .75.75v2.75H9.5a.75.75 0 0 1 0 1.5H6.75V9.5a.75.75 0 0 1-1.5 0V6.75H2.5a.75.75 0 0 1 0-1.5h2.75V2.5A.75.75 0 0 1 6 1.75" />
                        </svg>
                        <span>
                            Add new critere
                        </span>
                    </button>
                </div>
                <div>
                    <table class="mx-auto w-full  text-center ">
                        <thead>
                            <tr class="hover:bg-gray-200 dark:hover:bg-gray-70 ">
                                <th class=" p-2   bg-gray-300 text-center">N°</th>
                                <th class=" p-2   bg-gray-300 text-center w-4/5">Criteres</th>
                                <th class=" p-2 bg-gray-300 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="hover:bg-gray-200 dark:hover:bg-gray-70 odd:bg-[#F8FAFC] even:bg-[#cbd5e1b2] cursor-pointer" v-for="(critere, index) in criteres" :key="index" >
                                <td class=" dark:hover:bg-gray-70    p-2 text-center">{{ index + 1 }}</td>
                                <td class=" dark:hover:bg-gray-70    p-2">{{ critere.name }}</td>
                                <td class=" dark:hover:bg-gray-70   p-2 text-center">
                                    <div class="flex gap-3 justify-center items-center h-full">
            
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 font-bold rounded-md flex gap-1" @click="openForm(true, critere, index)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24">
                                                <g fill="none" stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="1.5">
                                                    <path
                                                        d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56" />
                                                    <path
                                                        d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.36 1.36 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.36 1.36 0 0 1-.953.395H8.197a1.36 1.36 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086" />
                                                </g>
                                            </svg> Update
                                        </button>
                                        <button class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 font-bold rounded-md flex gap-1"
                                            @click="deleteLine(index)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24">
                                                <path fill="currentColor"
                                                    d="M10 5h4a2 2 0 1 0-4 0M8.5 5a3.5 3.5 0 1 1 7 0h5.75a.75.75 0 0 1 0 1.5h-1.32l-1.17 12.111A3.75 3.75 0 0 1 15.026 22H8.974a3.75 3.75 0 0 1-3.733-3.389L4.07 6.5H2.75a.75.75 0 0 1 0-1.5zm2 4.75a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0zM14.25 9a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75m-7.516 9.467a2.25 2.25 0 0 0 2.24 2.033h6.052a2.25 2.25 0 0 0 2.24-2.033L18.424 6.5H5.576z" />
                                            </svg>Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>

   

    <!-- Section pour afficher le formulaire d'ajout -->
    <section v-if="showForm">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

        <article class="fixed inset-0 z-10 overflow-y-auto w-screen flex items-center justify-center h-screen">
            <div class="max-w-2xl mx-auto bg-[#E2E8F0] p-6 rounded-lg shadow-lg">
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-semibold text-center text-gray-700">Ajout de critère d'évaluation</h2>
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
                    <!-- Champ nom -->
                    <div class="mb-4">
                        <label for="nom" class="block text-gray-700 font-medium mb-2 text-xl">Criteres</label>
                        <input type="text" id="nom" name="nom" v-model="newName"
                            class="w-full p-2  rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500  border-2 border-[#334155 ]"
                            placeholder="Entrez le critere" required>
                    </div>

                   

                    <!-- Boutons -->
                    <div class="flex justify-center mt-6 gap-4">
                        <button type="submit" v-if="isAdd" @click.prevent="addCriteres();closeForm()" 
                            class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Envoyer</button>
                        <button class="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" v-else @click.prevent="validatedCritere(ActuelId); closeForm()">Modifier</button>
                       
                    </div>
                </form>
            </div>
        </article>
    </section>
</template>

<style scoped>

</style>