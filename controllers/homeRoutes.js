const router = require('express').Router();
const { Comment, User } = require('../models');
const withAuth = require('../utils/auth');



router.get('/', async (req, res) => {
  // try {
  //   const projectData = await Comment.findAll({
  //     include: [
  //       {
  //         model: User,
  //         attributes: ['email'],
  //       },
  //     ],
  //   });
  //   const projects = projectData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      // projects,
      logged_in: req.session.logged_in
    });
  //  catch (err) {
  //   res.status(500).json(err);
  // }
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
