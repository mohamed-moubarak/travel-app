import {
    scrollToElement,
    search
} from './js/script';
import './styles/resets.scss';
import './styles/base.scss';
import './styles/main-style.scss';


document.querySelector('button#add-new-trip').addEventListener('click', (event) => {
    event.preventDefault();
    let selectedSection = document.querySelector('#trip-booking-section');
    scrollToElement(selectedSection);
});

document.querySelector('button#search-btn').addEventListener('click', (event) => {
    event.preventDefault()

    let location = document.getElementById('trip-destination').value;
    let tripDate = document.getElementById('trip-date').value;
    let destinationErrorElement = document.getElementById('destination-err');
    let dateErrorElement = document.getElementById('date-err');
    if (!location) {
        destinationErrorElement.innerHTML = 'ERROR: Field cannot be empty';
        return;
    }
    destinationErrorElement.innerHTML = '';
    if (!tripDate) {
        dateErrorElement.innerHTML = 'ERROR: Field cannot be empty';
        return;
    }
    if (new Date(tripDate) < new Date()) {
        dateErrorElement.innerHTML = 'ERROR: Trip date cannot be in the past';
        return;
    }
    dateErrorElement.innerHTML = '';

    // console.log();
    search(location, tripDate);
    // if (Client)
    //     Client.checkForName(location);
    // else checkForName(location);

});