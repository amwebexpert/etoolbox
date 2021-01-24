import { all } from 'redux-saga/effects';
import { counterSaga } from './counter-saga';
import { mimeTypeSaga } from './mime-type-saga';

function* rootSagas() {
  yield all([counterSaga(), mimeTypeSaga()]);
}

export default rootSagas;
