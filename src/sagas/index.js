import { takeEvery, put, call } from 'redux-saga/effects';
import * as API from '../helpers/API';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import toast from 'cogo-toast';
import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, FETCH_USER_START, FETCH_USER_SUCCESS} from '../constants/user.constants';
import {FETCH_LIST_BOT_START, FETCH_LIST_BOT_SUCCESS, FETCH_LIST_BOT_FAILURE} from '../constants/bot.constants';

const delay = (ms) => new Promise(cb => setTimeout(cb, ms));

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
        const data = yield call(API.fetchUser);
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
        console.log("object")
        const data = yield call(API.postLogin, action.name, action.password);
        localStorage.setItem("accessToken", data.data.access_token);
        yield put({
            type: FETCH_USER_START,
            ...data.data
        });
    } catch (error) {
       if(error.response){
            yield put({
                type: LOGIN_FAILURE,
                ...error.response.data
            });
        }else{
            yield put({
                type: LOGIN_FAILURE,
                message: "Có lỗi xảy ra, vui lòng thử lại sau.",
                loading: false
            });
        }
        yield put(hideLoading());
    }
}

export function* fetchingListBot(action){
    try{
        yield put(showLoading());
        const data = yield call(API.fetchBots, action.page);
        yield put({type: FETCH_LIST_BOT_SUCCESS, ...data.data});
    } catch (error){
        yield put({type: FETCH_LIST_BOT_FAILURE, message: "Tải danh sách trợ lý ảo thất bại"});
        yield put(toast.error("Tải danh sách trợ lý ảo thất bại", {position: "top-right"}))
    } finally {
        yield put(hideLoading());
    }
}

function* rootSaga() {
    yield takeEvery(LOGIN_START, authentication);
    yield takeEvery(FETCH_USER_START, authenticated);
    yield takeEvery(FETCH_LIST_BOT_START, fetchingListBot);
}

export default rootSaga;