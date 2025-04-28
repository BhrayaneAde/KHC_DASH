<script setup>
import HeaderApp from '@/components/HeaderApp.vue';
import SidebarApp from '@/components/SidebarApp.vue';
import MainApp from '@/components/MainApp.vue';
import FooterApp from '@/components/FooterApp.vue';
</script>

<template>
  <div class="flex flex-col h-screen">
    <HeaderApp />
    <div class="main flex w-full h-screen overflow-hidden">
      <SidebarApp />
      <div class="flex flex-col justify-between w-full overflow-y-scroll">
        <MainApp />
      </div>
    </div>
    <div class="bottom-0 pt-10">
      <FooterApp  />
    </div>
  </div>
</template>

<style scoped></style>
