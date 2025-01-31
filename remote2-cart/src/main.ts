import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import App from './CartApp.vue';

const app = createApp(App);
app.use(Toast);
app.mount('#app'); 