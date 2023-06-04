const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const profileRoutes = require('./profile');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.use('/profile', profileRoutes);

module.exports = router;
