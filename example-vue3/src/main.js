import { createApp } from 'vue'
import App from './App.vue'

// Import plugin
import VueLanyard from '../../src/index';

const app = createApp(App)
app.use(VueLanyard)
app.mount('#app')
