import Quote from "@/components/quote";
import { shallowMount } from "@vue/test-utils";

import mockStore from "../../utils/mock-store";
import mockI18n from "../../utils/mock-i18n";
import statsData from "../../fixtures/stats-data";

import sinon from "sinon";
import "jasmine-expect";

describe("Components > Quote > presentational", () => {
  it("should render a quote component", () => {
    const wrapper = shallowMount(Quote, {
      mocks: {
        $store: mockStore(),
        $i18n: mockI18n()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    expect(wrapper.vm.$el).toBeDefined();
    expect(wrapper.vm.$el.classList.contains("quote-container")).toBeTruthy();
  });
});

describe("Components > Quote > methods > getStatsData", () => {
  it("should retrieve and store stats data", () => {
    const callStub = sinon.stub().resolves(statsData);
    const callSpy = sinon.spy();

    const wrapper = shallowMount(Quote, {
      mocks: {
        $store: mockStore(),
        $i18n: mockI18n()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    const ticker = "AAPL";

    wrapper.vm.getStats = callStub;
    wrapper.vm.setStatsData = callSpy;

    return wrapper.vm.getStatsData(ticker).then(() => {
      expect(callSpy.called).toBeTruthy();

      const [args] = callStub.args;
      expect(args[0]).toEqual(ticker);
    });
  });
});

describe("Components > Quote > methods > setStatsData", () => {
  it("should commit stats data to the store", () => {
    const callSpy = sinon.spy();

    const wrapper = shallowMount(Quote, {
      mocks: {
        $store: mockStore(),
        $i18n: mockI18n()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    wrapper.vm.$store.commit = callSpy;

    wrapper.vm.setStatsData(statsData);

    expect(callSpy.calledOnce).toBeTruthy();

    const [args] = callSpy.args;
    expect(args[0]).toEqual("setStatsData");
    expect(args[1]).toEqual(statsData);
  });
});

describe("Components > Quote > methods > reloadData", () => {
  it("should get data for the new focus", () => {
    const setDataSpy = sinon.spy();
    const getDataStub = sinon.stub().resolves(statsData);

    const wrapper = shallowMount(Quote, {
      mocks: {
        $store: mockStore(),
        $i18n: mockI18n()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    const newFocus = "MSFT";

    wrapper.vm.setStatsData = setDataSpy;
    wrapper.vm.getStats = getDataStub;

    return wrapper.vm.reloadData(newFocus).then(() => {
      expect(setDataSpy.calledTwice).toBeTruthy();
      expect(getDataStub.calledOnce).toBeTruthy();

      const [args] = getDataStub.args;
      expect(args[0]).toEqual(newFocus);
    });
  });
});
