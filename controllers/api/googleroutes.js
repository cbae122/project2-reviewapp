const router = require('express').Router();
const { Place } = require('../../models');
const axios = require('axios');
const withAuth = require('../../utils/auth');
const fs = require('fs');

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

    //   const photoPromises = nearbyRestaurants.map(restaurant => {
    //     if (restaurant.photoReference) {
    //       const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photoReference}&key=${process.env.API_KEY}`;
    //       return axios.get(photoUrl);
    //       .then(photoResponse => {
    //         restaurant.photoUrl = photoResponse.request.res.responseUrl;
    //       })
    //     .catch(error => {
    //       console.log(`Error fetching photo for ${restaurant.name}: ${error.message}`);
    //     });
    // }
    //   })

    // // function to encode file data to base64 encoded string
    // function base64_encode(file) {
    //     // read binary data
    //     var bitmap = fs.readFileSync(file);
    //     // convert binary data to base64 encoded string
    //     return new Buffer(bitmap).toString('base64');
    // }

    //     // function to create file from base64 encoded string
    // function base64_decode(base64str, file) {
    //   // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    //  var bitmap = new Buffer(base64str, 'base64');
    //  // write buffer to file
    //  fs.writeFileSync(file, bitmap);
    //  console.log('******** File created from base64 encoded string ********');
    // }


      .then(placeDetailsResponses => {
        // console.log(placeDetailsResponses);
        const photos = [];
        const encoded = [];
        const requests = [];

        placeDetailsResponses.forEach(async place => {
          let ref = place.photoReference;
          if (ref) {
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${process.env.API_KEY}`;
            // let photo = await axios.get(photoUrl, {
            //   responseType: 'arraybuffer',
            // });
            // const photoData = Buffer.from(photo.data, 'binary').toString('base64');
            // // console.log(photo.data);
            // photos.push(photoData);
            // place.base_64_photo = photoData;
            // console.log(photoData);
            // res.send(photoData);

            requests.push(
              axios.get(photoUrl, {
                responseType: 'arraybuffer',
              })
            );
          }
          // photos.forEach(file => {
          //   let bitmap = fs.readFileSync(file);
          //   encoded.push (new Buffer(bitmap).toString('base64'));
          // });

          // res.json(photos[0]);

          
          
        });

        Promise.all(requests)
          .then((responseArray) => {
            console.log('Promises plural resolved');
            // console.log(responseArray);

            responseArray.forEach((response, index) => {
              const photo = Buffer.from(response.data, 'binary').toString('base64');
              // photos.push(photo);
              console.log(photo);
              placeDetailsResponses[index].photoBase64 = photo;
            });
            // res.json({message: 'end'});
            res.status(200).json({ placeDetailsResponses });
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