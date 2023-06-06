const router = require('express').Router();
const { Comment, User } = require('../models');
const withAuth = require('../utils/auth');



router.get('/', async (req, res) => {
  
    res.render('homepage', {
     
      logged_in: req.session.logged_in
    });
 
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/results', (req, res) => {
  const data = JSON.parse(atob(req.query.data));
  res.render('searched', { data });
});

module.exports = router;
