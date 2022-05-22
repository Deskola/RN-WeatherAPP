export const fetchWeatherInfo = async city => {
  const response = await fetch(
    `http://api.weatherstack.com/current?access_key=<YOUR API KEY>&query=${city}`
  );

  const { location, current } = await response.json();

  return {
    location: location['name'],
    weather: current['weather_descriptions'][0],
    temperature: current['temperature'],
  };

};
