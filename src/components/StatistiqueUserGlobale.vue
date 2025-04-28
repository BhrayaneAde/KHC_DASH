<script setup>
import { ref, watch } from 'vue'
import { useUserGlobaleStore } from '@/stores/counter'

const props = defineProps({
  performanceUser: Object,
})
const globaleUsers = useUserGlobaleStore()

const selectedUserId = ref()
watch(props, (p) => {
  console.log(p.performanceUser)
})
</script>

<template>
  <div class="p-6 bg-white min-h-screen">
    <h2 class="text-xl font-bold text-gray-700 mb-4">Performance périodique de l'annotateur</h2>

    <div v-if="performanceUser">
      <div class="flex flex-col gap-4 ">
        <p>
          <strong>Annotateur:</strong> {{ performanceUser.FirstName }} {{ performanceUser.LastName }}
        </p>
        <div class="flex flex-col gap-4 justify-end mr-10">
          <div class="flex items-center gap-4">
            <label for="date" class="font-semibold text-gray-700">Filtre :</label>
            <div class="flex items-center gap-2">
              <input 
          type="date" 
          id="date" 
          class="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span class="text-gray-500">à</span>
              <input 
          type="date" 
          class="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>   
<div class="flex gap-10 mt-10">
  <div class="rounded-xl w-[30%] bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
    <h3 class="px-4 py-3 text-center text-2xl font-semibold border-b border-blue-300">Nombre d'annotations</h3>
    <div class="flex justify-center items-center h-32">
      <p class="text-center text-4xl font-bold">{{ 5 }}</p>
    </div>
  </div>
  <div class="rounded-xl w-[30%] bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
    <h3 class="px-4 py-3 text-center text-2xl font-semibold border-b border-green-300">Nombre de minutes annotées</h3>
    <div class="flex justify-center items-center h-32">
      <p class="text-center text-4xl font-bold">{{ 5 }}</p>
    </div>
  </div>
  <div class="rounded-xl w-[30%] bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
    <h3 class="px-4 py-3 text-center text-2xl font-semibold border-b border-purple-300">Score total</h3>
    <div class="flex justify-center items-center h-32">
      <p class="text-center text-4xl font-bold">{{ 5 }}</p>
    </div>
  </div>
</div>
    </div>

    <div v-else>Veuillez sélectionner un utilisateur.</div>
  </div>
</template>