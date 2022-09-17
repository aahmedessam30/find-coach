import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";

export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [],
      coachUrl: "https://find-coach-f2ae3-default-rtdb.firebaseio.com/coaches",
    };
  },
  mutations,
  getters,
  actions,
};
