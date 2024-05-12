import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import rootSagas from './sagas';

// TODO - Move all this to better typing or use Redux Toolkit or MobX
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers as any, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSagas);

export default store;
