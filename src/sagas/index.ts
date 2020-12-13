import { all } from 'redux-saga/effects';
import { counterSaga } from './counter-saga';

function* rootSagas() {
  yield all([counterSaga()]);
}

export default rootSagas;
