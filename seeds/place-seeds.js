const { Place } = require('../models');
const placeData = [
    {
        "name": "Wingstop",
        "address": "10619 Valley Boulevard, El Monte",
        "rating": 3.7,
        "photoReference": "AZose0mdRmPWKz71LTeoiPEzrbxp9_XLujhBL_CoUjcmkVbNr1j6EWkJAgwjzsNELX-F1jh_v2CdItLRUnvEJccv0AEuoZ6wQ758JmaN0T9cMFtcfWld6EWOOQTYXtALh1WlYemQLNmddbcvIV4RR-F96ADWmXi6awbMoV36LnfQYNDKse9y"
    },
];

const seedPlaces = () => Place.bulkCreate(placeData);

module.exports = seedPlaces;