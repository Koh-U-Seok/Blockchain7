import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { initialize as count1Ini } from "./modules/count1";
import { initialize as count2Ini } from "./modules/count2";

import { reducer as count1 } from "./modules/count1";
import { reducer as count2 } from "./modules/count2";
// reducer 이름은 action에서 지정해주는 주소 이름과 같아야 한다.

const store = createStore(
  combineReducers({ count1, count2 }),
  { ...count1Ini, ...count2Ini },
  composeWithDevTools()
);
// createStore

export default store;
