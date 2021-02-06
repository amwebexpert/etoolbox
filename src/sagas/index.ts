import { all } from 'redux-saga/effects';
import { counterSaga } from './counter-saga';
import { htmlEntitiesSaga } from './html-entity-saga';
import { mimeTypeSaga } from './mime-type-saga';

function* rootSagas() {
  yield all([counterSaga(), mimeTypeSaga(), htmlEntitiesSaga()]);
}

export default rootSagas;
