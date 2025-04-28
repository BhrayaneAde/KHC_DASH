<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  piste2: Object,
})

const route = useRoute()

const evaluations = ref([])


</script>

<template>
  <div class="p-6 bg-white min-h-screen text-gray-800">
    <h2 class="text-xl font-bold text-[#2563EB] mb-4">Évaluation de la piste</h2>

    <!-- Infos Piste -->
    <div v-if="piste2" class="mb-6 p-4 rounded-lg shadow bg-[#F8FAFC] border border-[#334155]">
      <p><strong>ID :</strong> {{ piste2.id }}</p>
      <p><strong>Durée :</strong> {{  }}</p>
      <p><strong>Note Moyenne :</strong> <span class="text-[#22C55E]">{{ piste2.moyenne }}</span></p>
    </div>
    <div v-else class="text-gray-500">
        Sélectionnez une piste à évaluer.
    </div>
  </div>
</template>
