import {takeEvery, put, call, all} from 'redux-saga/effects';
import * as API from '../helpers/API';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, FETCH_USER_START, FETCH_USER_SUCCESS} from '../constants/user.constants';

export function* fetchUser(action) {
    try {
        const data = yield call(API.fetchUser, action.access_token);
        localStorage.setItem('user', JSON.stringify(data.data.data));
        yield put({
            type: FETCH_USER_SUCCESS,
            ...data.data.data
        });
    } catch (error) {
        localStorage.clear();
    }
}

export function* authenticated(action) {
    try {
        const data = yield call(API.fetchUser, action.access_token);
        localStorage.setItem('user', btoa(JSON.stringify(data.data.data)));
        yield put({
            type: FETCH_USER_SUCCESS,
            ...data.data.data
        });
        yield put(
            {type: LOGIN_SUCCESS, accessToken: action.access_token, message: action.message}
        );
    } catch (error) {
        localStorage.clear();
        yield put({
            type: LOGIN_FAILURE,
            ...error.response.data
        });
    } finally {
        yield put(hideLoading());
    }
}

export function* authentication(action) {
    try {
        yield put(showLoading());
        const data = yield call(API.postLogin, action.name, action.password);
        localStorage.setItem("accessToken", data.data.access_token);
        yield put({
            type: FETCH_USER_START,
            ...data.data
        });
    } catch (error) {
        yield put({
            type: LOGIN_FAILURE,
            ...error.response.data
        });
        yield put(hideLoading());
    }
}

function* rootSaga() {
    yield takeEvery(LOGIN_START, authentication);
    yield takeEvery(FETCH_USER_START, authenticated);
}

export default rootSaga;