import {takeEvery, put, call, all} from 'redux-saga/effects';
import * as API from '../helpers/API';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import toast from 'cogo-toast';
import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, FETCH_USER_START, FETCH_USER_SUCCESS} from '../constants/user.constants';
import {
    FETCH_LIST_BOT_START,
    FETCH_LIST_BOT_SUCCESS,
    FETCH_LIST_BOT_FAILURE,
    CREATE_BOT_START,
    CREATE_BOT_SUCCESS,
    CREATE_BOT_FAILURE,
    DELETE_BOT_SUCCESS,
    DELETE_BOT_FAILURE,
    DELETE_BOT_START,
    UPDATE_BOT_START,
    UPDATE_BOT_FAILURE,
    UPDATE_BOT_SUCCESS,
    CLONE_BOT_START,
    CLONE_BOT_SUCCESS,
    CLONE_BOT_FAILURE,
    BOT_TEMPLATE,
    BOT_BUILTIN
} from '../constants/bot.constants'
import {
    FETCH_INTENT_START,
    FETCH_INTENT_FAILURE,
    FETCH_INTENT_SUCCESS,
    DELETE_INTENT_START,
    DELETE_INTENT_FAILURE,
    DELETE_INTENT_SUCCESS,
    CREATE_INTENT_FAILURE,
    CREATE_INTENT_START,
    CREATE_INTENT_SUCCESS
} from '../constants/intent.constants';

const delay = (ms) => new Promise(cb => setTimeout(cb, ms));

function* fetchUser(action) {
    try {
        const response = yield call(API.fetchUser, action.access_token);
        localStorage.setItem('user', btoa(escape(JSON.stringify(response.data.data))));
        yield put({
            type: FETCH_USER_SUCCESS,
            user: response.data.data
        });
    } catch (error) {
        localStorage.clear();
    }
}

function* authentication(action) {
    try {
        yield put(showLoading());
        const response = yield call(API.postLogin, action.name, action.password);
        const user = yield call(API.fetchUser, response.data.access_token);
        localStorage.setItem("accessToken", response.data.access_token);
        localStorage.setItem('user', btoa(escape(JSON.stringify(user.data.data))));
        yield put({
            type: FETCH_USER_SUCCESS,
            user: user.data.data
        });
        yield put(
            {type: LOGIN_SUCCESS, accessToken: response.data.access_token, message: response.data.message}
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
                message: "Có lỗi xảy ra, vui lòng thử lại sau."
            });
        }
    } finally {
        yield put(hideLoading());
    }
}

//Middleware with Bot

function* fetchingListBot(action){
    try{
        yield put(showLoading());
        const [ response, listLanguages , listTemplates, listBuiltIns] = yield all([
            call(API.fetchBots, action.page),
            call(API.fetchListLanguage),
            call(API.fetchListTemplate, BOT_TEMPLATE),
            call(API.fetchListTemplate, BOT_BUILTIN)
        ]);
        yield put({
            type: FETCH_LIST_BOT_SUCCESS, 
            ...response.data,
            listLanguages: listLanguages.data.data,
            listTemplates: listTemplates.data.data,
            listBuiltIns: listBuiltIns.data.data
        });
    } catch (error){
        if(error.response){
            yield put({type: FETCH_LIST_BOT_FAILURE});
            yield toast.error("Tải danh sách trợ lý ảo thất bại", {position: "top-right"});
        }
    } finally {
        yield delay(100);
        yield put(hideLoading());
    }
}

function* createNewBot(action){
    try{
        const response = yield call(API.createNewBot, action.data);
        yield put({type: CREATE_BOT_SUCCESS, data: response.data.data});
        yield toast.success(response.data.message, {position: "top-right"});
    } catch (error){
        if(error.response){
            yield put({type: CREATE_BOT_FAILURE});
            yield toast.error(error.response.data.message, {position: "top-right"});
        }else{
            yield put({type: CREATE_BOT_FAILURE});
        }
    }
}

function* cloneBot(action){
    try{
        const response = yield call(API.cloneBot, action.botId);
        yield put({type: CLONE_BOT_SUCCESS, data: response.data.data, botId: action.botId});
        yield toast.success(response.data.message, {position: "top-right"});
    } catch (error){
        if(error.response){
            yield put({type: CLONE_BOT_FAILURE, botId: action.botId});
            yield toast.error(error.response.data.message, {position: "top-right"});
        }else{
            yield put({type: CLONE_BOT_FAILURE, botId: action.botId});
        }
    }
}

function* updateBot(action){
    try{
        const response = yield call(API.editBot, action.data._id, action.data);
        yield put({type: UPDATE_BOT_SUCCESS, data: response.data.data});
        yield toast.success(response.data.message, {position: "top-right"});
    } catch (error){
        if(error.response){
            yield put({type: UPDATE_BOT_FAILURE});
            yield toast.error(error.response.data.message, {position: "top-right"});
        }else{
            yield put({type: UPDATE_BOT_FAILURE});
        }
    }
}
function* deleteBot(action){
    try{
        const response = yield call(API.deleteBot, action.botId);
        yield put({type: DELETE_BOT_SUCCESS, botId: action.botId});
        yield toast.success(response.data.message, {position: "top-right"});
    } catch (error){
        if(error.response){
            yield put({type: DELETE_BOT_FAILURE});
            yield toast.error(error.response.data.message, {position: "top-right"});
        }else{
            yield put({type: DELETE_BOT_FAILURE});
        }
    }
}

//End middleware with Bot
//Middleware Intents

function* createIntent(action){
    try{
        const response = yield call(API.createIntent, action.data);
        console.log(response);
        yield put({type: CREATE_INTENT_SUCCESS, data: response.data.data});
            yield toast.success(response.data.message, {position: "top-right"});
    } catch(error){
        if(error.response){
            yield put({type: CREATE_INTENT_FAILURE});
            yield toast.error(error.response.data.message, {position: "top-right"});
        }else{
            yield put({type: CREATE_INTENT_FAILURE});
        }
    }
}

function* fetchListIntent(action){
    try{
        yield put(showLoading());
        const response = yield call(API.fetchIntents, action.botId);
        yield put({type: FETCH_INTENT_SUCCESS, data: response.data.data});
    }catch(error){
        yield put({type: FETCH_INTENT_FAILURE});
        yield toast.error('Không thể load được kịch bản!', {position: "top-right"});
    }finally{
        yield delay(100);
        yield put(hideLoading());
    }
}
function* deleteIntent(action){
    try{
        const response = yield call(API.deleteIntent, action.intentId);
        yield put({type: DELETE_INTENT_SUCCESS, intentId: action.intentId});
        yield toast.success(response.data.message, {position: "top-right"});
    }catch(error){
        if(error.response){
            yield put({type: DELETE_INTENT_FAILURE, intentId: action.intentId});
            yield toast.error(error.response.data.message, {position: "top-right"});
        }else{
            yield put({type: DELETE_INTENT_FAILURE, intentId: action.intentId});
        }
    }
}

//End intent

function* rootSaga() {
    yield takeEvery(LOGIN_START, authentication);
    yield takeEvery(FETCH_USER_START, fetchUser);
    yield takeEvery(FETCH_LIST_BOT_START, fetchingListBot);
    yield takeEvery(CREATE_BOT_START, createNewBot);
    yield takeEvery(CLONE_BOT_START, cloneBot);
    yield takeEvery(UPDATE_BOT_START, updateBot);
    yield takeEvery(DELETE_BOT_START, deleteBot);
    yield takeEvery(FETCH_INTENT_START, fetchListIntent);
    yield takeEvery(CREATE_INTENT_START, createIntent);
    yield takeEvery(DELETE_INTENT_START, deleteIntent);
}

export default rootSaga;