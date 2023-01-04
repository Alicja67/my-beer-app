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
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Ripple from 'primevue/ripple'


const app = createApp(App)

app.use(router)
app.use(PrimeVue, {ripple: true})

app.component('Button', Button)
app.component('DataView', DataView)
app.component('Dropdown', Dropdown)
app.component('InputText', InputText)
app.component('Tag ', Tag)
app.component('Card', Card)

app.directive('ripple', Ripple)

app.mount('#app')
