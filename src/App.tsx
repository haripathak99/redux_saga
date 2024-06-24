import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherDataRequest, selectWeatherData, selectLoading, selectError } from './store/reducers'; 

const WeatherComponent = () => {
  const[city, setCity] = useState<any>('nepal');
  const[temp, setTemp] = useState<any>('nepal');
  const dispatch = useDispatch();
  const weatherData = useSelector(selectWeatherData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTemp(event.target.value);
  };
  const handleCitySubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setCity(temp);
  };

  useEffect(() => {
    dispatch(fetchWeatherDataRequest(city));
  }, [city, dispatch]); 

 

  return (
    <div>
      <form onSubmit={handleCitySubmit}>
      <input type="text" value={temp} onChange={handleCityChange} placeholder="Enter City" />
      <button type='submit' >Submit </button>
      </form>
      {loading && <p>Loading weather data...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && weatherData && (
        <div>
          <h2>Weather in {city}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Feels like: {weatherData.main.feels_like}</p>
          <p>name: {weatherData.name}</p>
          <p>main: {weatherData.weather[0].main}</p>
          <p>description: {weatherData.weather[0].description}</p>
          
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
