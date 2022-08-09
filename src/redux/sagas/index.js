import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { getLatestNews, getPopularNews } from '../../api/index';
import { setLatestNews, setPopularNews } from '../actions/actionCreator';
import { GET_NEWS } from '../constants';

// workers
export function* handleLatestNews() {
  const { hits } = yield call(getLatestNews, 'react');
  yield put(setLatestNews(hits));
}

export function* handlePopularNews() {
  const { hits } = yield call(getPopularNews);
  yield put(setPopularNews(hits));
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
