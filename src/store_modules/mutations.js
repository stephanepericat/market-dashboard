export default {
  setQuoteData(state, payload) {
    state.quotes = payload;
  },

  setFocusedInvestment(state, symbol) {
    state.focus = symbol;
  },

  setHistoricalData(state, payload) {
    state.historicalData = payload;
  }
};
