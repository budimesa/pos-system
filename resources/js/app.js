import './bootstrap';
import '../css/app.css';
import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import PrimeVue from "primevue/config";
import 'primeicons/primeicons.css'
import 'vue-multiselect/dist/vue-multiselect.css'
import Aura from '../js/presets/aura'
import ThemeProvider from '@/Components/ThemeProvider.vue';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),

    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(ThemeProvider, [h(App, props)]) })
            .use(plugin)
            .use(PrimeVue, {
                unstyled: true,
                pt: Aura
            })
            .use(ZiggyVue)
            .use(ToastService) // Menambahkan ToastService ke aplikasi
            .component('Toast', Toast) // Mendaftarkan komponen Toast
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});