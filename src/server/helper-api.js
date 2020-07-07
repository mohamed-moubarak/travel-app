const fetch = require('node-fetch');

const getTripSearchResults = async (query, date, callback) => {
    const response = await fetch(`http://api.geonames.org/searchJSON?name=${query}&maxRows=10&username=${process.env.GEONAMES_USERNAME}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    try {
        const data = await response.json();
        let dataArr = data.geonames;
        const uniqueResults = Array.from(new Set(dataArr.map(a => a.countryId)))
            .map(countryId => {
                return dataArr.find(a => a.countryId === countryId)
            });
        let weatherPromises = [];
        let dayDifference = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
        if (dayDifference <= 7)
            uniqueResults.forEach(res => {
                weatherPromises.push(getCurrentWeather(res));
            });
        else
            uniqueResults.forEach(res => {
                weatherPromises.push(getWeatherForecast(res, date));
            });

        Promise.all(weatherPromises)
            .then(() => {
                callback(uniqueResults);
            })
            .catch((e) => {
                console.log("error", error);
            });

    } catch (error) {
        console.log("error", error);
    }
}

const getCurrentWeather = async (city) => {
    const response = await fetch(`https://api.weatherbit.io/v2.0/current?key=${process.env.WEATHERBIT_API_KEY}&lat=${city.lat}&lon=${city.lng}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    try {
        const data = await response.json();
        let dataArr = data.data;
        city['weather'] = dataArr[0];
        return city;
    } catch (error) {
        console.log("error", error);
    }
}

const getWeatherForecast = async (city, date) => {
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&lat=${city.lat}&lon=${city.lng}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    try {
        const data = await response.json();
        let dataArr = data.data;
        let targetForecast = dataArr.find(singleForecast => {
            return new Date(singleForecast.datetime).setHours(0, 0, 0, 0) == new Date(date).setHours(0, 0, 0, 0)
        });

        if (!targetForecast) {
            console.log('not found, assigning last')
            targetForecast = dataArr[dataArr.length - 1];
        }

        city['weather'] = targetForecast;
        return city;
    } catch (error) {
        console.log("error", error);
    }
}

module.exports = {
    getTripSearchResults
}