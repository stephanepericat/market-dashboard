import mutations from "@/store_modules/mutations";

import mockState from "../../utils/mock-state";

import "jasmine-expect";

describe("Store > Mutations > setQuoteData", () => {
  it("should update the quotes state", () => {
    const state = mockState();
    expect(state.quotes).toBeNull();

    const data = { foo: "bar" };
    mutations.setQuoteData(state, data);
    expect(state.quotes).toEqual(data);
  });
});

describe("Store > Mutations > setFocusedInvestment", () => {
  it("should update the focused investment", () => {
    const state = mockState();
    const newFocus = "msft";

    expect(state.focus).not.toEqual(newFocus);

    mutations.setFocusedInvestment(state, newFocus);
    expect(state.focus).toEqual(newFocus);
  });
});

describe("Store > Mutations > setHistoricalData", () => {
  it("should update the historical data", () => {
    const state = mockState();
    const data = [{}, {}, {}];

    expect(state.historicalData).toBeEmptyArray();

    mutations.setHistoricalData(state, data);
    expect(state.historicalData).toEqual(data);
  });
});

describe("Store > Mutations > setStatsData", () => {
  it("should update the stats data", () => {
    const state = mockState();
    const data = {};

    expect(state.stats).toBeNull();

    mutations.setStatsData(state, data);
    expect(state.stats).toEqual(data);
  });
});

describe("Store > Mutations > setGlmaData", () => {
  it("should update the glma data", () => {
    const state = mockState();
    const data = [{ data: [] }, { data: [] }, { data: [] }];

    expect(state.glma).toBeEmptyArray();

    mutations.setGlmaData(state, data);
    expect(state.glma).toEqual(data);
  });
});
