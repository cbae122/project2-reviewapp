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
        'created_at'

      ],
      order: [['created_at', 'DESC']],
      include: [
        // Comment model here -- attached username to comment
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'place_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
                
      ]
    });
    res.status(200).json(placeData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

});

router.post('/', (req, res) => {
  try {
    const placeData = Place.create({
      name: req.body.name,
      address: req.body.address,
      rating: req.body.rating
    });
    res.status(200).json(placeData);
  } catch (err) {
    res.status(400).json(err);
  }

});

module.exports = router;    