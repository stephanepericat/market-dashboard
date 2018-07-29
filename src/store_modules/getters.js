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
  }
};
