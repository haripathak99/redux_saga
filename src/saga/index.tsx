import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchWeatherDataRequest, fetchWeatherDataSuccess, fetchWeatherDataFailure } from '../store/reducers';
import axios, { AxiosResponse } from 'axios';
import { WeatherData } from '../store/reducers';

function* fetchWeatherDataSaga(action: { type: string; payload: string }) {
  try {
    const city = action.payload;
    const apiKey = '4654cfabdde99e4a6d8f8717354cc72b'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response: AxiosResponse<WeatherData> = yield call(axios.get, url);
    const weatherData: WeatherData = response.data;

    yield put(fetchWeatherDataSuccess(weatherData));
  } catch (error) {
    yield put(fetchWeatherDataFailure('Invalid input. Try another address'));
  }
}

export function* watchFetchWeatherData() {
  yield takeLatest(fetchWeatherDataRequest.type, fetchWeatherDataSaga);
}

export default watchFetchWeatherData;
