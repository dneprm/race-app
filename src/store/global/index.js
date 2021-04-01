const initialState = {
  loader: false,
};

const getters = {
};

const mutations = {
  setLoader(state, payload) {
    state.loader = payload;
  },
};

const actions = {
};


export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};
