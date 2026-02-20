import { createApp} from 'vue'
import App from './App.vue'
import Toaster from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-bootstrap.css';
//import VueSweetalert2 from 'vue-sweetalert2';
//import 'sweetalert2/dist/sweetalert2.min.css';

// Vuetify
//import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import * as CryptoJS from 'crypto-js';

import router from './router'
import store from './store/index'
window.$ = window.jQuery = require('jquery');

//import Auth from './packages/Auth.js'

/*slint-disable no-new*/
import Echo from "laravel-echo"
window.Pusher = require('pusher-js');

var token_cry = localStorage.getItem("user_token") || "";
var token = CryptoJS.AES.decrypt(token_cry, 'user_token').toString(CryptoJS.enc.Utf8) || null
/*
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_WEBSOCKETS_KEY,
    wsHost:process.env.VUE_APP_WEBSOCKETS_SERVER,
    wsPort: 6001,
    cluster: "mt1",
    forceTLS: false,
    disableStats: true,
    authEndpoint :'https://imedconnect.or.tz/geer_back/api/broadcasting/auth',
    auth:{
        headers: {
            Authorization: 'Bearer '+token 
        }
    },
 
});*/

const vuetify = createVuetify({
    components,
    directives
  })

createApp(App)
.use(router)
.use(vuetify)
//.use(VueSweetalert2)
.use(Toaster,{position: "top-right"})
.use(store)
.mount('#app')