import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
// redux-thunk를 불러와서

import { reducer as countReducer, initialize as countIni } from "./count";

const store = createStore(
  combineReducers({ count: countReducer }),
  { count: countIni },
  composeWithDevTools(applyMiddleware(reduxThunk))
  // middleware로 추가한다.
);

export default store;
