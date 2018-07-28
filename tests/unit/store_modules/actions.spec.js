import actions from "@/store_modules/actions";

import rawQuoteData from "../../fixtures/quote-data";
import sinon from "sinon";
import "jasmine-expect";

describe("Store > Actions > transformQuoteData", () => {
  it("should transform raw quote data and commit it", () => {
    const commit = sinon.spy();

    actions.transformQuoteData({ commit }, rawQuoteData);

    expect(commit.calledOnce).toBeTruthy();

    const [args] = commit.args;
    expect(args[0]).toEqual("setQuoteData");
    expect(args[1]).toBeArrayOfObjects();
  });
});
