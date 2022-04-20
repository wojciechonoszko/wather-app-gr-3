import apiService from './basic/api.js';
import getOneDay from './getOneDay.js';
import { setBgImages, setGeoLocationImg } from './bg-images'


const searchInput = document.querySelector('.citySearch__form');
const inputRef = document.querySelector('.citySearch__form__input');


inputRef.addEventListener('inpiut', function() {
if (this.value)
{
  return (this.value = this.value[0].toUpperCase() + this.value.slice(1));
}
});

searchInput.addEventListener('submit', setQuery);
function setQuery(even){
  even.preventDefault();
  const inputData = inputRef.value;
  apiService.query = inputData;

   getOneDay();
  // getCalendar();
  // getFiveDays();
  // onHideChartClick();
  // getBgImages();
}

function addFavourtieCity(){
  if (inputRef.value.trim() === '') {
    return;
  }
  const inputValue = inputRef.value;
  console.log(inputValue);
  favListRef.insertAdjacentHTML('beforeend', updateButtons([inputValue]));
}

const citiesStorage = {
 citiesArray: [],
};

const savedArray = JSON.parse(localStorage.getItem('City'));
if (savedArray) {
  storage.cityArray = savedArray;
}
