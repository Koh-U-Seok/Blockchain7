import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";

import {
  initialize as userInfoIni,
  reducer as userInfoReducer,
} from "./userInfo";
import { initialize as userDBIni, reducer as userDBReducer } from "./userDB";
import { initialize as boardIni, reducer as boardReducer } from "./board";
import { initialize as commentIni, reducer as commentReducer } from "./comment";

const store = createStore(
  combineReducers({
    userInfo: userInfoReducer,
    // userInfo.js의 reducer를 userInfo라는 state로 쓰겠다.
    userDB: userDBReducer,
    board: boardReducer,
    comment: commentReducer,
  }),
  {
    userInfo: userInfoIni,
    userDB: userDBIni,
    board: boardIni,
    comment: commentIni,
  },
  composeWithDevTools()
);
export default store;
