const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/').post((req, res) => {
  const username = req.body.username;
  const height = Number(req.body.height);
  const weight = Number(req.body.weight);
  const birthday = Date.parse(req.body.birthday);
  const gender = req.body.gender;

  console.log(req.body.birthday);

  const newUser = new User({
    username,
    height,
    weight,
    birthday,
    gender,
  });

  newUser.save()
         .then(() => res.json('User added!'))
         .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
