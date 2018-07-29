import CoreService from "@/services/core";

export default {
  extends: CoreService,
  methods: {
    getHistoricalData(ticker, timeframe = "5y") {
      /**
       * timeframes: 1d, 1m, 3m, 6m, ytd, 1y, 2y, 5y
       */
      const URL = `/stock/${ticker}/chart/${timeframe}`;
      return this.getData(URL);
    },

    getIntradayData(ticker, date) {
      /**
       * date format: 20180727
       */
      const URL = `/stock/${ticker}/chart/date/${date}`;
      return this.getData(URL);
    }
  }
};
