import { getRefs } from './getReferences';
import { getPosition } from './currentPosition';
import { setBackground } from "./backgroundImage";

const refs = getRefs();
const searchForm = document.querySelector('.formInput');
const cityValue = searchForm.querySelector('.formInput input');
const degree = '\u00B0';

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const long = position.coords.longitude;
    const lat = position.coords.latitude;
    getWeather(long, lat);
    getPosition(lat, long);
  });
}

function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=88007012f79caf118a2a9709acbfec32&units=metric&lang=en`
  fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
  }).then(markUpWeather);
};

function markUpWeather({ main, weather, name }) {
      refs.temperature.textContent = Math.round(main.temp);
      refs.locationTimezone.textContent = name;
      refs.maxTemperature.textContent =  Math.round(main.temp_max) + degree;
      refs.minTemperature.textContent =  Math.round(main.temp_min) + degree;
};

function getWeather(long, lat) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=88007012f79caf118a2a9709acbfec32&units=metric&lang=en`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(markUpWeather);
};

refs.searchForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const value = searchForm.querySelector('input[name="city"]').value;
  const userInput = cityValue.value.trim();
  if (userInput === "") {
    return
  }
  setBackground(userInput);
  getWeatherByCity(userInput)
  console.log(userInput);
});