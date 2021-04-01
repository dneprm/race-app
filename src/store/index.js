import Vue from 'vue';
import Vuex from 'vuex';

import global from './global';
import race from './race';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    race
  },
  strict: process.env.NODE_ENV !== 'production',
});