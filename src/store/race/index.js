import axios from '@/plugins/axios';
import { JSONpath } from '@/helpers/JSONpath';
import { generateHorsesList } from '@/helpers/generateHorsesList';

const initialState = {
  initialHorsesData: [],
  horsesList: [],
  raceLaps: [],
  isRaceProgramGenerated: false,
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
  initRaceLaps(state) {
    const laps = process.env.VUE_APP_RACE_LAPS.split(',');
    state.raceLaps = laps.map((lap) => {
      return {
        lapDistance: +lap,
        program: [],
        result: []
      };
    });
  },
  setRaceLaps(state, payload) {
    state.raceLaps = payload;
  },
  generateRaceLapsProgram(state) {
    state.raceLaps.forEach((lap, index) => {
      const horsesList = generateHorsesList(state.horsesList, 10);
      state.raceLaps[index].program = horsesList.map((item, index) => { return { ...item, 'position': index + 1 } });
    });
    state.isRaceProgramGenerated = true;
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
