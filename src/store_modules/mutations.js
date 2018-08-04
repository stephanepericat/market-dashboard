export default {
  setQuoteData(state, payload) {
    state.quotes = payload;
  },

  setFocusedInvestment(state, symbol) {
    state.focus = symbol;
  },

  setHistoricalData(state, payload) {
    state.historicalData = payload;
  },

  setStatsData(state, payload) {
    state.stats = payload;
  },

  setGlmaData(state, payload) {
    state.glma = payload;
  },

  setNewsData(state, payload) {
    state.news = payload;
  }
};
