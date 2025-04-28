<script setup lang="js">
import { ref } from 'vue';
import Swal from 'sweetalert2'
let tasks = ref([
    {
        id: 1,
        id_audio: 0,
        audio_name: 'fabrication de piste détaché.mp3',
        audio_duree:' 03:54'
    },
]);

// variables de description
let showPisteAudio = ref(false);
// méthode pour ouvrir la description
const openDescript = () => {
    showPisteAudio.value = true;
}
// méthode pour fermer la description
const closeDescript = () => {
    showPisteAudio.value = false;
}

// Déclaration de la variable gérant l'ouverture ou la fermerture de l'ajout
let showForm = ref(false);

/**
* Méthode qui permet d'afficher le formulaire d'ajout ou de modification
*/

const openForm = () => {
    showForm.value = true;
}

/**
* Méthode qui permet de fermer le formulaire d'ajout ou de modification
*/

const closeForm = () => {
    showForm.value = false;
}

//Méthode pour ajouter une ligne au tableau par le formulaire
const newNameAudio = ref('');
const newDureeAudio = ref('')

let id = 0;

function addNewForm() {
    if (newNameAudio.value.trim() !== '' && newDureeAudio.value.trim() !== '') {
        // Vérifier si la durée dépasse 60 minutes
        const durationParts = newDureeAudio.value.split(":").map(Number);
        if (durationParts.length === 2) {
            // Format mm:ss
            const [minutes, secondes] = durationParts;
            if (minutes >= 60) {
                Swal.fire("Veuillez entrer la durée au format hh:mm:ss si elle dépasse 60 minutes.");
                return;
            }

            // Ajouter la tâche au tableau
            tasks.value.push({
                id: id++,
                audio_name: newNameAudio.value,
                audio_duree: newDureeAudio.value // on garde le format 'mm:ss'
            });

            newNameAudio.value = '';
            newDureeAudio.value = '';
            showForm.value = false;

        } else if (durationParts.length === 3) {
            // Format hh:mm:ss
            const [heure, minutes, secondes] = durationParts;

            if (isNaN(minutes) || isNaN(secondes)) {
                Swal.fire("Veuillez entrer la durée au format hh:mm:ss.");
                return;
            }

            // Ajouter la tâche au tableau
            tasks.value.push({
                id: id++,
                audio_name: newNameAudio.value,
                audio_duree: newDureeAudio.value // on garde le format 'hh:mm:ss'
            });

            newNameAudio.value = '';
            newDureeAudio.value = '';
            showForm.value = false;

        } else {
            Swal.fire("Veuillez entrer la durée dans un format valide (min:ss ou hh:mm:ss).");
        }

    } else {
        Swal.fire("Veuillez renseigner tous les champs !");
    }
}

    
// Méthode pour supprimer une ligne
function deleteTasks(index) {
    Swal.fire({
  title: "Etes vous sure?",
  text: "Cette action sera irréversible !",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Oui, supprimer !",
  cancelButtonText: "Annuler"
}).then((result) => {
  if (result.isConfirmed) {
    tasks.value = tasks.value.filter((t) => t != tasks.value[index])
    Swal.fire({
      title: "Supprimé!",
      text: "La piste à été supprimé .",
      icon: "success"
    });
  }
});
    
}
// Variables de modifier
let showModif = ref(false)

// Méthode qui permet d'ouvrir la modification
const openModif = (task) => {
    showModif.value = true;
    newNameAudio.value = task.audio_name;
    newDureeAudio.value = task.audio_duree;
}
/**
* Méthode qui permet de fermer le formulaire d'ajout ou de modification
*/
const closeModif = () => {
    showModif.value = false;
}

// methode permettant de valider les modification
function edit(index){
        if(
            newDureeAudio.value.trim() != '' &&
            newNameAudio.value.trim() != ''
        ){
        tasks.value.splice(index,1,(
        {
            id: index,           
            audio_name: newNameAudio.value,
            audio_duree: newDureeAudio.value,
        })
    )
    newNameAudio.value = '';
    newDureeAudio.value = '';
    showModif.value=false;
    }else{
        alert("veuillez svp remplir tous les champs avant de pouvoir Ajouter")
    }
}
</script>


<template>
    <!-- Tableau affichant la liste des tâches -->
    <section class="w-[100%] h-screen">
        <div class=" mx-auto bg-[#F1F5F9] p-[2em] h-[100%]">
            <div class=" flex justify-between items-center">
                <h1 class="font-bold text-2xl mr-[1em]">Enregistrement d'une piste audio</h1>
                <button class=" w-[10em] flex justify-between items-center  bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-1 font-bold rounded-md"
                    @click="openForm()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 12 12">
                        <path fill="currentColor"
                            d="M6 1.75a.75.75 0 0 1 .75.75v2.75H9.5a.75.75 0 0 1 0 1.5H6.75V9.5a.75.75 0 0 1-1.5 0V6.75H2.5a.75.75 0 0 1 0-1.5h2.75V2.5A.75.75 0 0 1 6 1.75" />
                    </svg>
                    <span>
                        Ajouter une piste audio
                    </span>
                </button>
            </div>
            <div class="flex justify-center w-[100%]">
                <table class="my-4 w-[100%] ">
                    <!-- En tête du tableau d'ajout des piste audio -->
                    <thead class=" border-[#e3e9f1] ">
                        <tr>
                            <th class=" p-4   text-center bg-gray-300">N°</th>
                            <th class=" p-4  text-center bg-gray-300">ID de la piste Audio</th>
                            <th class=" p-4  text-center bg-gray-300">Durée de la piste audio (mm:ss)</th>
                            <th class=" p-4 text-center bg-gray-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(task, index) in tasks" :key="index" class="odd:bg-[#F8FAFC] even:bg-[#dde6f0] border-b-3 border-[#e3e9f1] cursor-pointer hover:bg-[#b3b8bdaf] w-[100%]" >
                            <td class="p-3  text-center font-serif">{{ index + 1 }}</td>
                            <td class="p-3  text-center font-mono">{{ task.audio_name }}</td>
                            <td class="p-3  text-center font-serif">{{ task.audio_duree }}  </td>
                            <td class="p-3 text-center">
                                <div class="flex gap-2 justify-center items-center h-full">
                
                                    <button   class="bg-[#2563EB] hover:bg-blue-700 text-white px-2 py-2 font-bold rounded-md flex gap-3"
                                        @click="openModif(task)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <g fill="none" stroke="currentColor" stroke-linecap="round"
                                                stroke-linejoin="round" stroke-width="1.5">
                                                <path
                                                    d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56" />
                                                <path
                                                    d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.36 1.36 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.36 1.36 0 0 1-.953.395H8.197a1.36 1.36 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086" />
                                            </g>
                                        </svg>
                                        Modifier
                                    </button>
                                    <button @click="deleteTasks(index)"
                                        class="bg-[#DF0808] hover:bg-[#990505] text-white px-2 py-2 font-bold rounded-md flex gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path fill="currentColor"
                                                d="M10 5h4a2 2 0 1 0-4 0M8.5 5a3.5 3.5 0 1 1 7 0h5.75a.75.75 0 0 1 0 1.5h-1.32l-1.17 12.111A3.75 3.75 0 0 1 15.026 22H8.974a3.75 3.75 0 0 1-3.733-3.389L4.07 6.5H2.75a.75.75 0 0 1 0-1.5zm2 4.75a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0zM14.25 9a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75m-7.516 9.467a2.25 2.25 0 0 0 2.24 2.033h6.052a2.25 2.25 0 0 0 2.24-2.033L18.424 6.5H5.576z" />
                                        </svg>
                                            Supprimer
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>


    <!-- Section pour afficher le formulaire d'ajout -->
    <section v-if="showForm">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
        <article class="fixed inset-0 z-10 overflow-y-auto w-screen flex items-center justify-center h-screen">
            <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-semibold text-center text-gray-700">Enregistrer une piste audio</h2>
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

                    <!-- champs de l'ajout du nom de la piste -->
                    <div class="mb-4">
                        <label for="nameaudio" class="block text-gray-700 font-medium mb-2">ID de la piste Audio</label>
                        <input v-model="newNameAudio" type="text" id="nameaudio" name="nameaudio" placeholder="Entrer le nom de la piste audio"
                            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required>
                    </div>

                    <!-- champs de l'ajout du Duree duree de la piste -->
                    <div class="mb-4">
                        <label for="nameaudio" class="block text-gray-700 font-medium mb-2">Duree de la piste audio</label>
                        <input 
                            v-model="newDureeAudio"
                            type="text"
                            id="dureeaudio"
                            placeholder="Format: 00:00"
                            pattern="^\\d{1,2}:\\d{2}$"
                            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required>
                    </div>

                    <!-- Boutons -->
                    <div class="flex justify-between mt-6 gap-4">
                        <button type="submit"
                            class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            @click.prevent="addNewForm()">Ajouter
                        </button>
                        <button type="reset"
                            class="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">Vider
                            le formulaire
                        </button>
                    </div>
                </form>
            </div>
        </article>
    </section>

    <!-- Section affichant la modification -->
    <section v-if="showModif">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
        <article class="fixed inset-0 z-10 overflow-y-auto w-screen flex items-center justify-center h-screen">
            <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-semibold text-center text-gray-700">Modification de la piste Audio</h2>
                    <div class="my-4 flex justify-end">
                        <button class="flex gap-4 px-4 py-1 font-bold rounded-md" @click="closeModif()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                                <path fill="red"
                                    d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <form>

                    <!-- Champs de l'id de la piste audio -->
                    <div class="mb-4">
                        <label for="id_audio" class="block text-gray-700 font-medium mb-2">ID de la piste audio</label>
                        <input v-model="newNameAudio" type="text" id="id_audio" name="id_audio" placeholder="Entrer l'ID de la piste audio"
                            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required>
                    </div>
                    <!-- Champ du nom de piste audio -->
                    <!-- <div class="mb-4">
                        <label for="nameaudio" class="block text-gray-700 font-medium mb-2">Nom de la piste audio</label>
                        <input v-model="newNameAudio" type="text" id="nameaudio" name="nameaudio" placeholder="Entrer le nom de la piste audio"
                            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required>
                    </div> -->

                    <!-- champs de l'ajout du Duree duree de la piste -->
                    <div class="mb-4">
                        <label for="dureeaudio" class="block text-gray-700 font-medium mb-2">Duree de la piste audio</label>
                        <input v-model="newDureeAudio" type="text" id="dureeaudio" name="dureeaudio" placeholder="Format: 00:00"
                            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required>
                    </div>

                    <!-- Boutons -->
                    <div class="flex justify-between mt-6 gap-4" v-for="(task,index) in tasks.slice(index,1)" :key="index">
                        <button type="submit"
                            class="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                            @click.prevent="edit(id)">Modifier</button>
                        <button type="reset"
                            class="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">Vider
                            le formulaire</button>
                    </div>
                </form>
            </div>
        </article>
    </section>
</template>


<style scoped>
</style>