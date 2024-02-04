import { createApp} from 'vue'
import App from './App.vue'
import Toaster from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-bootstrap.css';
//import VueSweetalert2 from 'vue-sweetalert2';
//import 'sweetalert2/dist/sweetalert2.min.css';

import router from './router'
import store from './store/index'
window.$ = window.jQuery = require('jquery');

//import Auth from './packages/Auth.js'

/*slint-disable no-new*/

createApp(App)
.use(router)
//.use(VueSweetalert2)
.use(Toaster,{position: "top-right"})
.use(store)
.mount('#app')