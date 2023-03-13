import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import { router } from "./router/router";
import { store } from "./store/store";

import '/node_modules/primevue/resources/primevue.min.css';
import '/node_modules/primevue/resources/themes/lara-light-blue/theme.css';
import '/node_modules/primeflex/primeflex.css';
import '/node_modules/primeicons/primeicons.css';

import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

const app = createApp(App);

app.component("InputText", InputText);
app.component("InputMask", InputMask);
app.component("Button", Button);
app.component("Toast", Toast);

app.use(router);
app.use(store);
app.use(PrimeVue);
app.use(ToastService);

app.mount('#app');
