const request = require("request");

var weatherAddress = (lat, lng, callback) => {
    request({url: `https://api.darksky.net/forecast/17a138d7880379192fddc0b9290457cc/${lat},${lng}`, json: true},(error, response, body) => {
        if(!error && response.statusCode == 200){
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }else{
            callback("Unable to fetch weather");
        }
    });
}

module.exports.weatherAddress = weatherAddress;