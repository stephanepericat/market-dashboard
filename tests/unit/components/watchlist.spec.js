import Watchlist from "@/components/watchlist";
import { shallowMount } from "@vue/test-utils";

import mockStore from "../../utils/mock-store";
import cell from "../../fixtures/cell-data";

import sinon from "sinon";
import "jasmine-expect";

describe("Components > Watchlist > Presentational", () => {
  it("should render a watchlist", () => {
    const wrapper = shallowMount(Watchlist, {
      mocks: {
        $store: mockStore()
      }
    });

    expect(wrapper.vm.$el).toBeDefined();
    expect(
      wrapper.vm.$el.classList.contains("watchlist-container")
    ).toBeTruthy();
  });
});

describe("Components > Watchlist > methods > setQuoteData", () => {
  it("should update the store", () => {
    const callSpy = sinon.spy();

    const wrapper = shallowMount(Watchlist, {
      mocks: {
        $store: mockStore()
      }
    });

    wrapper.vm.$store.dispatch = callSpy;

    const data = {};

    wrapper.vm.setQuoteData(data);

    expect(callSpy.calledOnce).toBeTruthy();

    const [args] = callSpy.args;
    expect(args[0]).toEqual("transformQuoteData");
    expect(args[1]).toEqual(data);
  });
});

describe("Components > Watchlist > methods > handleCellClick", () => {
  it("should update the store", () => {
    const callSpy = sinon.spy();

    const wrapper = shallowMount(Watchlist, {
      mocks: {
        $store: mockStore()
      }
    });

    wrapper.vm.$store.commit = callSpy;

    wrapper.vm.handleCellClick(cell);

    expect(callSpy.calledOnce).toBeTruthy();

    const [args] = callSpy.args;
    expect(args[0]).toEqual("setFocusedInvestment");
    expect(args[1]).toEqual(cell.data.symbol);
  });

  it("should not do anything if the cell clicked is not a company name", () => {
    const callSpy = sinon.spy();

    const wrapper = shallowMount(Watchlist, {
      mocks: {
        $store: mockStore()
      }
    });

    wrapper.vm.$store.commit = callSpy;

    wrapper.vm.handleCellClick({
      column: {
        colId: "symbol"
      }
    });

    expect(callSpy.called).toBeFalsy();
  });
});
