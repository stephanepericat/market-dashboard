import CoreService from "@/services/core";
import { shallowMount } from "@vue/test-utils";

import sinon from "sinon";

describe("Services > Core > getData", () => {
  it("should make an ajax call", () => {
    const ajaxStub = sinon.stub().resolves({});
    const wrapper = shallowMount({
      mixins: [CoreService],
      template: "<div></div>"
    });

    wrapper.vm.$_ajax = {
      get: ajaxStub
    };

    const url = "http://foo.bar/";

    return wrapper.vm.getData(url).then(() => {
      expect(ajaxStub.calledOnce).toBeTruthy();

      const [args] = ajaxStub.args;
      expect(args[0]).toEqual(url);
    });
  });
});
