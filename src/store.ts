import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import rootSagas from './sagas';

// TODO - Add redux-logger
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSagas);

export default store;
