import { createApp } from "vue"
import { registerPlugins } from "@/plugins"
import { createPinia } from 'pinia'

import App from "./App.vue"
import "./styles/main.css"


const pinia = createPinia()
const app = createApp(App)
registerPlugins(app)
app
    .use(pinia)
    .mount("#app")
