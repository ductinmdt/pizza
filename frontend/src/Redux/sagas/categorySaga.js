import * as types from "../actions/actionTypes";
import { all, fork, takeEvery, call, delay, put, takeLatest, take } from "@redux-saga/core/effects";
import { loadCategoryApi, createCategoryApi, updateCategoryApi, deleteCategoryApi } from "../../apis/categoryApi";
import {
    loadCategorySuccess,
    loadCategoryError,
    createCategorySuccess,
    createCategoryError,
    updateCategorySuccess,
    updateCategoryError,
    deleteCategorySuccess,
    deleteCategoryError
} from "../actions/categoryAction";
import { toast } from "react-toastify";


//load data categories
export function* onLoadCategoryStartAsync() {
    try {
        const res = yield call(loadCategoryApi);
        if (res.status === 200) {
            yield delay(500);
            yield put(loadCategorySuccess(res?.data?.elements));
        }
    } catch (error) {
        yield put(loadCategoryError(error.res?.data?.elements));
    }
}

function* onLoadCategory() {
    yield takeEvery(types.LOAD_CATEGORY_START, onLoadCategoryStartAsync);
}

//create category

export function* onCreateCategoryStartAsync({ payload }) {
    try {
        const res = yield call(createCategoryApi, payload);
        if (res.status === 200) {
            toast.success(res?.data?.message);
            yield put(createCategorySuccess(res?.data))
        }
    } catch (error) {
        toast.error(error.response?.data?.message);
        yield put(createCategoryError(error.response?.data?.message));
    }
}

function* onCreateCategory() {
    yield takeLatest(types.CREATE_CATEGORY_START, onCreateCategoryStartAsync);
}

//delete category
function* onDeleteCategoryStartAsync(id) {
    try {
        const res = yield call(deleteCategoryApi, id);
        if (res.status === 200) {
            toast.success(res?.data?.message);
            // yield delay(500);
            yield put(deleteCategorySuccess(id));
        }
    } catch (error) {
        toast.error(error.response?.data?.message);
        yield put(deleteCategoryError(error.id));
    }
}

function* onDeleteCategory() {
    while (true) {
        const { payload: id } = yield take(types.DELETE_CATEGORY_START);
        yield call(onDeleteCategoryStartAsync, id)
    }
}
//update category
function* onUpdateCategoryStartAsync({ payload: { id, dataValue } }) {
    try {
        const res = yield call(updateCategoryApi, id, dataValue);
        if (res.status === 200) {
            toast.success(res?.data?.message);
            yield put(updateCategorySuccess());
        }
    } catch (error) {
        toast.error(error.response?.data?.message);
        yield put(updateCategoryError(error.response?.data?.message))
    }
}

function* onUpdateCategory() {
    yield takeLatest(types.UPDATE_CATEGORY_START, onUpdateCategoryStartAsync);
}

const categorySaga = [
    fork(onLoadCategory),
    fork(onCreateCategory),
    fork(onDeleteCategory),
    fork(onUpdateCategory),
];

export default function* rootCategorySaga() {
    yield all([...categorySaga]);
}