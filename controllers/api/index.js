const router = require('express').Router();
const userRoutes = require('./userRoutes');

const geolocation = require('./googleroutes');

const commentRoutes = require('./commentRoutes');
const placeRoutes = require('./placeRoutes')

router.use('/place', placeRoutes);
router.use('/google', geolocation)
router.use('/users', userRoutes);

// router.use('/reviews', );

router.use('/comments', commentRoutes);


module.exports = router;
