import PriceChart from "@/components/price-chart";
import { shallowMount } from "@vue/test-utils";

import mockStore from "../../utils/mock-store";
import mockHistoricalData from "../../fixtures/historical-data-aapl";

import sinon from "sinon";
import "jasmine-expect";

describe("Components > Price Chart > presentational", () => {
  it("should render a price chart", () => {
    const wrapper = shallowMount(PriceChart, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    expect(wrapper.vm.$el).toBeDefined();
    expect(
      wrapper.vm.$el.classList.contains("price-chart-container")
    ).toBeTruthy();
  });
});

describe("Components > Price Chart > methods > getChartData", () => {
  it("should retrieve historical data", () => {
    const setSpy = sinon.spy();
    const getStub = sinon.stub().resolves({ data: mockHistoricalData });

    const wrapper = shallowMount(PriceChart, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    wrapper.vm.getHistoricalData = getStub;
    wrapper.vm.setHistoricalData = setSpy;

    return wrapper.vm.getChartData(wrapper.vm.focus).then(() => {
      expect(getStub.calledOnce).toBeTruthy();

      const [args] = getStub.args;
      expect(args[0]).toEqual(wrapper.vm.focus);
    });
  });
});

describe("Components > Price Chart > methods > setHistoricalData", () => {
  it("should commit historical data to the store", () => {
    const callSpy = sinon.spy();

    const wrapper = shallowMount(PriceChart, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    wrapper.vm.$store.commit = callSpy;

    const data = [];

    wrapper.vm.setHistoricalData(data);

    expect(callSpy.calledOnce).toBeTruthy();

    const [args] = callSpy.args;
    expect(args[0]).toEqual("setHistoricalData");
    expect(args[1]).toEqual(data);
  });
});

describe("Components > Price Chart > methods > reloadData", () => {
  it("should update the historical data", () => {
    const setSpy = sinon.spy();
    const getStub = sinon.stub().resolves({ data: mockHistoricalData });

    const wrapper = shallowMount(PriceChart, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    const newFocus = "MSFT";

    wrapper.vm.setHistoricalData = setSpy;
    wrapper.vm.getHistoricalData = getStub;

    return wrapper.vm.reloadData(newFocus).then(() => {
      expect(setSpy.calledTwice).toBeTruthy();
      expect(getStub.calledOnce).toBeTruthy();

      const [args] = getStub.args;
      expect(args[0]).toEqual(newFocus);
    });
  });
});
