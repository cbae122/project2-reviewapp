const router = require('express').Router();
const { Place } = require('../../models');
const axios = require('axios');
const withAuth = require('../../utils/auth');
router.get('/:zip/:location?', async (req, res) => {
  try {


    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.zip}&key=${process.env.API_KEY}`;

    return axios.get(geocodingUrl)
      .then(geocodingResponse => {

        // Geocoding API response
        const { results } = geocodingResponse.data;
        console.log(results);
        if (results.length === 0) {
          throw new Error('Invalid zip code');
        }
        // Extracting data from geocoding response
        const { lat, lng } = results[0].geometry.location;
        // Make request to Places API
        const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=8500&type=restaurant&key=${process.env.API_KEY}`;

        return axios.get(placesUrl);
      })
      .then(placesResponse => {
        //Places API response
        const { results } = placesResponse.data;
        //Extracting data from places response
        const nearbyRestaurants = results.map(place => {
          return {
            name: place.name,
            address: place.vicinity,
            rating: place.rating,
            photoReference: place.photos ? place.photos[0].photo_reference : null,
            openingHours: place.opening_hours ? place.opening_hours.weekday_text : null,
          };
        });
 
        return nearbyRestaurants;

      })
      .then(placeDetailsResponses => {
        console.log(placeDetailsResponses);

        
        res.status(200).json({ placeDetailsResponses });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;