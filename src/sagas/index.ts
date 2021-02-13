import { all } from 'redux-saga/effects';
import { githubUserProjectsSaga } from './github-user-projects-saga';
import { htmlEntitiesSaga } from './html-entity-saga';
import { mimeTypeSaga } from './mime-type-saga';

function* rootSagas() {
  yield all([
    mimeTypeSaga(),
    htmlEntitiesSaga(),
    githubUserProjectsSaga()]
  );
}

export default rootSagas;
