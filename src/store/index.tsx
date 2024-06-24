import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import watchFetchWeatherData from '../saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchWeatherData); 

export default store;
