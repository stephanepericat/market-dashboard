import Grid from "@/components/grid";
import { shallowMount } from "@vue/test-utils";

describe("Components > Grid > Presentational", () => {
  it("should render a grid", () => {
    const wrapper = shallowMount(Grid, {
      propsData: {
        columnSet: [],
        viewData: []
      }
    });
    expect(wrapper.vm.$el.querySelector(".grid-container")).toBeDefined();
  });
});
