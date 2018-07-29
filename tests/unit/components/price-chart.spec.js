import PriceChart from "@/components/price-chart";
import { shallowMount } from "@vue/test-utils";

import mockStore from "../../utils/mock-store";

// import sinon from "sinon";
// import "jasmine-expect";

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
