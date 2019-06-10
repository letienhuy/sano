export const API_URL = "http://localhost/sano-api/public/api/v1";

export const USER_URL = `${API_URL}/users`;
export const LOGIN_URL = `${USER_URL}/login`;
export const REGISTER_URL = `${USER_URL}/register`;
export const FETCH_USER_URL = `${USER_URL}/me`;

export const BOT_URL = `${API_URL}/bots`;
export const FETCH_LIST_BOT = `${BOT_URL}/list`;
export const FETCH_LIST_LANGUAGE = `${BOT_URL}/languages/list`;
export const FETCH_LIST_TEMPLATE = `${BOT_URL}/templates/list`;
export const FETCH_LIST_KNOWLEDGE = '/knowledges/list';
export const FETCH_LIST_INTENT = '/intents/list';

export const INTENT_URL = `${API_URL}/intents`;
export const INTENT_SAMPLE_URL = '/intent-samples';
export const FETCH_LIST_INTENT_SAMPLE = `${INTENT_SAMPLE_URL}/list`;
export const INTENT_SAMPLE_NORMALIZED = `${INTENT_SAMPLE_URL}/normalized`;
