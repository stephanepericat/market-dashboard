import getters from "@/store_modules/getters";

import mockState from "../../utils/mock-state";
import rawQuoteData from "../../fixtures/quote-data";
import rawStatsData from "../../fixtures/stats-data";
import rawHistoricalData from "../../fixtures/historical-data-aapl";

import "jasmine-expect";

describe("Store > Getters > getWatchlistData", () => {
  it("should return an empty array if there is no data", () => {
    const state = mockState();
    state.quotes = null;

    const formatted = getters.getWatchlistData(state);
    expect(formatted).toBeEmptyArray();
  });

  it("should transform raw quote data", () => {
    const state = mockState();
    state.quotes = rawQuoteData;

    const formatted = getters.getWatchlistData(state);
    expect(formatted).toBeArrayOfObjects();
  });
});

describe("Store > Getters > getChartData", () => {
  it("should return an empty array is there is no data", () => {
    const state = mockState();
    state.historicalData = [];

    const formatted = getters.getChartData(state);
    expect(formatted).toBeEmptyArray();
  });

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

describe("Store > Getters > getQuoteData", () => {
  it("should merge quote and stats data", () => {
    const state = mockState();
    state.quotes = rawQuoteData;
    state.stats = rawStatsData;

    const formatted = getters.getQuoteData(state);
    expect(formatted).toBeObject();
    expect(formatted.symbol).toEqual("AAPL");
  });

  it("should return an empty object if there is no data", () => {
    const state = mockState();
    state.quotes = null;
    state.stats = null;

    const formatted = getters.getQuoteData(state);
    expect(formatted).toBeEmptyObject();
  });
});
