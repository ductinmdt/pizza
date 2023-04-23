import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducers/rootReducer";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootUserSaga from "../sagas/userSaga";
// import rootUsersUISaga from "../sagas/userUISaga";
import rootCategorySaga from "../sagas/categorySaga";
import rootProductSaga from "../sagas/productSaga";
import rootBannerSaga from "../sagas/bannerSaga";
import rootSliderSaga from "../sagas/sliderSage";
import rootOrderSaga from "../sagas/orderSaga";
// import rootAuthAdminSaga from "../sagas/authAdminSaga";
import rootAuthSaga from "../sagas/authSaga";
import rootCommentSaga from "../sagas/commentSaga";


const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
    // middlewares.push(logger)
}

const store = createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootUserSaga);
// sagaMiddleware.run(rootUsersUISaga);
sagaMiddleware.run(rootCategorySaga);
sagaMiddleware.run(rootProductSaga);
sagaMiddleware.run(rootBannerSaga);
sagaMiddleware.run(rootSliderSaga);
sagaMiddleware.run(rootOrderSaga);
// sagaMiddleware.run(rootAuthAdminSaga);
sagaMiddleware.run(rootAuthSaga);
sagaMiddleware.run(rootCommentSaga);

export default store;
