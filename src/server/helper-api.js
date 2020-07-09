const fetch = require('node-fetch');
var url = require('url');

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
                let factsPromises = [];
                uniqueResults.forEach(res => {
                    factsPromises.push(getCountryFacts(res));
                });
                Promise.all(factsPromises).then(() => {
                    let imagePromises = [];
                    uniqueResults.forEach(res => {
                        imagePromises.push(getTripImage(res));
                    });
                    Promise.all(imagePromises).then(() => {
                        callback(uniqueResults);
                    }).catch((error) => {
                        console.log("error", error);
                    });
                }).catch((error) => {
                    console.log("error", error);
                });
            })
            .catch((error) => {
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
            targetForecast = dataArr[dataArr.length - 1];
        }

        city['weather'] = targetForecast;
        return city;
    } catch (error) {
        console.log("error", error);
    }
}

const getTripImage = async (city) => {
    if (!city || (!city.name && !city.countryName))
        return;
    else if (!city.countryName && city.name)
        city.countryName = city.name;
    else if (!city.name && city.countryName)
        city.name = city.countryName;

    let query = city.name.replace(/\s/g, '+') + ',' + city.countryName.replace(/\s/g, '+');
    const response = await fetch(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${query}&image_type=photo&orientation=horizontal&min_width=440&safesearch=true&per_page=10`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    try {
        const data = await response.json();
        let dataArr = data.hits;
        let imageURL = null;
        if (dataArr.length > 0) {
            imageURL = dataArr[Math.floor(Math.random() * dataArr.length)].largeImageURL;
            city['imageURL'] = imageURL;
            return city;
        } else {
            await getCountryImage(city);
        }
    } catch (error) {
        console.log("error", error);
    }
}

const getCountryImage = async (city) => {
    if (!city || (!city.name && !city.countryName))
        return;
    else if (!city.countryName && city.name)
        city.countryName = city.name;

    let query = city.countryName.replace(/\s/g, '+');
    const response = await fetch(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${query}&image_type=photo&orientation=horizontal&min_width=440&safesearch=true&per_page=10`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    try {
        const data = await response.json();
        let dataArr = data.hits;
        let imageURL = null;
        if (dataArr.length > 0) {
            imageURL = dataArr[Math.floor(Math.random() * dataArr.length)].largeImageURL;
        }
        city['imageURL'] = imageURL;
        return city;
    } catch (error) {
        console.log("error", error);
    }
}


const getCountryFacts = async (city) => {
    if (!city.countryName)
        return;

    const response = await fetch(`https://restcountries.eu/rest/v2/name/${city.countryName}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    try {
        const data = await response.json();
        let dataArr = data;
        let facts = null;
        if (dataArr.length > 0) {
            facts = dataArr[0];
        }
        city['facts'] = facts;
        return city;
    } catch (error) {
        console.log("error", error);
    }
}

module.exports = {
    getTripSearchResults
}