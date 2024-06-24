import { createSlice } from '@reduxjs/toolkit';

export interface WeatherData {
  // Define properties based on OpenWeatherMap API response structure
  main: { temp: number; feels_like: number };
  weather: { main: string; description: string }[];
  name: string;
}

export interface WeatherState {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  weatherData: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherDataRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherDataSuccess(state, action: { payload: WeatherData }) {
      state.weatherData = action.payload;
      state.loading = false;
    },
    fetchWeatherDataFailure(state, action: { payload: string }) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchWeatherDataRequest, fetchWeatherDataSuccess, fetchWeatherDataFailure } = weatherSlice.actions;
export const selectWeatherData = (state: any) => state.weather.weatherData;
export const selectLoading = (state: any) => state.weather.loading;
export const selectError = (state: any) => state.weather.error;

export default weatherSlice.reducer;
