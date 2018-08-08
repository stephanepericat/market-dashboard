import NewsService from "@/services/news";
import { shallowMount } from "@vue/test-utils";

import sinon from "sinon";

describe("Services > News > getStockNews", () => {
  it("should get news for a given ticker", () => {
    const callSpy = sinon.spy();

    const wrapper = shallowMount({
      mixins: [NewsService],
      template: "<div></div>"
    });

    wrapper.vm.getData = callSpy;

    const ticker = "AAPL";

    wrapper.vm.getStockNews(ticker);
    expect(callSpy.called).toBeTruthy();
    const [args] = callSpy.args;

    expect(args[0]).toEqual(`/stock/${ticker}/news`);
  });
});

describe("Services > News > getMarketNews", () => {
  it("should get news for the market", () => {
    const callSpy = sinon.spy();

    const wrapper = shallowMount({
      mixins: [NewsService],
      template: "<div></div>"
    });

    wrapper.vm.getData = callSpy;

    wrapper.vm.getMarketNews();
    expect(callSpy.called).toBeTruthy();
    const [args] = callSpy.args;

    expect(args[0]).toEqual("/stock/market/news");
  });
});
