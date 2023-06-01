const router = require('express').Router();
const { User } = require('../../models');
const axios = require('axios');

router.get('/:zip/:location?', async (req, res) => {
  try {
    // const { zipCode, location, radius } = req.body;

    // const geolocation = await User.create(req.body);
    // https://maps.googleapis.com/maps/api/geocode/json?address="91765"&key=
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.zip},${location}&key=${process.env.API_KEY}`;
    // const parameters = req.body.param1;

    return axios.get(geocodingUrl)
      .then(geocodingResponse => {
        console.log(geocodingResponse.data);
        // Geocoding API response
        const { results } = geocodingResponse.data;
        if (results.length === 0) {
          throw new Error('Invalid zip code');
        }
        // Extracting data from geocoding response
        const { lat, lng } = results[0].geometry.location;

        // Make request to Places API
        const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&key=${process.env.API_KEY}`;
        // tested the api in insominia 
        // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.0286,-117.8103&radius=100&type=restaurant&key=
        return axios.get(placesUrl);
      })
      .then(placesResponse => {
        //Places API response
        const { results } = placesResponse.data;
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
        // console.log(JSON.stringify(placesResponse.data));
        
        // const placeDetailsPromises = placesResults.map(place => {
        //   const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${process.env.API_KEY}`;
        //   return axios.get(placeDetailsUrl);
        // });

        // return Promise.all(placeDetailsPromises);
      })
      .then(placeDetailsResponses => {
        console.log(placeDetailsResponses);
        // // const extractedData = placeDetailsResponses.map(response => {
        // //   const { result } = response.data;

        // //   return {
        // //     address: result.formatted_address,
        // //     location: result.geometry.location,
        // //     photoReference: result.photos ? result.photos[0].photo_reference : null,
        // //     openingHours: result.opening_hours ? result.opening_hours.weekday_text : null,
        // //     // reviews: result.reviews ? result.reviews.map(review => ({
        // //     //   author: review.author_name,
        // //     //   rating: review.rating,
        // //     //   text: review.text,
        // //     // })) : null,
        //   };
        // });

        res.status(200).json({ placeDetailsResponses });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  } catch (err) {
    res.status(400).json(err);
  } 
});

module.exports = router;
