const router = require('express').Router();
const userRoutes = require('./userRoutes');

const geolocation = require('./googleroutes');

const commentRoutes = require('./commentRoutes');



router.use('/google', geolocation);
router.use('/users', userRoutes);

// router.use('/reviews', );

router.use('/comments', commentRoutes);


module.exports = router;
