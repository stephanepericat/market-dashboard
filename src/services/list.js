import CoreService from "@/services/core";

export default {
  extends: CoreService,

  methods: {
    gainers() {
      return this.getData("/stock/market/list/gainers");
    },

    losers() {
      return this.getData("/stock/market/list/losers");
    },

    mostActives() {
      return this.getData("/stock/market/list/mostactive");
    },

    getGlmaStats() {
      return Promise.all([this.gainers(), this.losers(), this.mostActives()]);
    }
  }
};
