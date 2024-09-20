import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      currentUrl: ''
    };
  },
  getters: {
    currentUrl(state) {
      return state.currentUrl;
    }
  },
  mutations: {
    setCurrentUrl(state, url) {
      state.currentUrl = url;
    }
  },
  actions: {
    updateCurrentUrl({ commit }, url) {
      commit('setCurrentUrl', url);
    }
  }
});

export default store;
