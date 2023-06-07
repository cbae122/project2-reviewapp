const router = require('express').Router();
const { Place } = require('../../models');
const axios = require('axios');
const withAuth = require('../../utils/auth');
router.get('/:zip/:location?', async (req, res) => {
  try {
    // const { zipCode, location, radius } = req.body;
    // const geolocation = await User.create(req.body);
    // https://maps.googleapis.com/maps/api/geocode/json?address="91765"&key=
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.zip}&key=${process.env.API_KEY}`;
    // const parameters = req.body.param1;
    return axios.get(geocodingUrl)
      .then(geocodingResponse => {
        // console.log(geocodingResponse.data);
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
        // tested the api in insominia 
        // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.0286,-117.8103&radius=100&type=restaurant&key=
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
        const photos = [];
        const requests = [];

        placeDetailsResponses.forEach(async place => {
          let ref = place.photoReference;
          if (ref) {
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${process.env.API_KEY}`;
            requests.push(
              axios.get(photoUrl, {
                responseType: 'arraybuffer',
              })
            );
          }          
        });

        Promise.all(requests)
          .then((responseArray) => {
            console.log('Promises plural resolved');
            // console.log(responseArray);

            responseArray.forEach((response, index) => {
              const photo = Buffer.from(response.data, 'binary').toString('base64');
              photos.push(photo);
              // console.log(photo);
              placeDetailsResponses[index].photoBase64 = photo;
            });
            // res.json({message: 'end'});
            res.status(200).json({ placeDetailsResponses, photos });
          });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
