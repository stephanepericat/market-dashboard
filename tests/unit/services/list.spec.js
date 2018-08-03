import ListService from "@/services/list";
import { shallowMount } from "@vue/test-utils";

import rawGlmaData from "../../fixtures/glma-data";

import sinon from "sinon";

describe("Services > List > gainers", () => {
  it("should get gainers stats", () => {
    const ajaxStub = sinon.stub().resolves({});
    const wrapper = shallowMount({
      mixins: [ListService],
      template: "<div></div>"
    });

    wrapper.vm.$_ajax = {
      get: ajaxStub
    };

    wrapper.vm.gainers();
    expect(ajaxStub.calledOnce).toBeTruthy();
    const [args] = ajaxStub.args;
    expect(args[0]).toEqual("/stock/market/list/gainers");
  });
});

describe("Services > List > losers", () => {
  it("should get losers stats", () => {
    const ajaxStub = sinon.stub().resolves({});
    const wrapper = shallowMount({
      mixins: [ListService],
      template: "<div></div>"
    });

    wrapper.vm.$_ajax = {
      get: ajaxStub
    };

    wrapper.vm.losers();
    expect(ajaxStub.calledOnce).toBeTruthy();
    const [args] = ajaxStub.args;
    expect(args[0]).toEqual("/stock/market/list/losers");
  });
});

describe("Services > List > mostActives", () => {
  it("should get mostActives stats", () => {
    const ajaxStub = sinon.stub().resolves({});
    const wrapper = shallowMount({
      mixins: [ListService],
      template: "<div></div>"
    });

    wrapper.vm.$_ajax = {
      get: ajaxStub
    };

    wrapper.vm.mostActives();
    expect(ajaxStub.calledOnce).toBeTruthy();
    const [args] = ajaxStub.args;
    expect(args[0]).toEqual("/stock/market/list/mostactive");
  });
});

describe("Services > List > getGlmaStats", () => {
  afterAll(() => {
    global.Promise.all.restore();
  });

  it("should get mostActives stats", () => {
    const ajaxStub = sinon.stub().resolves(rawGlmaData);
    const gainersSpy = sinon.spy();
    const losersSpy = sinon.spy();
    const maSpy = sinon.spy();

    const wrapper = shallowMount({
      mixins: [ListService],
      template: "<div></div>"
    });

    wrapper.vm.gainers = gainersSpy;
    wrapper.vm.losers = losersSpy;
    wrapper.vm.mostActives = maSpy;

    global.Promise.all = ajaxStub;

    return wrapper.vm.getGlmaStats().then(() => {
      expect(ajaxStub.calledOnce).toBeTruthy();
      expect(gainersSpy.calledOnce).toBeTruthy();
      expect(losersSpy.calledOnce).toBeTruthy();
      expect(maSpy.calledOnce).toBeTruthy();
    });
  });
});
