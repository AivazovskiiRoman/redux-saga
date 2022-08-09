import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { getLatestNews, getPopularNews } from '../../api/index';
import { setLatestNews, setPopularNews } from '../actions/actionCreator';
import {
  GET_NEWS,
  SET_LATEST_NEWS_ERROR,
  SET_POPULAR_NEWS_ERROR,
} from '../constants';

// workers
export function* handleLatestNews() {
  try {
    const { hits } = yield call(getLatestNews, 'react');
    yield put(setLatestNews(hits));
  } catch {
    yield put({
      type: SET_LATEST_NEWS_ERROR,
      payload: 'Error fetching latest news.',
    });
  }
}

export function* handlePopularNews() {
  try {
    const { hits } = yield call(getPopularNews);
    yield put(setPopularNews(hits));
  } catch {
    yield put({
      type: SET_POPULAR_NEWS_ERROR,
      payload: 'Error fetching popular news.',
    });
  }
}

export function* handleNews() {
  yield fork(handleLatestNews);
  yield fork(handlePopularNews);
}

// watchers
export function* watchClickSaga() {
  yield takeEvery(GET_NEWS, handleNews);
}

// root
export default function* rootSaga() {
  yield watchClickSaga();
}
