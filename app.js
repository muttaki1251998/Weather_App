const yargs = require("yargs");
const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        description: 'Fetch the details of the given address',
        string: true
    }
}).help().alias('help', 'h').argv;

geocode.geocodeAddress(argv.address, (errMsg, results) => {
    if(errMsg) console.log(errMsg);
    else{
        console.log(results.address);
        weather.weatherAddress(results.latitude, results.longitude, (errWeather, weatherResults) => {
            if(errWeather) console.log(errWeather);
            else{
                console.log(`Today's temperature is ${weatherResults.temperature}F and it feels like ${weatherResults.apparentTemperature}F`);
            }
        });
    }    
});



