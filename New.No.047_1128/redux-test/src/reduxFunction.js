import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = (state, action) => {
  console.log(state, action);
  console.log(state);
  switch (action.type) {
    case "plus":
      return { test: state.test + "1" };
    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  { test: "testing" },
  composeWithDevTools()
);
