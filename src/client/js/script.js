// Scroll to anchor ID using scrollToElement event
const scrollToElement = (element) => {
    element.scrollIntoView({
        behavior: 'smooth'
    });
};

const search = async (query, date) => {
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
        console.log(data)
        // document.getElementById('text').innerHTML = `Text: ${data.text}`;
        // document.getElementById('polarity').innerHTML = `Polarity: ${data.polarity}`;
        // document.getElementById('subjectivity').innerHTML = `Subjectivity: ${data.subjectivity}`;
        // document.getElementById('polarity_confidence').innerHTML = `Polarity Confidence: ${data.polarity_confidence * 100} %`;
        // document.getElementById('subjectivity_confidence').innerHTML = `Subjectivity Confidence: ${data.subjectivity_confidence * 100} %`;
        return data;
    } catch (error) {
        console.log("error: \n", error);
    }
}

export {
    scrollToElement,
    search
}