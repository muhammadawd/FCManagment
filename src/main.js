import Vue from "vue";
import App from "./App";
import router from "./router/index";
import './bootstrap/bootstrap'
import "./bootstrap/ml";
import {store} from "./store/store";
import VueSweetalert2 from 'vue-sweetalert2';


// import Vuelidate from 'vuelidate';
import VueHtmlToPaper from 'vue-html-to-paper';

// Vue.use(Vuelidate)
Vue.use(VueHtmlToPaper, {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
});

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(PaperDashboard);
Vue.use(VueSweetalert2);

import {helper} from "@/bootstrap/helper";

Vue.prototype.$helper = helper;

/* eslint-disable no-new */
new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount("#app");
