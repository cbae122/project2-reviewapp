const router = require('express').Router();
const { User } = require('../../models');
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const { zipCode, location, radius } = req.body;

    const geolocation = await User.create(req.body);
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode},${location},${radius}&key=YOUR_GEOCODING_API_KEY`;
    const parameters = req.body.param1;

    axios.get(geocodingUrl + parameters)
      .then(geocodingResponse => {
        // Handle geocoding API response
        const { results } = geocodingResponse.data;
        if (results.length === 0) {
          throw new Error('Invalid zip code');
        }
        // Extract necessary data from geocoding response
        const { lat, lng } = results[0].geometry.location;
        const formattedAddress = results[0].formatted_address;

        // Make request to Places API
        const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&key=YOUR_PLACES_API_KEY`;
        return axios.get(placesUrl);
      })
      .then(placesResponse => {
        // Handle Places API response
        const { results: placesResults } = placesResponse.data;
        // Extract necessary data from places response
        const nearbyRestaurants = placesResults.map(place => {
          return {
            name: place.name,
            address: place.vicinity,
            rating: place.rating,
            // Add any other desired restaurant properties
          };
        });
        // Make request to Pics API
        const searchQuery = 'your_search_query';
        const picsUrl = `https://picsapi.com/api?q=${searchQuery}&key=YOUR_PICS_API_KEY`;
        return axios.get(picsUrl);
      })
      .then(picsResponse => {
        // Pics API response
        const { data: picsData } = picsResponse;
        // Extracting from pics response
        const extractedData = picsData.map(item => {
          return {
            // deciding on which properties of the pics-api to use
            property1: item.prop1,
            property2: item.prop2,

          };
        });
        // session save and response
        req.session.save(() => {
          req.session.user_id = geolocation.id;
          req.session.logged_in = true;

          res.status(200).json({ geolocation, nearbyRestaurants, extractedData });
        });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
