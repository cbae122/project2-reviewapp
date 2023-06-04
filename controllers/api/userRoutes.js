const router = require('express').Router();
const { User, Place, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  // Access our User model and run .findAll() method
  try {
    const userData =  await User.findAll({
      attributes: { exclude: ['password'] }
  })
  res.status(200).json(userData);
  } catch(err) {
    res.status(400).json(err);
  }
  
});
router.get('/:id', async (req, res) => {
  try {
    const userData =  await User.findOne({
      attributes: { exclude: ['password']},
      where: {
        id: req.params.id
      },
      include: [
          {
            model: Place,
            attributes: ['id', 'name', 'address', 'rating', 'created_at', 'img']
          },
          {
              model: Comment,
              attributes: ['id', 'comment_text', 'created_at'],
              // include: {
              //   model: Place,
              //   attributes: ['title']
              // }
          }
        ]

  })
  res.status(200).json(userData);
  }

  catch(err) {
    res.status(400).json(err);
  }
});
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password});

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
     
      req.session.logged_in = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

router.put('/:id', withAuth, (req, res) => {
  User.update(req.body, {
      individualHooks: true,
      where: {
          id: req.params.id
    }
  })
    .then(userData => {
      if (!userData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
