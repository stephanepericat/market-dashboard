import PriceChart from "@/components/price-chart";
import { shallowMount } from "@vue/test-utils";

import mockStore from "../../utils/mock-store";

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
