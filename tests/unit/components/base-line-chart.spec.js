import BaseLineChart from "@/components/base-line-chart";
import { shallowMount } from "@vue/test-utils";

import mockStore from "../../utils/mock-store";

import sinon from "sinon";
import "jasmine-expect";

describe("Components > Base Line Chart > presentational", () => {
  it("should render a line chart", () => {
    const wrapper = shallowMount(BaseLineChart, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    expect(wrapper.vm.$el).toBeDefined();
    expect(
      wrapper.vm.$el.classList.contains("line-chart-container")
    ).toBeTruthy();
  });
});

describe("Components > Base Line Chart > methods > initChart", () => {
  it("should create an instance of 'stockChart'", () => {
    const callSpy = sinon.stub().returns({});
    const wrapper = shallowMount(BaseLineChart, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    global.Highcharts.stockChart = callSpy;

    wrapper.vm.initChart();

    expect(callSpy.called).toBeTruthy();

    const [args] = callSpy.args;
    expect(args[0]).toEqual(wrapper.vm.$el);
    expect(args[1]).toBeObject();
  });
});

describe("Components > Base Line Chart > methods > updateChart", () => {
  it("should update the data on an existing chart", () => {
    const updateSpy = sinon.spy();
    const wrapper = shallowMount(BaseLineChart, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    wrapper.vm.lineChart = {
      update: updateSpy
    };

    wrapper.vm.updateChart();

    expect(updateSpy.called).toBeTruthy();
  });
});
