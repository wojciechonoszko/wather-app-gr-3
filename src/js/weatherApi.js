let weather = {
    apiKey: "88007012f79caf118a2a9709acbfec32",
    fetchWeather: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon } = data.weather[0];
        const { temp } = data.main;

        document.querySelector(".currentDay__cityname").innerText = name;
        document.querySelector(".currentDay__icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".currentDay__temperature").innerText = Math.round(temp) + "°C";

        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function() {
        this.fetchWeather(document.querySelector(".citySearch__input").value);
    },
};

document.querySelector(".formInput").addEventListener('submit', function() {
    weather.search();
});

document
    .querySelector(".citySearch__input")
    .addEventListener("keyup", function(event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather();