import { all } from 'redux-saga/effects';
import { htmlEntitiesSaga } from './html-entity-saga';
import { mimeTypeSaga } from './mime-type-saga';

function* rootSagas() {
  yield all([mimeTypeSaga(), htmlEntitiesSaga()]);
}

export default rootSagas;
