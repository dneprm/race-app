import axios from '@/plugins/axios';
import { JSONpath } from '@/helpers/JSONpath';

const initialState = {
  initialHorsesData: [],
  horsesList: [],
};

const getters = {
};

const mutations = {
  setInitialHorsesData(state, payload) {
    state.initialHorsesData = payload;
  },
  setHorsesList(state, payload) {
    state.horsesList = payload;
  },
};

const actions = {
  async fetchHorsesData({ commit }) {
    try {
      const data = await axios.get(`${JSONpath()}/horsesData.json`);
      const horsesData = data.data;

      commit('setInitialHorsesData', horsesData);
      return horsesData;
    } catch (error) {
      return error.response;
    }
  },
};


export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};
