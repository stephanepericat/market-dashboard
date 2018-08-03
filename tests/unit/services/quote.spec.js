import QuoteService from "@/services/quote";
import { shallowMount } from "@vue/test-utils";

import sinon from "sinon";

describe("Services > Quote > getQuote", () => {
  it("should get quote data for an individual ticker", () => {
    const ajaxStub = sinon.stub().resolves({});
    const wrapper = shallowMount({
      mixins: [QuoteService],
      template: "<div></div>"
    });

    wrapper.vm.$_ajax = {
      get: ajaxStub
    };

    const ticker = "aapl";

    return wrapper.vm.getQuote(ticker).then(() => {
      expect(ajaxStub.calledOnce).toBeTruthy();

      const [args] = ajaxStub.args;
      expect(args[0]).toEqual(`/stock/${ticker}/quote`);
    });
  });
});

describe("Services > Quote > getQuotes", () => {
  it("should get quote data for an array of tickers", () => {
    const ajaxStub = sinon.stub().resolves({});
    const wrapper = shallowMount({
      mixins: [QuoteService],
      template: "<div></div>"
    });

    wrapper.vm.$_ajax = {
      get: ajaxStub
    };

    const tickers = ["aapl", "msft"];

    return wrapper.vm.getQuotes(tickers).then(() => {
      expect(ajaxStub.calledOnce).toBeTruthy();

      const [args] = ajaxStub.args;
      expect(args[0]).toEqual(
        `/stock/market/batch?symbols=${tickers.join(",")}&types=quote`
      );
    });
  });
});

describe("Services > Quote > getStats", () => {
  it("should get stats for a given ticker", () => {
    const ajaxStub = sinon.stub().resolves({});
    const wrapper = shallowMount({
      mixins: [QuoteService],
      template: "<div></div>"
    });

    wrapper.vm.$_ajax = {
      get: ajaxStub
    };

    const ticker = "aapl";

    return wrapper.vm.getStats(ticker).then(() => {
      expect(ajaxStub.calledOnce).toBeTruthy();

      const [args] = ajaxStub.args;
      expect(args[0]).toEqual(`/stock/${ticker}/stats`);
    });
  });
});
