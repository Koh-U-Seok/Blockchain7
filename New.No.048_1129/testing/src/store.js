import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { initialize as registIni } from "./modules/regist";
import { initialize as loginIni } from "./modules/login";
import { initialize as logoutIni } from "./modules/logout";

import { reducer as regist } from "./modules/regist";
import { reducer as login } from "./modules/login";
import { reducer as logout } from "./modules/logout";

const store = createStore(
  combineReducers({ regist, login, logout }),
  { ...registIni, ...loginIni, ...logoutIni },
  composeWithDevTools()
);

export default store;
