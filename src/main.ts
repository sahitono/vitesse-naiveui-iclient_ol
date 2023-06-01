import { createRouter, createWebHistory } from "vue-router"
import generatedRoutes from "virtual:generated-pages"
import { createHead } from "@vueuse/head"
import { createPinia } from "pinia"

import App from "./App.vue"
import "uno.css"

const app = createApp(App)
const head = createHead()
const pinia = createPinia()

const router = createRouter({
  history: createWebHistory(),
  routes: generatedRoutes
})

app.use(pinia).use(router).use(head)

app.mount("#app")
