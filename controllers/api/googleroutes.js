const router = require('express').Router();
const { User } = require('../../models');
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const { zipCode, location, radius } = req.body;

    const geolocation = await User.create(req.body);
    // https://maps.googleapis.com/maps/api/geocode/json?address="91765"&key=AIzaSyCppntGd7uA7jU_xH_ocsTMXk4oXh_fIZI
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode},${location}&geo-key=${API_KEY}`;
    const parameters = req.body.param1;

    axios.get(geocodingUrl + parameters)
      .then(geocodingResponse => {
        // Geocoding API response
        const { results } = geocodingResponse.data;
        if (results.length === 0) {
          throw new Error('Invalid zip code');
        }
        // Extracting data from geocoding response
        const { lat, lng } = results[0].geometry.location;

        // Make request to Places API
        const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&places-key=${API_KEY}`;
        // tested the api in insominia 
        // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.0286,-117.8103&radius=100&type=restaurant&key=AIzaSyCqybTpBcQTsgIdcFay6vudA-v8PPTDRuk
        return axios.get(placesUrl);
      })
      .then(placesResponse => {
        //Places API response
        const { results: placesResults } = placesResponse.data;
        //Extracting data from places response
        const nearbyRestaurants = placesResults.map(place => {
          return {
            name: place.name,
            address: place.vicinity,
            rating: place.rating,
            photoReference: place.photos ? place.photos[0].photo_reference : null,
            openingHours: place.opening_hours ? place.opening_hours.weekday_text : null,
          };
        });
        console.log(JSON.stringify(placesResponse.data));

        const placeDetailsPromises = placesResults.map(place => {
          const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=YOUR_PLACES_API_KEY`;
          return axios.get(placeDetailsUrl);
        });

        return Promise.all(placeDetailsPromises);
      })
      .then(placeDetailsResponses => {
        const extractedData = placeDetailsResponses.map(response => {
          const { result } = response.data;

          return {
            address: result.formatted_address,
            location: result.geometry.location,
            photoReference: result.photos ? result.photos[0].photo_reference : null,
            openingHours: result.opening_hours ? result.opening_hours.weekday_text : null,
            reviews: result.reviews ? result.reviews.map(review => ({
              author: review.author_name,
              rating: review.rating,
              text: review.text,
            })) : null,
          };
        });

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
