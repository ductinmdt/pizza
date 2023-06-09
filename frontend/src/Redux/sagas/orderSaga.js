import * as types from "../actions/actionTypes";
import { all, fork, takeEvery, call, delay, put, takeLatest, take } from "@redux-saga/core/effects";
import { loadOrderApi, createOrderApi, updateOrderApi, deleteOrderApi } from "../../apis/OrderApi";
import {
    loadOrderError,
    loadOrderSuccess,
    createOrderSuccess,
    createOrderError,
    updateOrderSuccess,
    updateOrderError,
    deleteOrderSuccess,
    deleteOrderError
} from "../actions/orderAction";
import { toast } from "react-toastify";


//load data order
export function* onLoadOrderStartAsync() {
    try {
        const res = yield call(loadOrderApi);
        if (res.status === 200) {
            yield delay(500);
            yield put(loadOrderSuccess(res?.data?.elements));
        }
    } catch (error) {
        yield put(loadOrderError(error.res?.data?.elements));
    }
}

function* onLoadOrder() {
    yield takeEvery(types.LOAD_ORDER_START, onLoadOrderStartAsync);
}

//create order

export function* onCreateOrderStartAsync({ payload }) {
    try {
        const res = yield call(createOrderApi, payload);
        if (res.status === 201) {
            toast.success(res?.data?.message);
            yield put(createOrderSuccess(res?.data))
        }
    } catch (error) {
        toast.error(error.response?.data?.message);
        yield put(createOrderError(error.res?.data));
    }
}

function* onCreateOrder() {
    yield takeLatest(types.CREATE_ORDER_START, onCreateOrderStartAsync);
}

//delete order
function* onDeleteOrderStartAsync(id) {
    try {
        const res = yield call(deleteOrderApi, id);
        if (res.status === 200) {
            toast.success(res?.data?.message);
            yield delay(500);
            yield put(deleteOrderSuccess(id));
        }
    } catch (error) {
        toast.error(error.response?.data?.message);
        yield put(deleteOrderError(error.id));
    }
}

function* onDeleteOrder() {
    while (true) {
        const { payload: id } = yield take(types.DELETE_ORDER_START);
        yield call(onDeleteOrderStartAsync, id)
    }
}
//update order
function* onUpdateOrderStartAsync({ payload: { id, dataValue } }) {
    try {
        const res = yield call(updateOrderApi, id, dataValue);
        if (res.status === 200) {
            toast.success(res?.data?.message);
            yield put(updateOrderSuccess());
        }
    } catch (error) {
        toast.error(error.response?.data?.message);
        yield put(updateOrderError(error.res?.data))
    }
}

function* onUpdateOrder() {
    yield takeLatest(types.UPDATE_ORDER_START, onUpdateOrderStartAsync);
}

const orderSaga = [
    fork(onLoadOrder),
    fork(onCreateOrder),
    fork(onDeleteOrder),
    fork(onUpdateOrder),
];

export default function* rootOrderSaga() {
    yield all([...orderSaga]);
}