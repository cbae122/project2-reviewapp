const router = require('express').Router();
const { User } = require('../../models');
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const { zipCode, location, radius } = req.body;

    const geolocation = await User.create(req.body);
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode},${location}&key=AIzaSyCppntGd7uA7jU_xH_ocsTMXk4oXh_fIZI`;
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
          };
        });
        console.log(JSON.stringify(placesResponse.data));


        // Google PLace Photo API
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=YOUR_PLACES_API_KEY`;
        return axios.get(photoUrl);
      })
      .then(photoResponse => {
        // Handle Place Photos API response
        const { headers } = photoResponse;
        const contentType = headers['content-type'];
        const imageData = photoResponse.data;

        // Extract necessary data from photo response
        const photoReference = placesResults[0].photos[0].photo_reference;
        const photoHeight = placesResults[0].photos[0].height;
        const photoWidth = placesResults[0].photos[0].width;
        const photoAttributions = placesResults[0].photos[0].html_attributions;

        // Continue with the session save and response
        req.session.save(() => {
          req.session.user_id = geolocation.id;
          req.session.logged_in = true;
        });
        // including extracted data for  photo image in response.
        const extractedData = {
          contentType,
          imageData,
          photoReference,
          photoHeight,
          photoWidth,
          photoAttributions
        };

        res.status(200).json({ geolocation, nearbyRestaurants, extractedData });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
