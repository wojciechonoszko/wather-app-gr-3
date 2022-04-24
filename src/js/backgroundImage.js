import { getRefs } from "./getReferences";
const refs = getRefs();

const randomIntegerFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

export function setBackground(place) {
   const url = `https://pixabay.com/api/?image_type=backgrounds&orientation=horizontal&q=${place}&per_page=20&key=26975997-de7a8a152454f319936439968
`;
    fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    }).then(({ hits }) => {
        const randomIndexImg = randomIntegerFromInterval(0, hits.length - 1);
        refs.body.style = `background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),
  url('${hits[randomIndexImg].largeImageURL}') center fixed; background-size: cover;`
    });
  }
