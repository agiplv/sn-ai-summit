import { createStore } from 'framework7/lite';

const loadVisited = () => {
  try {
    return JSON.parse(localStorage.getItem('sn-visited-meetings') || '[]');
  } catch {
    return [];
  }
};

const store = createStore({
  state: {
    visitedMeetings: loadVisited(),
  },
  getters: {
    visitedMeetings({ state }) {
      return state.visitedMeetings;
    },
  },
  actions: {
    toggleVisited({ state }, id) {
      const next = state.visitedMeetings.includes(id)
        ? state.visitedMeetings.filter((v) => v !== id)
        : [...state.visitedMeetings, id];
      localStorage.setItem('sn-visited-meetings', JSON.stringify(next));
      state.visitedMeetings = next;
    },
  },
});

export default store;
