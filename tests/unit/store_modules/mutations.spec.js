import mutations from "@/store_modules/mutations";

import mockState from "../../utils/mock-state";

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
