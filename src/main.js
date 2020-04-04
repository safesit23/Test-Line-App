import Vue from 'vue';
import store from './store/index'
import App from './App.vue';
import router from './router';

// User interface
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Library
import VueMoment from 'vue-moment'
import Notifications from 'vue-notification';
import Vuelidate from 'vuelidate';

// LINE Frontend Framework


library.add(fas);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueMoment)

Vue.use(Vuelidate);
Vue.use(Notifications);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.prototype.$liff = window.liff
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  // vuetify,
  render: h => h(App)
}).$mount('#app');
