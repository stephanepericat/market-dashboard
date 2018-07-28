import mockState from "./mock-state";

const mockStore = () => {
  return {
    state: mockState(),
    getters: {},
    actions: {},
    mutations: {}
  };
};

export default mockStore;
