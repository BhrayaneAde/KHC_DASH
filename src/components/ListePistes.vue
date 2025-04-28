<script setup>
import { ref, computed, watch } from 'vue'
import { useUserGlobaleStore } from '@/stores/counter'

const props = defineProps({
  refreshSignal:String
})

watch(props, ()=>{
  pistes.users = pistes.users.filter((el) => el.id != props.refreshSignal)
})

const pistes = useUserGlobaleStore()

/* const pistes = ref([
  { no: 1, id: 'PIS1', LastName: 'Doe', FirstName: 'John', Duration: '3:45' },
  { no: 2, id: 'ATS1', LastName: 'Smith', FirstName: 'Jane', Duration: '4:20' },
  { no: 3, id: 'FES1', LastName: 'Johnson', FirstName: 'Alice', Duration: '5:10' },
  { no: 4, id: 'PIS2', LastName: 'Brown', FirstName: 'Bob', Duration: '2:55' },
  { no: 5, id: 'ATS2', LastName: 'Miller', FirstName: 'Eve', Duration: '3:30' },
  { no: 6, id: 'FES2', LastName: 'Davis', FirstName: 'Charlie', Duration: '4:15' },
  { no: 7, id: 'PIS3', LastName: 'Wilson', FirstName: 'Frank', Duration: '2:40' },
  { no: 8, id: 'ATS3', LastName: 'Moore', FirstName: 'Grace', Duration: '3:05' },
  { no: 9, id: 'FES3', LastName: 'Taylor', FirstName: 'Hannah', Duration: '4:50' },
  { no: 10, id: 'PIS4', LastName: 'Anderson', FirstName: 'Isaac', Duration: '2:35' }, 
]) */

const searchQuery = ref('')

const filteredPistes = computed(() => {
  return pistes.users.filter(piste =>
    piste.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    piste.LastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    piste.FirstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    piste.duration.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    piste.dateHeure.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const focusIndex = ref(null)

 const emit = defineEmits(['piste-clicked']) 

 const selectPiste = (piste, index) => {
  emit('piste-clicked', piste)
  focusIndex.value = index
} 
</script>

<template>
  <div class="p-6 bg-white min-h-screen">
    <h1 class="text-2xl font-bold mb-4 text-gray-700">Liste des Pistes</h1>

    <div class="mb-4 flex items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17a1 1 0 01-.293.707l-2 2A1 1 0 0110 19v-3.172a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" />
      </svg>
      <input
      v-model="searchQuery"
      type="text"
      placeholder="Rechercher..."
      class="p-2 border rounded-full w-2/3 hover:bg-gray-100 focus:bg-gray-200 focus:border-gray-300 border-gray-200"
      />
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full table-auto bg-white shadow-lg rounded-xl">
        <thead class="bg-gray-700 text-white text-sm">
          <tr>
            <th class="px-4 py-3 text-left border-l-4 border-r-4 border-white">#</th>
            <th class="px-4 py-3 text-left border-l-4 border-r-4 border-white">
              <div class="flex gap-1 justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#75FB4C"><path d="M280-240v-480h80v480h-80ZM440-80v-800h80v800h-80ZM120-400v-160h80v160h-80Zm480 160v-480h80v480h-80Zm160-160v-160h80v160h-80Z"/></svg>
                ID Piste
              </div>
            </th>
            <th class="px-4 py-3 text-left border-l-4 border-r-4 border-white">
              <div class="flex gap-1 justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F19E39"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                Durée
              </div>
            </th>
            <th class="px-4 py-3 text-left border-l-4 border-r-4 border-white">
              <div class="flex gap-1 justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5985E1"><path d="M722-322q-56-53-89-125t-33-153q0-81 33-153t89-125l62 64q-44 41-69 96t-25 118q0 63 25 119t69 97l-62 62Zm128-128q-32-29-50-67.5T782-600q0-44 18-82.5t50-67.5l64 64q-18 17-29 38.5T874-600q0 26 11 47.5t29 38.5l-64 64Zm-490 10q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-120v-112q0-33 17-62t47-44q51-26 115-44t141-18q77 0 141 18t115 44q30 15 47 44t17 62v112H40Zm80-80h480v-32q0-11-5.5-20T580-266q-36-18-92.5-36T360-320q-71 0-127.5 18T140-266q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-600q0-33-23.5-56.5T360-680q-33 0-56.5 23.5T280-600q0 33 23.5 56.5T360-520Zm0-80Zm0 400Z"/></svg>
                Annotateurs
              </div>
            </th>
            <th class="px-4 py-3 text-left border-l-4 border-r-4 border-white">
              <div class="flex gap-1 justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M200-640h560v-80H200v80Zm0 0v-80 80Zm0 560q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v227q-19-9-39-15t-41-9v-43H200v400h252q7 22 16.5 42T491-80H200Zm520 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm67-105 28-28-75-75v-112h-40v128l87 87Z"/></svg>
                Date & Heure
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(piste, index) in filteredPistes"
            :key="index"
            @click="selectPiste(piste, index)"
            :class="{'bg-gray-400': focusIndex === index, 'text-zinc-50': focusIndex === index, 'cursor-pointer': true}" class="h-15 hover:bg-sky-200"
          >
            <td class="px-4 py-2">
              {{ index+1 }}
            </td>
            <td class="px-4 py-2">
              {{piste.id }}
            </td>
            <td class="px-4 py-2">
              {{piste.duration }}
            </td>
            <td class="px-4 py-2">
              {{piste.FirstName }} {{piste.LastName }}
            </td>
            <td class="px-4 py-2">
              {{ piste.dateHeure }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
