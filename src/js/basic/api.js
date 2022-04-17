import config from './config.json';

class ApiService {
  constructor() {
    this.requestUrl = config.url;
    this.key = config.apiKey;
    this.bgIconUrl = config.bgIconUrl;
    this.bgKeyImg = config.bgKeyImg;
    this.units = config.units;
    this.metric = config.metric;
    this.searchQuery = '';
    this.location = 'Kiev';
  }

//metoda przyjmująca parametr collection - pogodę(dane z 1 dnia) lub prognozę(dane z 5 dni) umożliwia otrzymanie danych w zależności od parametru
getData(collection) {
  const url = `${this.requestUrl}${collection}?q=${this.location}&units=${this.units}&appid=${this.key}`;

  return fetch(url).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Something went wrong');
  });
}
//metoda do uzyskania obrazow z pixabay -- do zaimplementowania

//setter do uzyskania aktualnej lokalizacji po naciśnięciu enter
set query(newLocation) {
  this.location = newLocation;
}
}

const apiService = new ApiService({});

export default apiService;