import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reduce/index";

const store = createStore(reducer, { textList: [] }, composeWithDevTools());
//                                      state
export default store;
