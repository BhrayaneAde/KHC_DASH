import { defineStore } from "pinia";
// import { isAuthentificated } from "./userData";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthentificated : false,

    }),
    actions: {
        login(){
            this.isAuthentificated = true
        },

        logout(){
            this.isAuthentificated = false
        }
    }
})

