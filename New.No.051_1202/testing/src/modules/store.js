import { createStore } from "redux";
// store를 만들어 주는 라이브러리

import { composeWithDevTools } from "redux-devtools-extension";
// 크롬에서 Redux 동작을 확인하는 프로그램과 연동하는 라이브러리

import { initialize as userDBIni, reducer as userDBReducer} from "./userDB";
// 이름이 겹치니 새로운 이름을 주었다.
import { initialize as userInfoIni, reducer as userInfoReducer} from "./userInfo";

const store = createStore()