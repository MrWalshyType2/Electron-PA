class CurrentWeather {

    constructor(currentWeatherData) {
        this._temperature = currentWeatherData.temp;
        this._feelsLike = currentWeatherData.feels_like;
        this._weather = {
            type: currentWeatherData.weather[0].main,
            description: currentWeatherData.weather[0].description
        }
    }

    get temperature() {
        return this._temperature;
    }

    get feelsLike() {
        return this._feelsLike;
    }

    get weather() {
        return this._weather;
    }
}

module.exports = CurrentWeather;