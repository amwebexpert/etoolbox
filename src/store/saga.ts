import { put, takeEvery, all, delay } from 'redux-saga/effects';
import { INCREMENT, DECREMENT, INCREMENT_ASYNC } from './reducer';

function* incrementAync() {
  yield put({ type: INCREMENT });
  yield delay(1000);
  yield put({ type: DECREMENT });
  yield delay(1000);
  yield put({ type: INCREMENT });
  yield delay(1000);
  yield put({ type: DECREMENT });
}

function* watchIncrementAsync() {
  yield takeEvery(INCREMENT_ASYNC, incrementAync);
}

export function* rootSagas() {
  yield all([watchIncrementAsync()]);
}
