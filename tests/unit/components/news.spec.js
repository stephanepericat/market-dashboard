import News from "@/components/news";
import { shallowMount } from "@vue/test-utils";

import mockStore from "../../utils/mock-store";
import mockI18n from "../../utils/mock-i18n";
import mockNewsData from "../../fixtures/news-data";

import sinon from "sinon";
import "jasmine-expect";

describe("Components > News > presentational", () => {
  it("should render news articles", () => {
    const wrapper = shallowMount(News, {
      mocks: {
        $store: mockStore(),
        $i18n: mockI18n()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    expect(wrapper.vm.$el).toBeDefined();
    expect(wrapper.vm.$el.classList.contains("news-container")).toBeTruthy();
  });
});

describe("Components > News > methods > getNewsData", () => {
  afterAll(() => {
    global.Promise.all.restore();
  });

  it("should get both stock and market news", () => {
    const promiseStub = sinon.stub().resolves(mockNewsData);
    const stockSpy = sinon.spy();
    const marketSpy = sinon.spy();

    const wrapper = shallowMount(News, {
      mocks: {
        $store: mockStore(),
        $i18n: mockI18n()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    global.Promise.all = promiseStub;

    wrapper.vm.getStockNews = stockSpy;
    wrapper.vm.getMarketNews = marketSpy;

    return wrapper.vm.getNewsData(wrapper.vm.focus).then(() => {
      expect(promiseStub.calledOnce).toBeTruthy();
      expect(stockSpy.calledOnce).toBeTruthy();
      expect(marketSpy.calledOnce).toBeTruthy();

      const [args] = stockSpy.args;
      expect(args[0]).toEqual(wrapper.vm.focus);
    });
  });
});

describe("Components > News > methods > setNewsData", () => {
  it("should update the store", () => {
    const commitSpy = sinon.spy();

    const wrapper = shallowMount(News, {
      mocks: {
        $store: mockStore(),
        $i18n: mockI18n()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    wrapper.vm.$store.commit = commitSpy;

    wrapper.vm.setNewsData(mockNewsData);
    expect(commitSpy.calledOnce).toBeTruthy();

    const [args] = commitSpy.args;
    expect(args[0]).toEqual("setNewsData");
    expect(args[1]).toEqual(mockNewsData);
  });
});

describe("Components > News > methods > reloadStockNews", () => {
  it("should get both stock and market news", () => {
    const promiseStub = sinon.stub().resolves(mockNewsData);
    const setSpy = sinon.spy();

    const wrapper = shallowMount(News, {
      mocks: {
        $store: mockStore(),
        $i18n: mockI18n()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    global.Promise.all = promiseStub;

    wrapper.vm.setNewsData = setSpy;
    wrapper.vm.getNewsData = promiseStub;

    const focus = "MSFT";

    return wrapper.vm.reloadStockNews(focus).then(() => {
      expect(promiseStub.called).toBeTruthy();
      expect(setSpy.called).toBeTruthy();
    });
  });
});

describe("Components > News > methods > openArticle", () => {
  afterAll(() => {
    global.open.restore();
  });

  it("should return if the url is undefined", () => {
    const callSpy = sinon.spy();

    const wrapper = shallowMount(News, {
      mocks: {
        $store: mockStore(),
        $i18n: mockI18n()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    wrapper.vm.openExternal = callSpy;
    wrapper.vm.$store.commit = sinon.spy();

    wrapper.vm.openArticle(null);
    expect(callSpy.called).toBeFalsy();
  });

  it("should call 'openExternal' in electron", () => {
    const callSpy = sinon.spy();

    const wrapper = shallowMount(News, {
      mocks: {
        $store: mockStore(),
        $i18n: mockI18n()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    global.process.type = "electron";

    wrapper.vm.openExternal = callSpy;
    wrapper.vm.$store.commit = sinon.spy();

    const url = "http://www.google.com";

    wrapper.vm.openArticle(url);
    expect(callSpy.called).toBeTruthy();
    const [args] = callSpy.args;
    expect(args[0]).toEqual(url);
  });

  it("should call 'window.open' in a browser", () => {
    const openStub = sinon.stub();

    const wrapper = shallowMount(News, {
      mocks: {
        $store: mockStore(),
        $i18n: mockI18n()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    global.process.type = null;

    global.open = openStub;
    wrapper.vm.$store.commit = sinon.spy();

    const url = "http://www.google.com";

    wrapper.vm.openArticle(url);
    expect(openStub.called).toBeTruthy();
    const [args] = openStub.args;
    expect(args[0]).toEqual(url);
  });
});
