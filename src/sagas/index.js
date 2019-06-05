import { takeEvery, put, call } from 'redux-saga/effects';
import * as API from '../helpers/API';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import toast from 'cogo-toast';
import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, FETCH_USER_START, FETCH_USER_SUCCESS} from '../constants/user.constants';
import {FETCH_LIST_BOT_START, FETCH_LIST_BOT_SUCCESS, FETCH_LIST_BOT_FAILURE, CREATE_BOT_START, CREATE_BOT_SUCCESS, CREATE_BOT_FAILURE, DELETE_BOT_SUCCESS, DELETE_BOT_FAILURE, DELETE_BOT_START} from '../constants/bot.constants';

const delay = (ms) => new Promise(cb => setTimeout(cb, ms));

export function* fetchUser(action) {
    try {
        const data = yield call(API.fetchUser, action.access_token);
        localStorage.setItem('user', btoa(JSON.stringify(data.data.data)));
        yield put({
            type: FETCH_USER_SUCCESS,
            user: data.data.data
        });
    } catch (error) {
        localStorage.clear();
    }
}

export function* authentication(action) {
    try {
        yield put(showLoading());
        const data = yield call(API.postLogin, action.name, action.password);
        const user = yield call(API.fetchUser, data.data.access_token);
        localStorage.setItem("accessToken", data.data.access_token);
        localStorage.setItem('user', btoa(JSON.stringify(user.data.data)));
        yield put({
            type: FETCH_USER_SUCCESS,
            user: user.data.data
        });
        yield put(
            {type: LOGIN_SUCCESS, accessToken: data.data.access_token, message: data.data.message}
        );
    } catch (error) {
       if(error.response){
            yield put({
                type: LOGIN_FAILURE,
                message: error.response.data.message
            });
        }else{
            yield put({
                type: LOGIN_FAILURE,
                message: "Có lỗi xảy ra, vui lòng thử lại sau.",
                loading: false
            });
        }
        yield put(hideLoading());
    } finally {
        yield put(hideLoading());
    }
}

export function* fetchingListBot(action){
    try{
        yield put(showLoading());
        const data = yield call(API.fetchBots, action.page);
        yield put({type: FETCH_LIST_BOT_SUCCESS, data: data.data.data});
    } catch (error){
        if(error.response){
            yield toast.error("Tải danh sách trợ lý ảo thất bại", {position: "top-right"});
        }
    } finally {
        yield put(hideLoading());
    }
}

export function* createNewBot(action){
    try{
        const data = yield call(API.createNewBot, action.data);
        yield put({type: CREATE_BOT_SUCCESS, data: data.data.data});
        yield toast.success(data.data.message, {position: "top-right"});
    } catch (error){
        if(error.response){
            yield put({type: CREATE_BOT_FAILURE});
            yield toast.error(error.response.data.message, {position: "top-right"});
        }
    }
}

export function* deleteBot(action){
    try{
        const data = yield call(API.deleteBot, action.botId);
        yield put({type: DELETE_BOT_SUCCESS, botId: action.botId});
        yield toast.success(data.data.message, {position: "top-right"});
    } catch (error){
        if(error.response){
            yield put({type: DELETE_BOT_FAILURE});
            yield toast.error(error.response.data.message, {position: "top-right"});
        }
    }
}

function* rootSaga() {
    yield takeEvery(LOGIN_START, authentication);
    yield takeEvery(FETCH_USER_START, fetchUser);
    yield takeEvery(FETCH_LIST_BOT_START, fetchingListBot);
    yield takeEvery(CREATE_BOT_START, createNewBot);
    yield takeEvery(DELETE_BOT_START, deleteBot);
}

export default rootSaga;