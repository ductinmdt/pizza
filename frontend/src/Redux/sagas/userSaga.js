import * as types from "../actions/actionTypes";
import {
    all,
    fork,
    takeEvery,
    call,
    delay,
    put,
    takeLatest,
    take
} from "@redux-saga/core/effects";
import { changePasswordApi, loadUsersAdminApi, createUserApi, deleteUserApi, updateUserApi } from "../../apis/userApi";
import {
    loadUsersAdminSuccess,
    loadUsersAdminError,
    createUserAdminSuccess,
    createUserAdminError,
    deleteUserAdminSuccess,
    deleteUserAdminError,
    updateUserAdminSuccess,
    updateUserAdminError,
    changePasswordSuccess,
    changePasswordError
} from "../actions/userAdminAction";
import { toast } from "react-toastify";

//load data users admin
export function* onLoadUsersStartAsync() {
    try {
        const res = yield call(loadUsersAdminApi);
        if (res.status === 200) {
            yield delay(500);
            yield put(loadUsersAdminSuccess(res?.data?.elements));
        }
    } catch (error) {
        yield put(loadUsersAdminError(error.res?.data?.elements));
    }
}

function* onLoadUsersAdmin() {
    yield takeEvery(types.LOAD_USERS_ADMIN_START, onLoadUsersStartAsync);
}

//create user admin
function* onCreateUserStartAsync({ payload }) {
    try {
        const res = yield call(createUserApi, payload.dataValue);
        if (res.status === 200) {
            toast.success(res?.data?.message);
            payload.registerSuccess()
            yield put(createUserAdminSuccess(res?.data));
        }
    } catch (error) {
        toast.error(error.response?.data?.message);
        yield put(createUserAdminError(error.res?.data));
    }
}

export function* onCreateUserAdmin() {
    yield takeLatest(types.CREATE_USER_ADMIN_START, onCreateUserStartAsync);
}

//change password user admin
function* onChangePasswordStartAsync({ payload }) {
    try {
        const res = yield call(changePasswordApi,payload.id, {password: payload.password});
        if (res.status === 200) {
            toast.success(res?.data?.message);
            payload?.updateSuccess()
            yield put(changePasswordSuccess(res?.data));
        }
    } catch (error) {
        toast.error(error.response?.data?.message);
        yield put(changePasswordError(error.res?.data));
    }
}

export function* onChangePassword() {
    yield takeLatest(types.CHANGE_PASSWORD_START, onChangePasswordStartAsync);
}

//delete user admin
function* onDeleteUserStartAsync(userId) {
    try {
        const res = yield call(deleteUserApi, userId);
        if (res.status === 200) {
            toast.success(res?.data?.message);
            yield delay(500);
            yield put(deleteUserAdminSuccess(userId));
        }
    } catch (error) {
        toast.error(error.response?.data?.message);
        yield put(deleteUserAdminError(error.userId));
    }
}

function* onDeleteUserAdmin() {
    while (true) {
        const { payload: userId } = yield take(types.DELETE_USER_ADMIN_START);
        yield call(onDeleteUserStartAsync, userId)
    }
}

//update user admin

function* onUpdateUserStartAsync({ payload: { id, dataValue, updateSuccess } }) {
    try {
        const res = yield call(updateUserApi, id, dataValue);
        if (res.status === 200) {
            toast.success(res?.data?.message);
            updateSuccess()
            yield put(updateUserAdminSuccess());
        }
    } catch (error) {
        toast.error(error.response?.data?.message);
        yield put(updateUserAdminError(error.res?.data))
    }
}

function* onUpdateUserAdmin() {
    yield takeLatest(types.UPDATE_USER_ADMIN_START, onUpdateUserStartAsync);
}

const usersAdminSaga = [
    fork(onLoadUsersAdmin),
    fork(onCreateUserAdmin),
    fork(onDeleteUserAdmin),
    fork(onUpdateUserAdmin),
    fork(onChangePassword),
];

export default function* rootUserSaga() {
    yield all([...usersAdminSaga]);
}
