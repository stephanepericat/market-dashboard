/* globals _ */
export default {
  getWatchlistData(state) {
    if (!state.quotes) {
      return [];
    }

    return _.keys(state.quotes).map(symbol => {
      return state.quotes[symbol].quote;
    });
  },

  getChartData(state) {
    if (!state.historicalData.length) {
      return [];
    }

    return state.historicalData.map(dataPoint => {
      const timestamp = Date.parse(new Date(dataPoint.date));
      return [timestamp, dataPoint.close];
    });
  },

  getQuoteData(state) {
    const stats = state.stats || {};
    const rtData =
      state.quotes && state.quotes[state.focus]
        ? state.quotes[state.focus].quote
        : {};

    return _.assign({}, stats, rtData);
  },

  getGlmaData(state) {
    if (state.glma.length < 3) {
      return {
        gainers: [],
        losers: [],
        mostActives: []
      };
    }

    const [gainers, losers, mostActives] = state.glma;

    return {
      gainers: gainers.data,
      losers: losers.data,
      mostActives: mostActives.data
    };
  }
};
