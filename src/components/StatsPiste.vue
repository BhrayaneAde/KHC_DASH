<script setup>
defineProps({
  piste1: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col p-2" v-if="piste1">
    <div class="stats">
      <h2 class="text-gray-400 text-xl font-bold m-5">Statistiques Journalières</h2>
      <div class="stats_content flex flex-col gap-3 border text-[#F8FAFC] bg-gray-700 rounded-lg py-3 p-4 shadow-lg/50 shadow-white">
        <div class="flex">
          <p class="pr-1 font-bold">Annotateur:</p>
          <span class="">{{ piste1.LastName }} {{ piste1.FirstName }}</span>
        </div>
        <div class="flex">
          <p class="pr-1 font-bold">Nombre de pistes traitées:</p>
          <span class="">15</span>
        </div>
        <div class="flex">
          <p class="pr-1 font-bold">Moyenne Annotateur:</p>
          <span class="">3/5</span>
        </div>
        <div class="flex">
          <p class="pr-1 font-bold">Statut Objectif:</p>
          <span class="pr-1">70%</span>
          <span class="pr-1">Atteint</span>
        </div>
      </div>
    </div>
  </div>
</template>
