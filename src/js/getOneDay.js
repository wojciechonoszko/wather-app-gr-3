import apiService from './basic/api.js';

function getOneDay() {
  return apiService
    .getData('weather')
    .then(data => {
      const tplDate = {
        name: data.name,
        temp: Math.round(data.main.temp),
        country: data.sys.country,
        temp_min: Math.round(data.main.temp_min),
        temp_max: Math.round(data.main.temp_max),
      }
    });
  }
  getOneDay();

  export default getOneDay;

