const argv = require('./config/yargs').argv;
const place = require('./place/place');
const climate = require('./climate/climate');

let getInfo = async(address) => {

    try {
        let coords = await (place.getPlaceLatLng(argv.address))
        let temperature = await climate.getClimate(coords.lat, coords.lng);

        return `Temperature in ${address}: ${temperature} degrees`;
    } catch (e) {
        return `It was not possible to know the temperature in ${address}`;
    }
}

getInfo(argv.address)
    .then(res => console.log(res))
    .catch(e => console.log(e));