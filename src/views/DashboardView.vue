<script setup>
import HeaderApp from '@/components/HeaderAppAdmin.vue';
import SidebarApp from '@/components/SidebarAppAdmin.vue';
import MainApp from '@/components/MainApp.vue';
import FooterApp from '@/components/FooterAppAdmin.vue';
</script>

<template>
  <div class="flex flex-col h-screen">
    <HeaderApp />
    <div class="main flex flex-1 w-full h-full overflow-hidden">
      <SidebarApp class=" lg:block" />
      <div class="flex flex-col justify-center items-center w-full h-full overflow-y-scroll p-4">
        <MainApp class="w-full h-full" />
      </div>
    </div>
    <FooterApp />
  </div>
</template>

<style scoped>
/* Ajoutez des styles personnalisés si nécessaire */
</style>
