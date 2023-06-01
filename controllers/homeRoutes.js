const { Result, User } = require('../models');
const sequelize = require('../config/connection')

const router = require('express').Router();
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const projectData = await Result.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const projects = projectData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      projects,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
