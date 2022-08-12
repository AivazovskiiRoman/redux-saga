import { put, call, select, takeLatest } from 'redux-saga/effects';
import { getLatestNews, getPopularNews } from '../../api/index';
import { setLatestNews, setPopularNews } from '../actions/actionCreator';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  SET_LATEST_NEWS_ERROR,
  SET_POPULAR_NEWS_ERROR,
  SET_LOADING_DATA,
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

// watchers
export function* watchNewsSaga() {
  yield put({ type: SET_LOADING_DATA, payload: true });
  const path = yield select(({ router }) => router.location.pathname);
  switch (path) {
    case '/popular-news':
      yield call(handlePopularNews);
      break;
    case '/latest-news':
      yield call(handleLatestNews);
      break;
    default:
      break;
  }
  yield put({ type: SET_LOADING_DATA, payload: false });
}

// root
export default function* rootSaga() {
  yield takeLatest(LOCATION_CHANGE, watchNewsSaga);
}
