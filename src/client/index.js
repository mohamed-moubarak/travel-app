import {
    scrollToElement,
    search
} from './js/app';
import img from './media/image-placeholder.png';
import './styles/resets.scss';
import './styles/base.scss';
import './styles/main-style.scss';


document.querySelector('button#add-new-trip').addEventListener('click', (event) => {
    event.preventDefault();
    let selectedSection = document.querySelector('#trip-booking-section');
    scrollToElement(selectedSection);
});

document.querySelector('button#search-btn').addEventListener('click', (event) => {
    event.preventDefault();
    const button = document.querySelector('button#search-btn');
    button.disabled = true;
    let location = document.getElementById('trip-destination').value;
    let tripDate = document.getElementById('trip-date').value;
    let destinationErrorElement = document.getElementById('destination-err');
    let dateErrorElement = document.getElementById('date-err');
    if (!location) {
        destinationErrorElement.innerHTML = 'ERROR: Field cannot be empty';
        button.disabled = false;
        return;
    }
    destinationErrorElement.innerHTML = '';
    if (!tripDate) {
        dateErrorElement.innerHTML = 'ERROR: Field cannot be empty';
        button.disabled = false;
        return;
    }
    if (new Date(tripDate) < new Date()) {
        dateErrorElement.innerHTML = 'ERROR: Trip date cannot be in the past';
        button.disabled = false;
        return;
    }
    dateErrorElement.innerHTML = '';

    search(location, tripDate);
});

document.querySelector('button#clear-btn').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('trip-destination').value = null;
    document.getElementById('trip-date').value = null;
    const button = document.querySelector('button#search-btn');
    button.disabled = false;
    let selectedSection = document.querySelector('#trip-booking-section');
    scrollToElement(selectedSection);
});

document.querySelector('section#search-trip-results').addEventListener('click', (event) => {
    if (event.target.nodeName === 'BUTTON' && event.target.className === 'trip-btn save-btn') {
        event.preventDefault();
        let choosenTripContainer = event.target.parentNode.parentNode.parentNode;
        let buttonParent = event.target.parentNode;

        buttonParent.removeChild(event.target);
        let removeBtn = document.createElement('button');
        removeBtn.innerHTML = `Remove Trip`
        removeBtn.setAttribute('class', 'trip-btn remove-btn');
        buttonParent.prepend(removeBtn);

        const myTrips = document.querySelector('section#my-trips-section');
        const myTripsContainer = document.querySelector('section#my-trips-section');

        myTripsContainer.style.display = "block";
        myTrips.appendChild(choosenTripContainer);

        scrollToElement(choosenTripContainer);
    }
});

document.querySelector('section#my-trips-section').addEventListener('click', (event) => {
    if (event.target.nodeName === 'BUTTON' && event.target.className === 'trip-btn remove-btn') {
        event.preventDefault();
        let choosenTripContainer = event.target.parentNode.parentNode.parentNode;
        let buttonParent = event.target.parentNode;

        buttonParent.removeChild(event.target);
        let saveBtn = document.createElement('button');
        saveBtn.innerHTML = `Save Trip`
        saveBtn.setAttribute('class', 'trip-btn save-btn');
        buttonParent.prepend(saveBtn);

        const myTrips = document.querySelector('section#search-trip-results');

        myTrips.appendChild(choosenTripContainer);
    }
});