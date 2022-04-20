import apiService from './basic/api';
const body = document.body;
let location = 'kiev';
function setBgImages() {
  apiService.getImages().then(data => {
    const contryImgUrl = data.hits[1].largeImageURL;
    const styleValue = `background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)) 0% 0% / cover, url(${contryImgUrl}) center fixed; background-size: cover;`;
    body.setAttribute('style', styleValue);
  });
}
setBgImages();

const setGeoLocationImg = newLocation => {
  location = newLocation;
};

export { setBgImages, setGeoLocationImg };