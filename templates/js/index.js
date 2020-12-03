document.getElementById('toTest').addEventListener('click', () => {
    readFile('./templates/test.html');
});

document.getElementById('weatherRequest').addEventListener('click', () => {
    ipcRenderer.send('weather-request');
});

ipcRenderer.on('weather-data', (event, data) => {
    console.log("Weather data received")
    const weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.innerHTML = "";

    const currentWeatherData = data.current;
    const weather = new CurrentWeather(currentWeatherData);
    
    const temp = document.createElement('span');
    const feelsLike = document.createElement('span');
    const weatherDetail = document.createElement('span');
    temp.innerHTML = `Temperature: ${weather.temperature}&#8451;`;
    feelsLike.innerHTML = `Feels Like: ${weather.feelsLike}&#8451;`;
    weatherDetail.textContent = `Condition: ${weather.weather.type}`;

    if (weather.temperature < 3) {
        console.log("Weather less than 3");
        temp.className = "bg-primary";
        weather.feelsLike < 3 ? feelsLike.className = "bg-primary" : feelsLike.className = "bg-warning";
    } else if (weather.temperature < 30) {
        console.log("Weather less than 30");
        temp.className = "bg-warning";
        weather.feelsLike < 3 ? feelsLike.className = "bg-primary" : weather.feelsLike < 30 ? 
            feelsLike.className = "bg-warning" : feelsLike.className = "bg-danger";
    } else {
        temp.className = "bg-danger";
        feelsLike.className = "bg-danger";
    }

    temp.className += " col-4 py-3 pl-3";
    feelsLike.className += " col-4 py-3";
    weatherDetail.className += " col-4 py-3 pl-3";

    const row = document.createElement('div');
    row.className = 'row justify-content-between';
    row.append(temp, feelsLike, weatherDetail);

    weatherContainer.append(row);
});

ipcRenderer.send('weather-request');