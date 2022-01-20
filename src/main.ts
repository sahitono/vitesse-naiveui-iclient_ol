import { createRouter, createWebHistory } from "vue-router"
import generatedRoutes from "virtual:generated-pages"
import { setupLayouts } from "virtual:generated-layouts"
import { createHead } from "@vueuse/head"
import { createPinia } from "pinia"

import App from "./App.vue"

const app = createApp(App)
const head = createHead()
const pinia = createPinia()
const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(pinia).use(router).use(head)

app.mount("#app")
