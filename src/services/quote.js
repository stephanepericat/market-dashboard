import CoreService from "@/services/core";

export default {
  extends: CoreService,
  methods: {
    getQuote(ticker) {
      const URL = `/stock/${ticker}/quote`;
      return this.getData(URL);
    },

    getQuotes(tickers) {
      const symbols = tickers.join(",");
      const URL = `/stock/market/batch?symbols=${symbols}&types=quote`;
      return this.getData(URL);
    },

    getStats(ticker) {
      const URL = `/stock/${ticker}/stats`;
      return this.getData(URL);
    }
  }
};
