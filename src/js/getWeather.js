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

const fiveDaysBtn = document.querySelector('.show-five-days-btn');
const fiveDaysList = document.querySelector('.five-days-list');
const fiveDaysHidden = document.querySelector('.five-days-hidden');
const moreInfoListHidden = document.querySelector('.more-info-hidden');
const moreInfoList = document.querySelector('.more-info-list')
const chartShowBtn = document.querySelector('.chart-show-link');
const chartShowBtnCtn = document.querySelector('.chart-show-button-container');
const chartCloseBtn = document.querySelector('.chart-hide-link');
const chartContainer = document.querySelector('.chart-cnt');




function chartDisplay() {
  
  chartShowBtn.classList.toggle('is-closed');
  chartContainer.classList.toggle('is-closed');
  
}
function fiveDaysDisplay() {
  fiveDaysHidden.classList.toggle('is-closed');
}

fiveDaysBtn.addEventListener("click", fiveDaysDisplay);
   

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
    // console.log(response);
    // console.log(response.list[0].main.temp);
    // console.log(response.list[1].main.humidity);
    // console.log(response.list[2].main.pressure);
    // console.log(response.list[3].wind.speed);
    
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
    // const avgTempMaxOne = (tempMaxOne / dayOne.length).toFixed(1);
    // avgTempMax.push(avgTempMaxOne);
    // const avgTempMaxTwo = (tempMaxTwo / dayOne.length).toFixed(1);
    // avgTempMax.push(avgTempMaxTwo);

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

let minTemperature = document.createElement('li');
minTemperature.className = 'min-temp-five-days';
minTemperature.textContent = `min ${avgTempsMin[i]} °C`;

let maxTemperature = document.createElement('li');
maxTemperature.className = 'max-temp-five-days';
maxTemperature.textContent = `max ${avgTempsMax[i]} °C`;


let humFiveDays = document.createElement('li');
humFiveDays.className = 'hum-five-days';
humFiveDays.textContent = `${humidity[i]} %`;




      let listItem = document.createElement('ul');
      listItem.appendChild(dateFiveDays);
      //listItem.appendChild(tempFiveDays);
      listItem.appendChild(minTemperature ,maxTemperature);
      listItem.appendChild(maxTemperature);
      //listItem.appendChild(iconFiveDays);
      listItem.appendChild(iconDayOne);
      //listItem.appendChild(humFiveDays);
      listItem.appendChild(moreInfoBtn);
      
      
     
      
    //console.log(i);
      fiveDaysList.appendChild(listItem);

    //let moreInfoBtn = document.querySelector(`.more-info${i}`);
    moreInfoBtn.addEventListener('click', moreInfoDisplay);
    i+=1; 
    }
    
  }).then(moreInfo)
};

function moreInfoDisplay() {
  moreInfoListHidden.classList.toggle('is-closed');
  moreInfoList.classList.toggle('is-closed')
}


function moreInfo(){
  let i=0;
  for (const elem of dayOneTemps){
  //console.log(dayOneTemps);
  let hour = document.createElement('li');
  hour.className = 'hour';
  hour.textContent = `${hours[i]}`;

  let iconDayOne = document.createElement('img');
iconDayOne.className = `icon-${classIcon[i]}`;

  let tempDayOne = document.createElement('li');
  tempDayOne.className = 'temp-day-one';
  tempDayOne.textContent = `${dayOneTemps[i]} °C`;

  let pressureDayOne = document.createElement('li');
  pressureDayOne.className = 'pressure-day-one';
  pressureDayOne.textContent = `${dayOnePressure[i]} hPa`;

  let humidityDayOne = document.createElement('li');
  humidityDayOne.className = 'humidity-day-one';
  humidityDayOne.textContent = `${dayOneHumidity[i]} %`;

  let windDayOne = document.createElement('li');
  windDayOne.className = 'wind-day-one';
  windDayOne.textContent = `${dayOneWind[i]} m/s`;

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

const temperature = [];
//console.log(temperature);
const humidity = [];
const pressure = [];
const speed = [];
const minTemp = [];
//console.log(minTemp);
const maxTemp = [];
//console.log(maxTemp);

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

  generateHours(dayOne, hours)

  pressureInject(dayOne, dayOnePressure)

  humidityInject(dayOne, dayOneHumidity)

  windInject(dayOne, dayOneWind)

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
  //console.log(objectArray);
  for (let object of objectArray){
    for (let obj of object){
      //console.log(obj);
    //console.log(obj.main);
    //console.log(obj.id);
    pushingArrayOne.push(obj.main)
    }
    
  }
  console.log(pushingArrayOne);

};

function generateHours(objectArray, pushingArrayOne){
  for (let object of objectArray){
    let cutter;
    cutter = object.dt_txt.split(' ')
    //console.log(cutter);
    pushingArrayOne.push(cutter[1])
    //console.log(pushingArrayOne);
  }
}
function averageValuesTempMax(objectArray, pushingArrayOne, pushingArrayTwo) {
  const lodash = require('lodash');
  for (let object of objectArray) {
    pushingArrayOne.push(object.main.temp_max); 
  };
  //console.log(pushingArrayOne);
  let avgTempMax = 0;
  let sumElem = 0;
  //sumElem = lodash.sum(pushingArrayOne);
  for(let elem of pushingArrayOne){
    sumElem += elem;
  }
  //avgTempMax = sumElem / objectArray.length;
  avgTempMax = (sumElem / objectArray.length).toFixed(1);
  //avgTempMax = Math.round(sumElem / pushingArrayOne.length);
  
  //console.log(avgTempMax);
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
  //console.log(sumElem);
  avgTempMin = (sumElem / objectArray.length).toFixed(1);
  //avgTempMax = Math.round(sumElem / pushingArrayOne.length);
  
  //console.log(typeof(avgTempMin));
  
  pushingArrayTwo.push(avgTempMin);
  
  
}

function averageValuesTemp(objectArray, pushingArrayOne, pushingArrayTwo) {
  
  for (let object of objectArray) {
    pushingArrayOne.push(object.main.temp); 
  };
  let avg;
  let sumElem;
  sumElem = lodash.sum(pushingArrayOne);
  //console.log(sumElem);
  avg = (sumElem / objectArray.length).toFixed(1);
  //avgTempMax = Math.round(sumElem / pushingArrayOne.length);
  
  //console.log(typeof(avgTempMin));
  
  pushingArrayTwo.push(avg);
  
   
}

const avgTempsMax = [];
//console.log(avgTempsMax);
const avgTempsMin = [];
//console.log(avgTempsMin);
const avgTemps = [];
console.log(avgTemps);




// for (let object of dayOne) {
  
//     // console.log(object);
//     // console.log(object.dt);
//     // console.log(object.pop);
// };
//   const lodash = require('lodash'); 
//   for (let object of dayOne) {
//   dayOneTempsMax.push(object.main.temp_max)
   
// };
// let avgDayOneTempMax = ((lodash.sum(dayOneTempsMax))/ dayTwo.length).toFixed(1)

// console.log(avgDayOneTempMax);
// //console.log(dayOneTempsMax);

// for (let object of dayTwo) {
//   dayTwoTempsMax.push(object.main.temp_max);
// }

// let avgDayTwoTempMax = ((lodash.sum(dayTwoTempsMax))/ dayTwo.length).toFixed(1)
// console.log(avgDayTwoTempMax);  





// function renderFiveDaysList(elements) {
//   const markup = elements
//     .map((element) => {
//       return `<li>
//           <p><b>Name</b>: ${element.main.temp}</p>
//           <p><b>Email</b>: ${element.main.humidity}</p>
//           <p><b>Company</b>: ${element.main.pressure}</p>
//         </li>`;
//     })
//     .join("");
//   fiveDaysList.innerHTML = markup;
// }


const date = new Date();
date.setHours(1);

const dates = [];
const datesInSeconds = [];

date.setDate(date.getDate() + 1);
for(let i=0; i <= 4; i++){

// const month = date.getUTCMonth() + 1; //months from 1-12
// const day = date.getUTCDate();
// const year = date.getUTCFullYear();
const newdate = date.toLocaleString('en-us',{day: 'numeric', month:'short', year:'numeric'});
//const newdate = year + "/" + month + "/" + day;
dates.push(newdate);

let dateInSeconds =(date.getTime()/1000).toFixed(0);
//console.log(dateInSeconds);
datesInSeconds.push(dateInSeconds);
date.setDate(date.getDate() + 1);

}
console.log(dates);
//console.log(datesInSeconds);

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
            
            
            
            //linia
            borderColor : 'rgba(255, 107, 9, 1)',
            pointBorderColor : 'rgba(255, 107, 9, 1)',
            borderWidth : 2,
            //kolor tla i legendy
            fill: false, //czy wypelnic zbior
            backgroundColor : 'rgba(236,115,87,0.1)', //wplywa tez na kolor w legendzie
            //ustawienia punktu
            pointStyle : 'rectRot',
            pointRadius : 4,
            pointBorderWidth: 1,
            pointBackgroundColor : 'rgba(255, 107, 9, 1)',
            //ustawienia punkut hover
            pointHoverRadius: 4,
            pointHoverBorderWidth: 3,
            pointHoverBackgroundColor: 'rgba(255,255,255,1)',
            pointHoverBorderColor: 'rgba(236,115,87,1)',
            //data: [10,16,13,16,20],
            data: temperature
        },
        {
            label: "Humidity, %",
            //linia
            borderColor : 'rgba(9, 6, 235, 1)',
            pointBorderColor : 'rgba(9, 6, 235, 1)',
            borderWidth : 2,
            //kolor tla i legendy
            fill: false, //czy wypelnic zbior
            //backgroundColor : 'rgba(236,115,87,0.1)', //wplywa tez na kolor w legendzie
            //ustawienia punktu
            pointStyle : 'rectRot',
            pointRadius : 4,
            pointBorderWidth: 1,
            pointBackgroundColor : 'rgba(9, 6, 235, 1)',
            //ustawienia punktu hover
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
            //kolor tla i legendy
            fill: false, //czy wypelnic zbior
            backgroundColor : 'rgba(31, 211, 221, 0.8)', //wplywa tez na kolor w legendzie
            //ustawienia punktu
            pointStyle : 'rectRot',
            pointRadius : 4,
            pointBorderWidth: 1,
            pointBackgroundColor : 'rgba(31, 211, 221, 0.8)',
            //ustawienia punkut hover
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
          //kolor tla i legendy
          fill: false, //czy wypelnic zbior
          backgroundColor : 'rgba(188, 25, 161, 0.8)', //wplywa tez na kolor w legendzie
          //ustawienia punktu
          pointStyle : 'rectRot',
          pointRadius : 4,
          pointBorderWidth: 1,
          pointBackgroundColor : 'rgba(188, 25, 161, 0.8)',
          //ustawienia punkut hover
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
  
  responsive: true, //responsywnosc
        hover: {
            mode: 'dataset' //jak pokazywac tooltipy po najechaniu na punkty wykresu
            //mode: 'label',
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
            position: 'top', //polozenie legendy
            display: true, // pokazuj legende
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
            //type: 'linear',
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