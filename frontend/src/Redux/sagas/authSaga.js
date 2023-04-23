import {
  call,
  fork,
  put,
  takeLeading,
  all,
  takeEvery,
} from "@redux-saga/core/effects";
import { getUserUI } from "../../apis/authApi";
import {
  actGetProfileUIFail,
  actGetProfileUISuccess,
  actLoginUIFail,
  actLoginUISuccess,
  actSetLoadingUISuccess,
} from "../actions/actionAuthUser";
import {
  actGetProfileFail,
  actGetProfileSuccess,
  actLoginFail,
  actLoginSuccess,
  actSetLoadingSuccess,
} from "../actions/actionAuthAdmin";
import * as types from "../actions/actionTypes";

function* loginUI({ payload }) {
  yield put(actSetLoadingUISuccess());
  try {
    const userAll = yield call(getUserUI, payload);
    
    if (userAll?.elements?.user?.role?.cd === "admin") {
      yield put(actLoginSuccess(userAll));
    } else if (userAll?.elements?.user?.role?.cd === "user") {
      yield put(actLoginUISuccess(userAll));
    } else {
      yield put(actLoginUIFail(userAll));
    }
  } catch (error) {
    yield put(actLoginUIFail(error?.response?.data));
  }
}

function* watchLoginUI() {
  yield takeLeading(types.LOGIN_UI, loginUI);
}

// function* getProfileUI({ payload }) {
//   try {
//     const userAll = yield call(getUserUI);
//     const username = payload.username;
//     const password = payload.password;

//     const profile = userAll.filter(
//       (item) => item.username === username && item.password === password
//     );
//     yield put(actGetProfileUISuccess(...profile));
//   } catch (error) {
//     yield put(actGetProfileUIFail());
//   }
// }

// function* watchGetProfileUI() {
//   yield takeEvery(types.GET_PROFILE_UI, getProfileUI);
// }

// const authUserSaga = [fork(watchLoginUI), fork(watchGetProfileUI)];
const authUserSaga = [fork(watchLoginUI)];

export default function* rootAuthSaga() {
  yield all([...authUserSaga]);
}
