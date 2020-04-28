import rootReducer from '../Reducers/index';
import {createStore} from 'redux';
import {  persistStore } from 'redux-persist';

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export const persistor=persistStore(store);

  export default {store, persistor};