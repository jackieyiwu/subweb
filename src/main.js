import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import DialogView from '@/components/dialog/DialogView.vue';
import { showDialog, closeDialog } from 'components/dialog';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

function runtimeConfigUrl(path) {
    return `${import.meta.env.BASE_URL}${path}`;
}

function loadRuntimeConfigScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = () => {
            script.remove();
            reject(new Error(`Failed to load ${src}`));
        };
        document.head.appendChild(script);
    });
}

async function loadRuntimeConfig() {
    if (window.config) {
        return;
    }

    const sources = [runtimeConfigUrl('conf/config.js?v=cf_v1'), runtimeConfigUrl('conf/config_static.js')];
    let lastError;

    for (const source of sources) {
        try {
            await loadRuntimeConfigScript(source);
            if (window.config) {
                return;
            }
        } catch (error) {
            lastError = error;
        }
    }

    if (lastError) {
        console.warn(lastError.message);
    }
}

await loadRuntimeConfig();

const app = createApp(App);

// Register all icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.component('DialogView', DialogView);
app.use(router).use(store);

app.config.globalProperties.$showDialog = showDialog;
app.config.globalProperties.$closeDialog = closeDialog;
app.mount('#app');
