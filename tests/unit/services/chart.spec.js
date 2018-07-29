import ChartService from "@/services/chart";
import { shallowMount } from "@vue/test-utils";

import sinon from "sinon";

describe("Services > Chart > getHistoricalData", () => {
  it("should get historical data for an individual ticker", () => {
    const ajaxStub = sinon.stub().resolves({});
    const wrapper = shallowMount({
      mixins: [ChartService],
      template: "<div></div>"
    });

    wrapper.vm.$_ajax = {
      get: ajaxStub
    };

    const ticker = "aapl";

    return wrapper.vm.getHistoricalData(ticker).then(() => {
      expect(ajaxStub.calledOnce).toBeTruthy();

      const [args] = ajaxStub.args;
      expect(args[0]).toEqual(`/stock/${ticker}/chart/5y`);
    });
  });

  it("should accept different time frames", () => {
    const ajaxStub = sinon.stub().resolves({});
    const wrapper = shallowMount({
      mixins: [ChartService],
      template: "<div></div>"
    });

    wrapper.vm.$_ajax = {
      get: ajaxStub
    };

    const ticker = "aapl";
    const timeframe = "1m";

    return wrapper.vm.getHistoricalData(ticker, timeframe).then(() => {
      expect(ajaxStub.calledOnce).toBeTruthy();

      const [args] = ajaxStub.args;
      expect(args[0]).toEqual(`/stock/${ticker}/chart/${timeframe}`);
    });
  });
});

describe("Services > Chart > getIntradayData", () => {
  it("should get intraday data for a given date", () => {
    const ajaxStub = sinon.stub().resolves({});
    const wrapper = shallowMount({
      mixins: [ChartService],
      template: "<div></div>"
    });

    wrapper.vm.$_ajax = {
      get: ajaxStub
    };

    const ticker = "aapl";
    const date = "20180729";

    return wrapper.vm.getIntradayData(ticker, date).then(() => {
      expect(ajaxStub.calledOnce).toBeTruthy();

      const [args] = ajaxStub.args;
      expect(args[0]).toEqual(`/stock/${ticker}/chart/date/${date}`);
    });
  });
});
