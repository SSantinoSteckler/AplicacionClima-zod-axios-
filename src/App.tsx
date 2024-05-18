import './App.modules.css';
import { Alert } from './components/Form/Alert/Alert';
import { Form } from './components/Form/Form';
import { Spinner } from './components/Form/Spinner/Spinner';
import { WeatherDetail } from './components/Form/WeatherDetail/WeatherDetail';
import { useWeather } from './hooks/useWeather';

export function App() {
  const { fetchWeather, weather, hasWeatherData, loading, notFound } =
    useWeather();

  return (
    <>
      <h1 className='title'>Buscador De Clima</h1>

      <div className='container'>
        <Form fetchWeather={fetchWeather}></Form>
        {loading && <Spinner></Spinner>}
        {hasWeatherData && <WeatherDetail weather={weather}></WeatherDetail>}
        {notFound && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  );
}
