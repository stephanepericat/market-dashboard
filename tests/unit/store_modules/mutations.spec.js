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
