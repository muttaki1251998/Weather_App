const yargs = require("yargs");
const axios = require("axios");

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        description: 'Fetch the details of the given address',
        string: true
    }
}).help().alias('help', 'h').argv;

var encodedAddress = encodeURIComponent(argv.address);
var geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDlPhpuSLud7BCkY_AtoYf79C8ciltlIiI&address=${encodedAddress}`;

axios.get(geoUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error("Unable to fetch you location. Try again");
    }
    console.log(response.data.results[0].formatted_address);

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;

    weatherUrl = `https://api.darksky.net/forecast/17a138d7880379192fddc0b9290457cc/${lat},${lng}`;

    // Get the weather with axios library
    return axios.get(weatherUrl);    
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`Today's temperature is ${temperature}F and it feels like ${apparentTemperature}F`);
}).catch((e) => {
    if(e.code === "ENOTFOUND"){
        console.log("Unable to connect to API servers");
    }else{
        console.log(e.message);
    }   
});