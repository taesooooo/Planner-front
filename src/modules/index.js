import { combineReducers } from "redux";
import authReducer from "./authModule";
import profileReducer, { profileSaga } from "./profileModule";
import { all } from 'redux-saga/effects';
import { authSaga } from "./authModule";
import loadingReducer from "./loadingModule";

const rootReducer = combineReducers({
    loadingReducer,
    authReducer,
    profileReducer,
});

export function* rootSaga() {
    yield all([authSaga(), profileSaga()]);
};

export default rootReducer;