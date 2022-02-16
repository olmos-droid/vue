import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createAuth0 } from '@auth0/auth0-vue';


createApp(App)    
    .use(router)
    .use(
        createAuth0({
            domain: "dev-y8fahynx.us.auth0.com",
            client_id: "E1YmsI1kL7dlYpxw7cLUe9BVgUexPjzI",
            redirect_uri: window.location.origin,
            audience: "https://vue-project-gerardfp.vercel.app/api",
            useRefreshTokens: true,
            cacheLocation: 'localstorage'
        })
    )
    .mount('#app');