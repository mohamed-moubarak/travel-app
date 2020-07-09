# Travel App
Travel App, the fifth and last project in **Front End Developer Nanodegree Program** by **Udacity**.


## Starter Code Reference

This project was developed based on the starter template, provided by Udacity **Getting Started Section** of **Travel App Project** in **Front End Developer Nanodegree Program**, that can be found in the following repo, by cloning branch **'refresh-2019'** and merging the necessary files to this repo.

```
https://github.com/udacity/fend/tree/refresh-2019
```

### Running App Steps:

* Make sure to run `npm install` to install all dependencies.
* Signup for GEONAMES API key at **http://www.geonames.org/export/web-services.html**.
* Signup for WEATHERBIT API key at **https://www.weatherbit.io/account/create**.
* Signup for PIXABAY API key at **https://pixabay.com/api/docs/**.
* Add **.env** file to the root folder of the project.
* Add the below keys to **.env** file.
```
WEATHERBIT_API_KEY=**************************
PIXABAY_API_KEY=**************************
GEONAMES_USERNAME=**************************
```
* You can start a dev server using webpack by the following command
`npm run build-dev`
* Before running npm start to run src/server/server.js, you have to make sure you got a .dist folder produced, if you don't have it, you can run the following command
`npm run build-prod`

**Please note that the chosen extra project extension feature is integrating REST Countries API to get facts about the country being visited.**