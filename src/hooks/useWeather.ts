import axios from 'axios';
import { SearchType } from '../types';
// import { Weather } from '../types';
import { z } from 'zod';
import { useMemo, useState } from 'react';

//Type Guard O Assertion
// function isWeatherResponse(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === 'object' &&
//     typeof (weather as Weather).name === 'string' &&
//     typeof (weather as Weather).main.temp === 'number' &&
//     typeof (weather as Weather).main.temp_max === 'number' &&
//     typeof (weather as Weather).main.temp_min === 'number'
//   );
// }

//Zod
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

export type Weather = z.infer<typeof Weather>;

const initialState = {
  name: '',
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
};

export const useWeather = () => {
  const [weather, setWeather] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    const appid = import.meta.env.VITE_API_KEY;
    setLoading(true);
    setWeather(initialState);

    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appid}`;

      const data = await axios(geoUrl);

      if (!data) {
        setNotFound(true);
        return;
      }

      const lat = data.data[0].lat;
      const lon = data.data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`;

      const { data: weatherResult } = await axios(weatherUrl);

      const result = Weather.safeParse(weatherResult);

      if (result.success) {
        setWeather(result.data);
      }

      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    fetchWeather,
    weather,
    loading,
    hasWeatherData,
    notFound,
  };
};
