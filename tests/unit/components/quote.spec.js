import Quote from "@/components/quote";
import { shallowMount } from "@vue/test-utils";

import mockStore from "../../utils/mock-store";
import statsData from "../../fixtures/stats-data";

import sinon from "sinon";
import "jasmine-expect";

describe("Components > Quote > presentational", () => {
  it("should render a quote component", () => {
    const wrapper = shallowMount(Quote, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    expect(wrapper.vm.$el).toBeDefined();
    expect(wrapper.vm.$el.classList.contains("quote-container")).toBeTruthy();
  });
});

describe("Components > Quote > methods > setStatsData", () => {
  it("should commit stats data to the store", () => {
    const callSpy = sinon.spy();

    const wrapper = shallowMount(Quote, {
      mocks: {
        $store: mockStore()
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
