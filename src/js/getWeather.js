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


// =====================================================================
// forecast 5 days

// npm install chart.js --save - chart.js library installation

import Chart from 'chart.js/auto';
import '../sass/main.css';

//import { getRelativePosition } from 'chart.js/helpers';

 const ctx = document.getElementById('myChart');

const oneDayBtn = document.querySelector('.daysButtons__today');
const fiveDaysBtn = document.querySelector('.show-five-days-btn');
const quoteContainer = document.querySelector('.quote');

const fiveDaysList = document.querySelector('.five-days-list');
const fiveDaysContainer = document.querySelector('.five-days');
const fiveDaysHidden = document.querySelector('.five-days-hidden');

const moreInfoListHidden = document.querySelector('.more-info-hidden');
const moreInfoList = document.querySelector('.more-info-list');
const moreInfoListHiddenTwo = document.querySelector('.more-info-hidden-two');
const moreInfoListTwo = document.querySelector('.more-info-list-two');
const moreInfoListHiddenThree = document.querySelector('.more-info-hidden-three');
const moreInfoListThree = document.querySelector('.more-info-list-three');
const moreInfoListHiddenFour = document.querySelector('.more-info-hidden-four');
const moreInfoListFour = document.querySelector('.more-info-list-four');
const moreInfoListHiddenFive = document.querySelector('.more-info-hidden-five');
const moreInfoListFive = document.querySelector('.more-info-list-five');


const chartShowBtn = document.querySelector('.chart-show-link');
const chartShowBtnCtnHidden = document.querySelector('.chart-button-hidden');
const chartShowBtnCtn = document.querySelector('.chart-show-button-container');
const chartCloseBtn = document.querySelector('.chart-hide-link');
const chartContainer = document.querySelector('.chart-cnt');

const calendarContainer = document.querySelector('.calendar');
const currentDayContainer = document.querySelector('.currentDay');



function chartDisplay() {
  
  chartShowBtn.classList.toggle('is-closed');
  chartContainer.classList.toggle('is-closed');
  
}
function fiveDaysDisplay() {
  fiveDaysBtn.disabled = true;
  oneDayBtn.disabled = false;
  
  fiveDaysContainer.classList.toggle('is-closed');
  fiveDaysHidden.classList.toggle('is-closed');
  calendarContainer.classList.toggle('is-closed');
  currentDayContainer.classList.toggle('is-closed');
  quoteContainer.classList.toggle('is-closed');
  chartShowBtnCtnHidden.classList.toggle('is-closed');
};

function oneDayDisplay() {
  fiveDaysBtn.disabled = false;
  oneDayBtn.disabled = true;
  
  fiveDaysContainer.classList.toggle('is-closed');
  fiveDaysHidden.classList.toggle('is-closed');
  calendarContainer.classList.toggle('is-closed');
  currentDayContainer.classList.toggle('is-closed');
  quoteContainer.classList.toggle('is-closed');

  chartShowBtnCtnHidden.classList.toggle('is-closed');
  //chartContainer.classList.toggle('is-closed');
};


fiveDaysBtn.addEventListener("click", fiveDaysDisplay);
oneDayBtn.addEventListener("click", oneDayDisplay);
   

 chartShowBtn.addEventListener('click', chartDisplay);
 chartCloseBtn.addEventListener('click', chartDisplay);


function getWeatherFiveDays(city) {
  //const url = `https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=88007012f79caf118a2a9709acbfec32&units=metric&lang=en`
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&appid=192616cb441ff9a67bbb9f3f5782e997&units=metric&lang=en`
  return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      
      return response.json();
  }).then(response => {
    
    
    const dataDays = response.list.map((element) => days.push(element));

    let tempMaxOne = 0;
    let tempMaxTwo = 0;

    for(let day of days){
      //console.log(day.dt);
      const date = new Date();
      //console.log(parseInt(datesInSeconds[0]));
      if ((day.dt > (parseInt(datesInSeconds[0]))) && (day.dt < (parseInt(datesInSeconds[1])))) {
        //console.log(day.dt);
        tempMaxOne += day.main.temp_max;
        dayOne.push(day)
      }
      else if ((day.dt > (parseInt(datesInSeconds[1]))) && (day.dt < (parseInt(datesInSeconds[2])))) {
        tempMaxTwo += day.main.temp_max;
        dayTwo.push(day)
      }
      else if ((day.dt > intDates[2]) && (day.dt < intDates[3])) {
        dayThree.push(day);
      }
      else if ((day.dt > intDates[3]) && (day.dt < intDates[4])) {
        dayFour.push(day);
      }
      else {
        dayFive.push(day)
      }
      
        
      
    }

    const chartDataTemp = response.list.map((element) =>  temperature.push(element.main.temp) );
    const chartDataHum = response.list.map((element) => humidity.push(element.main.humidity));
    const chartDataPress = response.list.map((element) =>  pressure.push(element.main.pressure) );
    const chartDataWind = response.list.map((element) => speed.push(element.wind.speed));
    const chartDataMinTemp = response.list.map((element) => minTemp.push(element.main.temp_min));
    const chartDataMaxTemp = response.list.map((element) => maxTemp.push(element.main.temp_max));
    const classIcon = response.list.map((element) => classIconAll.push(element.weather));

   
  }).then(iterArray)
  .then(data => {
  
  
    let i = 0;
    fiveDaysList.innerHTML = ""
    // if (fiveDaysList !== null){
    //   fiveDaysList.innerHTML = "";}
    for (const date of dates){
let moreInfoBtn = document.createElement(`BUTTON`);
moreInfoBtn.className = `more-info${i}`;
let text = document.createTextNode(`more-info`);
moreInfoBtn.appendChild(text);

let dateFiveDays = document.createElement('ul');
dateFiveDays.className = 'date-five-days';
dateFiveDays.textContent = date

let iconFiveDays = document.createElement('img');
iconFiveDays.className = 'icon-five-days';

let iconDayOne = document.createElement('img');
iconDayOne.className = `icon-${classIcon[(i+1)*7]}`;

let tempFiveDays = document.createElement('li');
tempFiveDays.className = 'temp-five-days';
tempFiveDays.textContent = `${avgTemps[i]} °C`;

let minSpan = document.createElement('span');
minSpan.className = 'min-span';
minSpan.textContent = 'min';


let minTemperature = document.createElement('li');
minTemperature.className = 'min-temp-five-days';
minTemperature.textContent =  `${minTempsValues[i]}°`;
minTemperature.prepend(minSpan);

let maxSpan = document.createElement('span');
maxSpan.className = 'min-span';
maxSpan.textContent = 'max';




let maxTemperature = document.createElement('li');
maxTemperature.className = 'max-temp-five-days';
maxTemperature.textContent = `${maxTempsValues[i]}°`;
maxTemperature.prepend(maxSpan);

let verticalBorder = document.createElement('div');
verticalBorder.className = 'vertical-border';

let tempContainer = document.createElement('li');
tempContainer.className = 'temp-container';
tempContainer.appendChild(minTemperature);
tempContainer.appendChild(verticalBorder);
tempContainer.appendChild(maxTemperature);


let humFiveDays = document.createElement('li');
humFiveDays.className = 'hum-five-days';
humFiveDays.textContent = `${humidity[i]} %`;



      
      let listItem = document.createElement('ul');
      listItem.className = 'five-days-ul';
      listItem.appendChild(dateFiveDays);
     
      listItem.appendChild(iconDayOne);
      listItem.appendChild(tempContainer)
      
      listItem.appendChild(moreInfoBtn);
    
      fiveDaysList.append(listItem);

    
    
    i+=1; 
    }
    
  }).then(moreInfo)
  .then(moreInfoTwo)
  .then(moreInfoThree)
  .then(moreInfoFour)
  .then(moreInfoFive)
};

function removeList(){
  
  let elem = document.querySelector('.five-days-list');
  let elemTwo = document.querySelector('.five-days-ul');
  
  console.log(elem)
  
  if(elemTwo !== null){
    window.location.reload();
    
  }
  
}



function moreInfoDisplay() {
  moreInfoListHidden.classList.toggle('is-closed'); 
  moreInfoListHiddenTwo.classList.add('is-closed');
  moreInfoListHiddenThree.classList.add('is-closed');
  moreInfoListHiddenFour.classList.add('is-closed');
  moreInfoListHiddenFive.classList.add('is-closed'); 
}

function moreInfoDisplayTwo() {
  moreInfoListHidden.classList.add('is-closed');
  moreInfoListHiddenTwo.classList.toggle('is-closed');
  moreInfoListHiddenThree.classList.add('is-closed');
  moreInfoListHiddenFour.classList.add('is-closed');
  moreInfoListHiddenFive.classList.add('is-closed'); 
  
}

function moreInfoDisplayThree() {
  moreInfoListHiddenThree.classList.toggle('is-closed');
  moreInfoListHidden.classList.add('is-closed');
  moreInfoListHiddenTwo.classList.add('is-closed');
  moreInfoListHiddenFour.classList.add('is-closed');
  moreInfoListHiddenFive.classList.add('is-closed'); 
}

function moreInfoDisplayFour() {
  moreInfoListHiddenFour.classList.toggle('is-closed');
  moreInfoListHidden.classList.add('is-closed');
  moreInfoListHiddenTwo.classList.add('is-closed');
  moreInfoListHiddenThree.classList.add('is-closed');
  moreInfoListHiddenFive.classList.add('is-closed');  
}

function moreInfoDisplayFive() {
  moreInfoListHiddenFive.classList.toggle('is-closed');
  moreInfoListHidden.classList.add('is-closed');
  moreInfoListHiddenTwo.classList.add('is-closed');
  moreInfoListHiddenFour.classList.add('is-closed');
  moreInfoListHiddenThree.classList.add('is-closed');  
}


function moreInfo(){
  const moreInfoBtn = document.querySelector(`.more-info0`);
  moreInfoBtn.addEventListener('click', moreInfoDisplay);
  let i=0;
  for (const elem of dayOneTemps){
  let hour = document.createElement('li');
  hour.className = 'hour';
  hour.textContent = `${hours[i]}`;

  let iconDayOne = document.createElement('img');
iconDayOne.className = `icon-${classIcon[i]}`;

  let tempDayOne = document.createElement('li');
  tempDayOne.className = 'temp-day-one';
  tempDayOne.textContent = `${dayOneTemps[i].toFixed(1)} °C`;

  let pressureDayOne = document.createElement('li');
  pressureDayOne.className = 'pressure-day-one';
  pressureDayOne.textContent = `${dayOnePressure[i]} hPa`;

  let humidityDayOne = document.createElement('li');
  humidityDayOne.className = 'humidity-day-one';
  humidityDayOne.textContent = `${dayOneHumidity[i]} %`;

  let windDayOne = document.createElement('li');
  windDayOne.className = 'wind-day-one';
  windDayOne.textContent = `${dayOneWind[i].toFixed(1)} m/s`;

  let listItem = document.createElement('ul');
      listItem.className =  'more-info-ul';
      listItem.appendChild(hour);
      listItem.appendChild(iconDayOne);
      listItem.appendChild(tempDayOne);
      listItem.appendChild(pressureDayOne);
      listItem.appendChild(humidityDayOne);
      listItem.appendChild(windDayOne);
  i+=1;
  moreInfoList.appendChild(listItem);
}
}

function moreInfoTwo(){
  const moreInfoBtn = document.querySelector(`.more-info1`);
  moreInfoBtn.addEventListener('click', moreInfoDisplayTwo);
  let i=0;
  for (const elem of dayTwoTemps){
  let hour = document.createElement('li');
  hour.className = 'hour';
  hour.textContent = `${hours[i]}`;

  let iconDayTwo = document.createElement('img');
iconDayTwo.className = `icon-${classIcon[i]}`;

  let tempDayTwo = document.createElement('li');
  tempDayTwo.className = 'temp-day-one';
  tempDayTwo.textContent = `${dayTwoTemps[i].toFixed(1)} °C`;

  let pressureDayTwo = document.createElement('li');
  pressureDayTwo.className = 'pressure-day-one';
  pressureDayTwo.textContent = `${dayTwoPressure[i]} hPa`;

  let humidityDayTwo = document.createElement('li');
  humidityDayTwo.className = 'humidity-day-one';
  humidityDayTwo.textContent = `${dayTwoHumidity[i]} %`;

  let windDayTwo = document.createElement('li');
  windDayTwo.className = 'wind-day-one';
  windDayTwo.textContent = `${dayTwoWind[i].toFixed(1)} m/s`;

  let listItem = document.createElement('ul');
      listItem.className =  'more-info-ul-two';
      listItem.appendChild(hour);
      listItem.appendChild(iconDayTwo);
      listItem.appendChild(tempDayTwo);
      listItem.appendChild(pressureDayTwo);
      listItem.appendChild(humidityDayTwo);
      listItem.appendChild(windDayTwo);
  i+=1;
  moreInfoListTwo.appendChild(listItem);
}
}

function moreInfoThree(){
  const moreInfoBtn = document.querySelector(`.more-info2`);
  moreInfoBtn.addEventListener('click', moreInfoDisplayThree);
  let i=0;
  for (const elem of dayThreeTemps){
  let hour = document.createElement('li');
  hour.className = 'hour';
  hour.textContent = `${hours[i]}`;

  let iconDayThree = document.createElement('img');
iconDayThree.className = `icon-${classIcon[i]}`;

  let tempDayThree = document.createElement('li');
  tempDayThree.className = 'temp-day-one';
  tempDayThree.textContent = `${dayThreeTemps[i].toFixed(1)} °C`;

  let pressureDayThree = document.createElement('li');
  pressureDayThree.className = 'pressure-day-one';
  pressureDayThree.textContent = `${dayThreePressure[i]} hPa`;

  let humidityDayThree = document.createElement('li');
  humidityDayThree.className = 'humidity-day-one';
  humidityDayThree.textContent = `${dayThreeHumidity[i]} %`;

  let windDayThree = document.createElement('li');
  windDayThree.className = 'wind-day-one';
  windDayThree.textContent = `${dayThreeWind[i].toFixed(1)} m/s`;

  let listItem = document.createElement('ul');
      listItem.className =  'more-info-ul-three';
      listItem.appendChild(hour);
      listItem.appendChild(iconDayThree);
      listItem.appendChild(tempDayThree);
      listItem.appendChild(pressureDayThree);
      listItem.appendChild(humidityDayThree);
      listItem.appendChild(windDayThree);
  i+=1;
  moreInfoListThree.appendChild(listItem);
}
}

function moreInfoFour(){
  const moreInfoBtn = document.querySelector(`.more-info3`);
  moreInfoBtn.addEventListener('click', moreInfoDisplayFour);
  let i=0;
  for (const elem of dayFourTemps){
  let hour = document.createElement('li');
  hour.className = 'hour';
  hour.textContent = `${hours[i]}`;

  let iconDay = document.createElement('img');
iconDay.className = `icon-${classIcon[i]}`;

  let tempDay = document.createElement('li');
  tempDay.className = 'temp-day-one';
  tempDay.textContent = `${dayFourTemps[i].toFixed(1)} °C`;

  let pressureDay = document.createElement('li');
  pressureDay.className = 'pressure-day-one';
  pressureDay.textContent = `${dayFourPressure[i]} hPa`;

  let humidityDay = document.createElement('li');
  humidityDay.className = 'humidity-day-one';
  humidityDay.textContent = `${dayFourHumidity[i]} %`;

  let windDay = document.createElement('li');
  windDay.className = 'wind-day-one';
  windDay.textContent = `${dayFourWind[i].toFixed(1)} m/s`;

  let listItem = document.createElement('ul');
      listItem.className =  'more-info-ul-four';
      listItem.appendChild(hour);
      listItem.appendChild(iconDay);
      listItem.appendChild(tempDay);
      listItem.appendChild(pressureDay);
      listItem.appendChild(humidityDay);
      listItem.appendChild(windDay);
  i+=1;
  moreInfoListFour.appendChild(listItem);
}
}

function moreInfoFive(){
  const moreInfoBtn = document.querySelector(`.more-info4`);
  moreInfoBtn.addEventListener('click', moreInfoDisplayFive);
  let i=0;
  for (const elem of dayFourTemps){
  let hour = document.createElement('li');
  hour.className = 'hour';
  hour.textContent = `${hours[i]}`;

  let iconDay = document.createElement('img');
iconDay.className = `icon-${classIcon[i]}`;

  let tempDay = document.createElement('li');
  tempDay.className = 'temp-day-one';
  tempDay.textContent = `${dayFiveTemps[i].toFixed(1)} °C`;

  let pressureDay = document.createElement('li');
  pressureDay.className = 'pressure-day-one';
  pressureDay.textContent = `${dayFivePressure[i]} hPa`;

  let humidityDay = document.createElement('li');
  humidityDay.className = 'humidity-day-one';
  humidityDay.textContent = `${dayFiveHumidity[i]} %`;

  let windDay = document.createElement('li');
  windDay.className = 'wind-day-one';
  windDay.textContent = `${dayFiveWind[i].toFixed(1)} m/s`;

  let listItem = document.createElement('ul');
      listItem.className =  'more-info-ul-five';
      listItem.appendChild(hour);
      listItem.appendChild(iconDay);
      listItem.appendChild(tempDay);
      listItem.appendChild(pressureDay);
      listItem.appendChild(humidityDay);
      listItem.appendChild(windDay);
  i+=1;
  moreInfoListFive.appendChild(listItem);
}
}

const temperature = [];
const humidity = [];
const pressure = [];
const speed = [];
const minTemp = [];
const maxTemp = [];

const days = [];
console.log(days);

const hours = [];




const dayOneTemps = [];
const dayTwoTemps = [];
const dayThreeTemps = [];
const dayFourTemps = [];
const dayFiveTemps = [];


const dayOneTempsMax = [];
const dayTwoTempsMax = [];
const dayThreeTempsMax = [];
const dayFourTempsMax = [];
const dayFiveTempsMax = [];

const dayOneTempsMin = [];
const dayTwoTempsMin = [];
const dayThreeTempsMin = [];
const dayFourTempsMin = [];
const dayFiveTempsMin = [];

const dayOnePressure = [];
const dayTwoPressure = [];
const dayThreePressure = [];
const dayFourPressure = [];
const dayFivePressure = [];

const dayOneHumidity = [];
const dayTwoHumidity = [];
const dayThreeHumidity = [];
const dayFourHumidity = [];
const dayFiveHumidity = [];

const dayOneWind = [];
const dayTwoWind = [];
const dayThreeWind = [];
const dayFourWind = [];
const dayFiveWind = [];

const classIconAll=[];
console.log(classIconAll);
const classIcon = [];
console.log(classIcon);
const dayOne = [];
console.log(dayOne);



const dayTwo = [];
console.log(dayTwo);
const dayThree = [];
const dayFour = [];
const dayFive = [];



function iterArray(){
  averageValuesTemp(dayOne, dayOneTemps, avgTemps);
  averageValuesTemp(dayTwo, dayTwoTemps, avgTemps);
  averageValuesTemp(dayThree, dayThreeTemps, avgTemps);
  averageValuesTemp(dayFour, dayFourTemps, avgTemps);
  averageValuesTemp(dayFive, dayFiveTemps, avgTemps);

  maximumTempsValues(dayOneTemps, dayTwoTemps, dayThreeTemps, dayFourTemps, dayFiveTemps);
  minimumTempsValues(dayOneTemps, dayTwoTemps, dayThreeTemps, dayFourTemps, dayFiveTemps);
  

  averageValuesTempMax(dayOne, dayOneTempsMax, avgTempsMax);
  averageValuesTempMax(dayTwo, dayTwoTempsMax, avgTempsMax);
  averageValuesTempMax(dayThree, dayThreeTempsMax, avgTempsMax);
  averageValuesTempMax(dayFour, dayFourTempsMax, avgTempsMax);
  averageValuesTempMax(dayFive, dayFiveTempsMax, avgTempsMax);

  averageValuesTempMin(dayOne, dayOneTempsMin, avgTempsMin);
  averageValuesTempMin(dayTwo, dayTwoTempsMin, avgTempsMin);
  averageValuesTempMin(dayThree, dayThreeTempsMin, avgTempsMin);
  averageValuesTempMin(dayFour, dayFourTempsMin, avgTempsMin);
  averageValuesTempMin(dayFive, dayFiveTempsMin, avgTempsMin);

  cloudsChoice(classIconAll, classIcon);

  generateHours(dayOne, hours);
  generateHours(dayTwo, hours);
  generateHours(dayThree, hours);
  generateHours(dayFour, hours);
  generateHours(dayFive, hours);

  pressureInject(dayOne, dayOnePressure);
  pressureInject(dayTwo, dayTwoPressure);
  pressureInject(dayOne, dayThreePressure);
  pressureInject(dayTwo, dayFourPressure);
  pressureInject(dayOne, dayFivePressure);
  

  humidityInject(dayOne, dayOneHumidity);
  humidityInject(dayTwo, dayTwoHumidity);
  humidityInject(dayOne, dayThreeHumidity);
  humidityInject(dayTwo, dayFourHumidity);
  humidityInject(dayOne, dayFiveHumidity);
  

  windInject(dayOne, dayOneWind);
  windInject(dayTwo, dayTwoWind);
  windInject(dayThree, dayThreeWind);
  windInject(dayFour, dayFourWind);
  windInject(dayFive, dayFiveWind);
  


  }

function windInject(objectArray, pushingArrayOne){
  for(let object of objectArray){
    pushingArrayOne.push(object.wind.speed)
  }
}

function humidityInject(objectArray, pushingArrayOne){
  for(let object of objectArray){
    pushingArrayOne.push(object.main.humidity)
  }
}

function pressureInject(objectArray, pushingArrayOne){
  for(let object of objectArray){
    pushingArrayOne.push(object.main.pressure)
  }
  
}
function cloudsChoice(objectArray, pushingArrayOne, pushingArrayTwo){
  let describe;
  for (let object of objectArray){
    for (let obj of object){
    pushingArrayOne.push(obj.main)
    }
    
  }
  console.log(pushingArrayOne);

};

function generateHours(objectArray, pushingArrayOne){
  for (let object of objectArray){
    let cutter;
    cutter = object.dt_txt.split(' ')
    pushingArrayOne.push(cutter[1])
  }
}
function averageValuesTempMax(objectArray, pushingArrayOne, pushingArrayTwo) {
  const lodash = require('lodash');
  for (let object of objectArray) {
    pushingArrayOne.push(object.main.temp_max); 
  };
  let avgTempMax = 0;
  let sumElem = 0;
  for(let elem of pushingArrayOne){
    sumElem += elem;
  }
  avgTempMax = (sumElem / objectArray.length).toFixed(1);
  
  pushingArrayTwo.push(Number(avgTempMax));
  
}

const lodash = require('lodash');

function averageValuesTempMin(objectArray, pushingArrayOne, pushingArrayTwo) {
  
  for (let object of objectArray) {
    pushingArrayOne.push(object.main.temp_min); 
  };
  let avgTempMin;
  let sumElem;
  sumElem = lodash.sum(pushingArrayOne);
  avgTempMin = (sumElem / objectArray.length).toFixed(1);
  
  pushingArrayTwo.push(avgTempMin);
  
  
}

function averageValuesTemp(objectArray, pushingArrayOne, pushingArrayTwo) {
  
  for (let object of objectArray) {
    pushingArrayOne.push(object.main.temp); 
  };
  let avg;
  let sumElem;
  sumElem = lodash.sum(pushingArrayOne);
  avg = (sumElem / objectArray.length).toFixed(1);
  
  pushingArrayTwo.push(avg);
  
}

function maximumTempsValues(arrayOne, arrayTwo, arrayThree, arrayFour, arrayFive){
  maxTempsValues.push((Math.max(...arrayOne)).toFixed(1));
  maxTempsValues.push((Math.max(...arrayTwo)).toFixed(1));
  maxTempsValues.push((Math.max(...arrayThree)).toFixed(1));
  maxTempsValues.push((Math.max(...arrayFour)).toFixed(1));
  maxTempsValues.push((Math.max(...arrayFive)).toFixed(1));
}

function minimumTempsValues(arrayOne, arrayTwo, arrayThree, arrayFour, arrayFive){
  minTempsValues.push((Math.min(...arrayOne)).toFixed(1));
  minTempsValues.push((Math.min(...arrayTwo)).toFixed(1));
  minTempsValues.push((Math.min(...arrayThree)).toFixed(1));
  minTempsValues.push((Math.min(...arrayFour)).toFixed(1));
  minTempsValues.push((Math.min(...arrayFive)).toFixed(1));
}

const maxTempsValues = [];
const minTempsValues = [];


const avgTempsMax = [];
const avgTempsMin = [];
const avgTemps = [];
console.log(avgTemps);







const date = new Date();
date.setHours(1);

const dates = [];
const datesInSeconds = [];

date.setDate(date.getDate() + 1);
for(let i=0; i <= 4; i++){

const newdate = date.toLocaleString('en-us',{day: 'numeric', month:'short', year:'numeric'});
dates.push(newdate);

let dateInSeconds =(date.getTime()/1000).toFixed(0);
datesInSeconds.push(dateInSeconds);
date.setDate(date.getDate() + 1);

}
console.log(dates);

let intDates = [...datesInSeconds];
intDates = intDates.map(Number);
console.log(intDates);




// ========================================================================
// Chart


let data = {
    //labels: ["January", "February", "March", "April", "May"],
    labels: dates,
    datasets: [
        {
            label: "Temperature, C°",
            
            
            
         
            borderColor : 'rgba(255, 107, 9, 1)',
            pointBorderColor : 'rgba(255, 107, 9, 1)',
            borderWidth : 2,
            fill: false, 
            backgroundColor : 'rgba(236,115,87,0.1)', 
            pointStyle : 'rectRot',
            pointRadius : 4,
            pointBorderWidth: 1,
            pointBackgroundColor : 'rgba(255, 107, 9, 1)',
            pointHoverRadius: 4,
            pointHoverBorderWidth: 3,
            pointHoverBackgroundColor: 'rgba(255,255,255,1)',
            pointHoverBorderColor: 'rgba(236,115,87,1)',
            data: temperature
        },
        {
            label: "Humidity, %",
            
            borderColor : 'rgba(9, 6, 235, 1)',
            pointBorderColor : 'rgba(9, 6, 235, 1)',
            borderWidth : 2,
            fill: false, 
            pointStyle : 'rectRot',
            pointRadius : 4,
            pointBorderWidth: 1,
            pointBackgroundColor : 'rgba(9, 6, 235, 1)',
            pointHoverRadius: 4,
            pointHoverBorderWidth: 3,
            pointHoverBackgroundColor: 'rgba(9, 6, 235, 1)',
            pointHoverBorderColor: 'rgba(9, 6, 235, 1)',
            data: humidity
        },
        {
            label: "Wind Speed, m/s",
            
            borderColor : 'rgba(31, 211, 221, 0.8)',
            pointBorderColor : 'rgba(31, 211, 221, 0.8)',
            borderWidth : 2,
            fill: false, 
            backgroundColor : 'rgba(31, 211, 221, 0.8)', 
            
            pointStyle : 'rectRot',
            pointRadius : 4,
            pointBorderWidth: 1,
            pointBackgroundColor : 'rgba(31, 211, 221, 0.8)',
            pointHoverRadius: 4,
            pointHoverBorderWidth: 3,
            pointHoverBackgroundColor: 'rgba(31, 211, 221, 0.8)',
            pointHoverBorderColor: 'rgba(31, 211, 221, 0.8)',
            data: speed
            
        },
        {
          label: " Atmosphere Pressure, mmHg",
          
          borderColor : 'rgba(188, 25, 161, 0.8)',
          pointBorderColor : 'rgba(188, 25, 161, 0.8)',
          borderWidth : 2,
          fill: false, 
          backgroundColor : 'rgba(188, 25, 161, 0.8)', 
          pointStyle : 'rectRot',
          pointRadius : 4,
          pointBorderWidth: 1,
          pointBackgroundColor : 'rgba(188, 25, 161, 0.8)',
          pointHoverRadius: 4,
          pointHoverBorderWidth: 3,
          pointHoverBackgroundColor: 'rgba(188, 25, 161, 0.8)',
          pointHoverBorderColor: 'rgba(188, 25, 161, 0.8)',
          data: pressure
          
      }
    ]
}

let options = {
  maintainAspectRatio: false,
  
  responsive: true, 
        hover: {
            mode: 'dataset' 
        },
    
    
    animations: {
      
        tension: {
          duration: 1500,
          easing: 'easeInCubic',
          from: 5,
          to: 0.15,
          loop: false,
          
        }
        
        },
    plugins: {
      
        title: {
            display: false,
            text: 'Chart Title EXAMPLE',
            color: 'violet',
            font: {
              size: 30
            }
        },
        
        legend: {
            position: 'top', 
            display: true, 
            labels: {
              color: 'violet',
              font: {
                size: 14
              },
              usePointStyle: true,
              pointStyle: 'rect'
            },
        }
        
    },
    
    
    
    
    scales: {
       
        x: {
            display: true,
            title: {
              display: true,
              text: 'Dates',
              color: "white",
              
              font: {               
                size: 20
              }
            },
           
            ticks: {
              font: {
                size: 17
              },
              color: 'white',
            },
            grid: {
              color: 'white'
            }
          },
    y: {
        display: true,
        title: {
          display: true,
          text: 'Values',
          color: 'white',
          font: {
            size: 20
          }
        },
        ticks: {
          font: {
            size: 17
          },
          color: 'violet',
        },
        grid: {
          color: 'yellow'
        }
      },
      
    } 

};

let myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
})


// ==================================================================

refs.searchForm.addEventListener('submit', evt => {
  removeList();
  evt.preventDefault();
  
  const value = searchForm.querySelector('input[name="city"]').value;
  const userInput = cityValue.value.trim();
  if (userInput === "") {
    return
  }
  
  setBackground(userInput);
  getWeatherByCity(userInput);
  getWeatherFiveDays(userInput);
  console.log(userInput);
});