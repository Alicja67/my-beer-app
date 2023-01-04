import { createApp } from 'vue'
import './style.css'
import './assets/global.scss'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import DataView from 'primevue/dataview'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'


const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.component('Button', Button)
app.component('DataView', DataView)
app.component('Dropdown', Dropdown)
app.component('InputText', InputText)

app.mount('#app')
