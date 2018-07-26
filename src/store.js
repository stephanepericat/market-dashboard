import Vue from "vue";
import Vuex from "vuex";

import defaultList from "@/config/default-list";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: defaultList,
    quotes: null
  },
  mutations: {
    setQuoteData(state, payload) {
      state.quotes = payload;
    }
  },
  actions: {
    transformQuoteData({ commit }, rawData) {
      const data = Object.keys(rawData).map(symbol => {
        return rawData[symbol].quote;
      });

      commit("setQuoteData", data);
    }
  }
});
