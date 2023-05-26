const router = require('express').Router();
const userRoutes = require('./userRoutes');
const geolocation = require('./googleroutes');

router.use('/users', userRoutes);

module.exports = router;
