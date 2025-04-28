import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserGlobaleStore = defineStore('users', () => {
  
const users = ref([
  { no: 1, id: 'PIS1', LastName: 'Doe', FirstName: 'John',email: '3dCtO@example.com', duration: '1:20', dateHeure: '22/04/2025 11h05', performances: {
      Janvier: 75, Février: 80, Mars: 90, Avril: 85, Mai: 88, Juin: 92, Juillet: 95, Aout: 90, Septembre: 85, Octobre: 80, Novembre: 75, Decembre: 70
    } },
  { no: 2, id: 'ATS1', LastName: 'Smith', FirstName: 'Jane',email: '3dCtO@example.com', duration: '3:45',dateHeure: '22/04/2025 11h05', performances: {
      Janvier: 55, Février: 20, Mars: 10, Avril: 89, Mai: 78, Juin: 47, Juillet: 63, Aout: 74, Septembre: 50, Octobre: 60, Novembre: 78, Decembre: 87
  }},
  { no: 3, id: 'FES1', LastName: 'Johnson', FirstName: 'Alice',email: '3dCtO@example.com',duration:'1:55',dateHeure: '22/04/2025 11h05',   performances: {
      Janvier: 55, Février: 20, Mars: 10, Avril: 89, Mai: 78, Juin: 47, Juillet: 63, Aout: 74, Septembre: 50, Octobre: 60, Novembre: 78, Decembre: 87
  }},
  { no: 4, id: 'PIS2', LastName: 'Brown', FirstName: 'Bob',email: '3dCtO@example.com',duration: '7:45',dateHeure: '22/04/2025 11h05',   performances: {
      Janvier: 55, Février: 20, Mars: 10, Avril: 89, Mai: 78, Juin: 47, Juillet: 63, Aout: 74, Septembre: 50, Octobre: 60, Novembre: 78, Decembre: 87
  }},
  { no: 5, id: 'ATS2', LastName: 'Miller', FirstName: 'Eve',email: '3dCtO@example.com',duration:'5:17',dateHeure: '22/04/2025 11h05',   performances: {
      Janvier: 55, Février: 20, Mars: 10, Avril: 89, Mai: 78, Juin: 47, Juillet: 63, Aout: 74, Septembre: 50, Octobre: 60, Novembre: 78, Decembre: 87
  }},
  { no: 6, id: 'FES2', LastName: 'Davis', FirstName: 'Charlie',email: '3dCtO@example.com',duration:'8:15',dateHeure: '22/04/2025 11h05',   performances: {
      Janvier: 55, Février: 20, Mars: 10, Avril: 89, Mai: 78, Juin: 47, Juillet: 63, Aout: 74, Septembre: 50, Octobre: 60, Novembre: 78, Decembre: 87
  }},
  { no: 7, id: 'PIS3', LastName: 'Wilson', FirstName: 'Frank',email: '3dCtO@example.com',duration:'8:45',dateHeure: '22/04/2025 11h05',   performances: {
      Janvier: 55, Février: 20, Mars: 10, Avril: 89, Mai: 78, Juin: 47, Juillet: 63, Aout: 74, Septembre: 50, Octobre: 60, Novembre: 78, Decembre: 87
  }},
  { no: 8, id: 'ATS3', LastName: 'Moore', FirstName: 'Grace',email: '3dCtO@example.com',duration:'2:30',dateHeure: '22/04/2025 11h05',   performances: {
      Janvier: 55, Février: 20, Mars: 10, Avril: 89, Mai: 78, Juin: 47, Juillet: 63, Aout: 74, Septembre: 50, Octobre: 60, Novembre: 78, Decembre: 87
  }},
  { no: 9, id: 'FES3', LastName: 'Taylor', FirstName: 'Hannah',email: '3dCtO@example.com',duration:'9:33',dateHeure: '22/04/2025 11h05',   performances: {
      Janvier: 55, Février: 20, Mars: 10, Avril: 89, Mai: 78, Juin: 47, Juillet: 63, Aout: 74, Septembre: 50, Octobre: 60, Novembre: 78, Decembre: 87
  }},
  { no: 10, id: 'PIS4', LastName: 'Anderson', FirstName: 'Isaac',email: '3dCtO@example.com',duration:'3:28',dateHeure: '22/04/2025 11h05',   performances: {
      Janvier: 55, Février: 20, Mars: 10, Avril: 89, Mai: 78, Juin: 47, Juillet: 63, Aout: 74, Septembre: 50, Octobre: 60, Novembre: 78, Decembre: 87
  }}, 
    
]);
const tabNoteCritere = ref([])

return {users, tabNoteCritere}
})
