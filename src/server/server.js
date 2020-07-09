var path = require('path')
const express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'))
});

//Start server listening
app.listen(8081, () => {
    console.log('App is listening on port 8081!')
});

//End point used to test server is reached
app.get("/testserver", (req, res) => {
    res.status(200).send("Hello from server!");
});

// Adding helperAPI and searchcity endpoint when environment is production only
if (process.env.ENV == 'Production') {
    const helperAPI = require('./helper-api.js')
    app.post('/searchCity', (req, res) => {
        helperAPI.getTripSearchResults(req.body.query, req.body.date, (searchResults) => {
            res.send(searchResults);
        });
    });
}

module.exports = app;