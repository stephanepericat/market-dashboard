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
      },
      propsData: {
        focus: "AAPL"
      }
    });

    expect(wrapper.vm.$el).toBeDefined();
    expect(
      wrapper.vm.$el.classList.contains("watchlist-container")
    ).toBeTruthy();
  });
});

describe("Components > Watchlist > methods > getQuoteData", () => {
  it("should get quotes data and commit it to the store", () => {
    const callStub = sinon.stub().resolves({});
    const callbackSpy = sinon.spy();

    const wrapper = shallowMount(Watchlist, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    wrapper.vm.getQuotes = callStub;
    wrapper.vm.setQuoteData = callbackSpy;

    const list = ["aapl", "msft"];

    return wrapper.vm.getQuoteData(list).then(() => {
      expect(callStub.calledOnce).toBeTruthy();
      expect(callbackSpy.calledOnce).toBeTruthy();

      const [args] = callStub.args;
      expect(args[0]).toEqual(list);
    });
  });
});

describe("Components > Watchlist > methods > setQuoteData", () => {
  it("should commit quotes data to the store", () => {
    const callSpy = sinon.spy();

    const wrapper = shallowMount(Watchlist, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    wrapper.vm.$store.commit = callSpy;

    const data = {};

    wrapper.vm.setQuoteData(data);

    expect(callSpy.calledOnce).toBeTruthy();

    const [args] = callSpy.args;
    expect(args[0]).toEqual("setQuoteData");
    expect(args[1]).toEqual(data);
  });
});

describe("Components > Watchlist > methods > setFocus", () => {
  it("should update the store", () => {
    const callSpy = sinon.spy();

    const wrapper = shallowMount(Watchlist, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    wrapper.vm.$store.commit = callSpy;

    const ticker = "MSFT";
    wrapper.vm.setFocus(ticker);

    expect(callSpy.calledOnce).toBeTruthy();

    const [args] = callSpy.args;
    expect(args[0]).toEqual("setFocusedInvestment");
    expect(args[1]).toEqual(ticker);
  });
});

describe("Components > Watchlist > methods > handleCellClick", () => {
  it("should update the store", () => {
    const callSpy = sinon.spy();

    const wrapper = shallowMount(Watchlist, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    wrapper.vm.setFocus = callSpy;

    wrapper.vm.handleCellClick(cell);

    expect(callSpy.calledOnce).toBeTruthy();

    const [args] = callSpy.args;
    expect(args[0]).toEqual(cell.data.symbol);
  });

  it("should not do anything if the cell clicked is not a company name", () => {
    const callSpy = sinon.spy();

    const wrapper = shallowMount(Watchlist, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        focus: "AAPL"
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

describe("Components > Watchlist > methods > handleCellFocus", () => {
  it("should update the store", () => {
    const callSpy = sinon.spy();

    const wrapper = shallowMount(Watchlist, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    wrapper.vm.setFocus = callSpy;

    wrapper.vm.handleCellFocus({
      rowIndex: 1,
      column: {
        colId: "companyName"
      },
      api: {
        getDisplayedRowAtIndex() {
          return {
            data: {
              symbol: "MSFT"
            }
          };
        }
      }
    });

    expect(callSpy.calledOnce).toBeTruthy();

    const [args] = callSpy.args;
    expect(args[0]).toEqual("MSFT");
  });

  it("should not do anything if the cell focused is not a company name", () => {
    const callSpy = sinon.spy();

    const wrapper = shallowMount(Watchlist, {
      mocks: {
        $store: mockStore()
      },
      propsData: {
        focus: "AAPL"
      }
    });

    wrapper.vm.$store.commit = callSpy;

    wrapper.vm.handleCellFocus({
      column: {
        colId: "symbol"
      }
    });

    expect(callSpy.called).toBeFalsy();
  });
});
