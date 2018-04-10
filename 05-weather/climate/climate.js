const axios = require('axios');

const getClimate = async(lat, lng) => {

    let apiKey = '93a55be295bda3ec511513be871dc9eb';

    let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${apiKey}`);

    // if (resp.data.status === 'ZERO_RESULTS') {
    //     throw new Error(`There is no result for ${address}`);
    // }

    return resp.data.main.temp;
}

module.exports = {
    getClimate
}