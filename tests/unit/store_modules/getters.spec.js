import getters from "@/store_modules/getters";

import mockState from "../../utils/mock-state";
import rawQuoteData from "../../fixtures/quote-data";
import rawHistoricalData from "../../fixtures/historical-data-aapl";

import "jasmine-expect";

describe("Store > Getters > getWatchlistData", () => {
  it("should transform raw quote data", () => {
    const state = mockState();
    state.quotes = rawQuoteData;

    const formatted = getters.getWatchlistData(state);
    expect(formatted).toBeArrayOfObjects();
  });
});

describe("Store > Getters > getChartData", () => {
  it("should transform raw historical data", () => {
    const state = mockState();
    state.historicalData = rawHistoricalData;

    expect(state.historicalData).toBeArrayOfSize(20);
    expect(state.historicalData[0]).toBeObject();

    const formatted = getters.getChartData(state);

    expect(formatted).toBeArrayOfSize(20);
    expect(formatted[0]).toBeArrayOfNumbers();
  });
});