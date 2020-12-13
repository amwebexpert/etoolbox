import { CounterActionTypes } from '../actions/counter-actions';
import { put, takeEvery, delay } from 'redux-saga/effects';
import { incrementAction, decrementAction } from '../actions/counter-actions';

function* incrementAync() {
  yield put(incrementAction(1));
  yield delay(1000);
  yield put(decrementAction(1));
  yield delay(1000);
  yield put(incrementAction(1));
  yield delay(1000);
  yield put(decrementAction(1));
}

export function* counterSaga() {
  yield takeEvery(CounterActionTypes.INCREMENT_ASYNC, incrementAync);
}
