export default {
  transformQuoteData({ commit }, rawData) {
    const data = Object.keys(rawData).map(symbol => {
      return rawData[symbol].quote;
    });

    commit("setQuoteData", data);
  }
};
