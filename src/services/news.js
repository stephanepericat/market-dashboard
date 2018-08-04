import CoreService from "@/services/core";

export default {
  extends: CoreService,

  methods: {
    getStockNews(ticker) {
      const URL = `/stock/${ticker}/news`;
      return this.getData(URL);
    },

    getMarketNews() {
      return this.getData("/stock/market/news");
    }
  }
};
