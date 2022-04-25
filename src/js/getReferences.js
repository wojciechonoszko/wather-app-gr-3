export const getRefs = () => {
    return {
      temperature: document.querySelector('.currentDay__temperature'),
      locationTimezone: document.querySelector('.currentDay__cityname'),
      minTemperature: document.querySelector('.currentDay__temperature__min'),
      maxTemperature: document.querySelector('.currentDay__temperature__max'),
      body: document.querySelector('body'),
      searchForm: document.querySelector('.formInput'),
      // day: document.querySelector('.'),
      // weekDay: document.querySelector('.'),
      // month: document.querySelector('.'),
      // time: document.querySelector('.'),

    };
  };