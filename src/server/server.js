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

app.listen(8081, () => {
    console.log('App is listening on port 8081!')
});