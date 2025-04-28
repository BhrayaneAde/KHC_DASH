<script setup>
import { ref } from 'vue'

const props = defineProps({
  piste2: {
    type: Object,
    required: true,
  },
  average: Number
})

const evaluations = ref([])
</script>

<template>
  <div v-if="piste2" class="p-6 text-gray-800">
    <h2 class="text-xl font-bold text-gray-400 mb-5">Informations de la piste</h2>

    <div
      class="flex flex-col gap-3 mb-6 p-4 rounded-lg text-[#F8FAFC] bg-gray-700 border shadow-lg/50 shadow-white"
    >
    <p><strong>ID :</strong> {{ piste2.id }}</p>
      <p><strong>Durée :</strong> {{ piste2.duration }}</p>
      <p><strong>Date et Heure:</strong> {{ piste2.dateHeure.replace(' ', ' à ') }}</p>
      <p><strong>Moyenne Piste:</strong> <span class="text-[#22C55E]">{{ average }}</span></p>
    </div>
  </div>
</template>
