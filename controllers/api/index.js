const router = require('express').Router();
const userRoutes = require('./userRoutes');
const geolocation = require('./googleroutes');

router.use('/google', geolocation)
router.use('/users', userRoutes);
// router.use('/reviews', );
module.exports = router;
