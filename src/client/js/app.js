// Scroll to anchor ID using scrollToElement event
const scrollToElement = (element) => {
    element.scrollIntoView({
        behavior: 'smooth'
    });
};

// Funtion to send the search request to express server
const search = async (query, date) => {
    window.scroll({
        top,
        behavior: 'smooth'
    });
    const section = document.querySelector('section#search-trip-results');
    section.style.visibility = 'hidden';
    section.innerHTML = '';

    const response = await fetch('http://localhost:8081/searchCity', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'query': query,
            'date': date
        })
    });

    try {
        const data = await response.json();

        displayResults(data, date);
        return data;
    } catch (error) {
        console.log("error: \n", error);
    }
}

// Function to display results to DOM
const displayResults = (results, date) => {
    const section = document.querySelector('section#search-trip-results');
    let h1, tripContainer, tripImgSection, img, tripDetailsSection,
        tripDestinationH, tripDateH, tripBtnsSection, tripSaveBtn,
        tripOtherDetailsSection, tripCounterH, weatherH, tempratureH;
    h1 = document.createElement('h1');
    h1.textContent = 'Search Results';
    section.appendChild(h1);
    if (results.length == 0) {
        let noResults = document.createElement('h1');
        noResults.textContent = 'No results found';
        section.appendChild(noResults);
    }
    for (const result of results) {
        tripContainer = document.createElement('div');
        tripContainer.setAttribute('class', 'trip-container');

        tripImgSection = document.createElement('div');
        tripImgSection.setAttribute('class', 'trip-img-section');
        img = document.createElement('img');
        img.src = result.imageURL ? result.imageURL : './image-placeholder.png';
        tripImgSection.appendChild(img);

        tripDetailsSection = document.createElement('div');
        tripDetailsSection.setAttribute('class', 'trip-details-section');
        tripDestinationH = document.createElement('h1');
        tripDestinationH.setAttribute('class', 'trip-details-header');
        tripDestinationH.textContent = `Trip to: ${result.name}, ${result.countryName}`
        tripDetailsSection.appendChild(tripDestinationH);
        tripDateH = document.createElement('h1');
        tripDateH.setAttribute('class', 'trip-details-header');
        tripDateH.textContent = `Departing at: ${date}`
        tripDetailsSection.appendChild(tripDateH);

        tripBtnsSection = document.createElement('div');
        tripBtnsSection.setAttribute('class', 'trip-details-btn-section');
        tripSaveBtn = document.createElement('button');
        tripSaveBtn.innerHTML = `Save Trip`
        tripSaveBtn.setAttribute('class', 'trip-btn save-btn');
        tripBtnsSection.appendChild(tripSaveBtn);
        tripDetailsSection.appendChild(tripBtnsSection);
        if (result.facts && result.facts.flag) {
            let flag = document.createElement('img');
            flag.src = result.facts.flag;
            flag.setAttribute('class', 'country-flag');
            tripBtnsSection.appendChild(flag);
        }
        tripOtherDetailsSection = document.createElement('div');
        tripCounterH = document.createElement('h3');
        tripCounterH.textContent = `${result.name}, ${result.countryName} is ${Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24))} days away`
        tripOtherDetailsSection.appendChild(tripCounterH);
        weatherH = document.createElement('h3');
        weatherH.textContent = `Typical Weather for then is ${result.weather.weather.description}`
        tripOtherDetailsSection.appendChild(weatherH);
        tempratureH = document.createElement('h4');
        tempratureH.textContent = `Temprature ${result.weather.temp}°C, Feels like ${result.weather.app_temp}°C`
        tripOtherDetailsSection.appendChild(tempratureH);
        if (result.facts) {
            if (result.facts.capital) {
                let capital = document.createElement('h4');
                capital.textContent = `Country Capital: ${result.facts.capital}`
                tripOtherDetailsSection.appendChild(capital);
            }
            if (result.facts.currencies && result.facts.currencies.length > 0) {
                let currencyElement = document.createElement('h4');
                let currencies = result.facts.currencies.map(curr => curr.code);
                let currenciesString = currencies.join(', ');

                currencyElement.textContent = `Currencies: ${currenciesString}`;
                tripOtherDetailsSection.appendChild(currencyElement);
            }
            if (result.facts.languages && result.facts.languages.length > 0) {
                let languageElement = document.createElement('h4');
                let languages = result.facts.languages.map(lang => lang.name);
                let languagesString = languages.join(', ');

                languageElement.textContent = `Languages: ${languagesString}`
                tripOtherDetailsSection.appendChild(languageElement);
            }
        }
        tripDetailsSection.appendChild(tripOtherDetailsSection);

        tripContainer.appendChild(tripImgSection);
        tripContainer.appendChild(tripDetailsSection);
        section.appendChild(tripContainer);
    }
    section.style.display = "flex";
    section.style.visibility = 'visible';
    const button = document.querySelector('button#search-btn');
    button.disabled = false;
    scrollToElement(section);
}

export {
    scrollToElement,
    search
}