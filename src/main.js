import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createAuth0 } from '@auth0/auth0-vue';


createApp(App)
  .use(router)
  .use(
    createAuth0({
      domain: "dev-9dydb7no.us.auth0.com",
      client_id: "ZalYv6u0tlVlgUiaFnso3eCeKVkEfSTX",
      redirect_uri: window.location.origin,
      audience: "https://vue-project-gerardfp.vercel.app/api",
      useRefreshTokens: true,
      cacheLocation: "localstorage",
    })
  )
  .mount("#app");