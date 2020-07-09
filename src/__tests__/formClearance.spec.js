describe("Clear form function", () => {
    test("It should simulate form resetting", () => {

        document.body.innerHTML = `<section id="trip-booking-section">
        <form>
            <div class="form-control">
                <label for="trip-destination">Destination</label>
                <input type="text" id="trip-destination" name="trip-destination" placeholder="Enter Location">
            </div>
            <div id="destination-err" class="error"></div>
            <div class="form-control">
                <label for="trip-date">Date</label>
                <input type="date" id="trip-date" name="trip-date" placeholder="test">
            </div>
            <div id="date-err" class="error"></div>
        </form>
        <div id="trip-details-btn-section">
            <button id="search-btn" class="trip-btn save-btn">
                Search
            </button>
            <button id="clear-btn" class="trip-btn remove-btn">
                Reset
            </button>
        </div>
    </section>`;

        document.querySelector('button#clear-btn').addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById('trip-destination').value = null;
            document.getElementById('trip-date').value = null;
            const button = document.querySelector('button#search-btn');
            button.disabled = false;
        });

        const tripDestination = document.getElementById('trip-destination');
        tripDestination.value = 'Cairo';
        let event = document.createEvent("MouseEvent");
        event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        document.getElementById("clear-btn").dispatchEvent(event);

        expect(tripDestination.value).toBe('');
    });
});