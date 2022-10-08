import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reducer} from './reducer';

const loggerMiddleware = createLogger({predicate: () => __DEV__});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const enhancer: any = compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware),
);
export default (initialState?: any) => {
  const store = createStore(persistedReducer, enhancer, initialState);
  const persistor = persistStore(store);
  return {store, persistor};
};
