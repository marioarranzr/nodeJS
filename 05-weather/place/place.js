const axios = require('axios');

const getPlaceLatLng = async(address) => {

    let encodeAddress = encodeURI(address);

    let apiKey = 'AIzaSyC8IfiuNBEiRxAyg7nRtWcKlCDvh3XfRqE';

    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=${apiKey}`);

    if (resp.data.status === 'ZERO_RESULTS') {
        throw new Error(`There is no result for ${address}`);
    }

    let location = resp.data.results[0];
    let coords = location.geometry.location;
    // console.log(JSON.stringify(resp.data, undefined, 2));

    return {
        address: location.formatted_address,
        lat: coords.lat,
        lng: coords.lng
    };
}

module.exports = {
    getPlaceLatLng
}