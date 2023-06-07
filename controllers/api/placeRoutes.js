const router = require('express').Router();
const { Place, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const placeData = await Place.findAll({
            attributes: [
                'id',
                'name',
                'address',
                'rating',
                // 'img',
                'created_at'

            ],
            // order: [['created_at', 'DESC']],
            // include: [
            //     // Comment model here -- attached username to comment
            //     {
            //         model: Comment,
            //         attributes: ['id', 'comment_text', 'place_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
            //     },
                
            // ]
        })
        res.status(200).json(placeData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }

});

router.post('/', async (req, res) => {
    try {
        const placeData = await Place.create({
            name: req.body.name,
            address: req.body.address,
            rating: req.body.rating,
            // img: req.body.img,
            user_id: req.session.user_id
            // img: req.body.rating
        });
        res.status(200).json(placeData);
    } catch (err) {
        res.status(400).json(err);
    }

});

router.get('/:id', (req, res) => {
    Place.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'name',
        'created_at',
        'address',
        'rating', 
        // 'img'
      ],
      include: [
        // include the Comment model here:
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'place_id', 'user_id', 'created_at'],
        //   include: {
        //     model: User,
        //     attributes: ['username']
        //   }
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', withAuth, (req, res) => {
    Place.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No place found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;    