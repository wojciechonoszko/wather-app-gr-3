import { setBackground } from "./backgroundImage";
export function getPosition(lat, long) {
    const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=364a46f8eee34fc8925b76558072e056`
    fetch(urlPosition).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    }).then(data => {
        const place = data.results[0].components.city || data.results[0].components.country;
        setBackground(place);
    });

};