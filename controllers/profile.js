const router = require('express').Router();
const { Place, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

router.get('/', withAuth, async (req, res) => {
    try {
      const placeData = await Place.findAll({
        where: {
          // use the ID from the session
          user_id: req.session.user_id
        },
        attributes: [
          'id',
          'name',
          'address',
          // 'img',
          'rating',
          'created_at',
         
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'place_id', 'user_id', 'created_at'],
        // //     include: {
        // //       model: User,
        // //       attributes: ['username']
        // //     }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
      const places = placeData.map((place) => place.get({ plain: true }));
      

      res.render('profile', {
        places,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(400).json(err);
    }
    
    });
    
    router.get('/place/:id', (req, res) => {
      Place.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'id',
          'name',
          'created_at',
          'address',
          'rating'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'place_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          // {
          //   model: User,
          //   attributes: ['username']
          // }
        ]
      })
        .then(dbPostData => {
          if (!dbPostData) {
            res.status(404).json({ message: 'No place found with this id' });
            return;
          }
    
          // serialize the data
          const place = dbPostData.get({ plain: true });
    
          // pass data to template
          res.render('single-place', {
              place,
              logged_in: req.session.logged_in
            });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
  });
    

    module.exports = router;