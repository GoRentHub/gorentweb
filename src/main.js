import Vue from 'vue';
import App from './App.vue';
import * as firebase from 'firebase';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { firestorePlugin } from 'vuefire'


Vue.config.productionTip = false;

Vue.use(firestorePlugin);

const configOptions = {
 

  apiKey: "AIzaSyAJXmXWZAMZWxQs4VPwq1MeImSSxjKfU5c",
  authDomain: "gorenthub.firebaseapp.com",
  projectId: "gorenthub",
  storageBucket: "gorenthub.appspot.com",
  messagingSenderId: "1059713931754",
  appId: "1:1059713931754:web:69efbdc0f5091180717a93",
  measurementId: "G-EG48ST6F2B"
};

firebase.initializeApp(configOptions);

let app;

firebase.auth().onAuthStateChanged(user => {
  store.dispatch('auth/fetchUser', user);
  if(!app) {
    new Vue({
      store,
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app');
  }
});
