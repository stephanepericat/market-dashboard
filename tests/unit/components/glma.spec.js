import GLMA from "@/components/glma";
import { shallowMount } from "@vue/test-utils";

import mockStore from "../../utils/mock-store";
import mockGlmaData from "../../fixtures/glma-data";

import sinon from "sinon";
import "jasmine-expect";

describe("Components > GLMA > presentational", () => {
  it("should render a grid", () => {
    const wrapper = shallowMount(GLMA, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        viewType: "gainers"
      }
    });

    expect(wrapper.vm.$el).toBeDefined();
    expect(wrapper.vm.$el.classList.contains("glma-container")).toBeTruthy();
  });

  it("should have a class matching the viewType prop", () => {
    const wrapper = shallowMount(GLMA, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        viewType: "losers"
      }
    });

    expect(wrapper.vm.$el).toBeDefined();
    expect(wrapper.vm.$el.classList.contains("losers")).toBeTruthy();
  });
});

describe("Components > GLMA > methods > getGlmaData", () => {
  it("should retrieve and store list data", () => {
    const callStub = sinon.stub().resolves(mockGlmaData);
    const setSpy = sinon.spy();

    const wrapper = shallowMount(GLMA, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        viewType: "gainers"
      }
    });

    wrapper.vm.getGlmaStats = callStub;
    wrapper.vm.setGlmaData = setSpy;

    return wrapper.vm.getGlmaData().then(() => {
      expect(callStub.calledOnce).toBeTruthy();
      expect(setSpy.calledOnce).toBeTruthy();
    });
  });
});

describe("Components > GLMA > methods > setGlmaData", () => {
  it("should store list data", () => {
    const commitSpy = sinon.spy();

    const wrapper = shallowMount(GLMA, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        viewType: "gainers"
      }
    });

    wrapper.vm.$store.commit = commitSpy;

    const data = [{ data: [] }, { data: [] }, { data: [] }];
    wrapper.vm.setGlmaData(data);

    expect(commitSpy.calledOnce).toBeTruthy();

    const [args] = commitSpy.args;
    expect(args[0]).toEqual("setGlmaData");
    expect(args[1]).toEqual(data);
  });
});
