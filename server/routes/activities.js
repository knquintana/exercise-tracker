const router = require('express').Router();
let Activity = require('../models/activity.model');

router.route('/').get((req, res) => {
  Activity.find()
      .then(activities => res.json(activities))
      .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/').post((req, res) => {
  const name = req.body.name;
  const metabolicEquivalent = req.body.metabolicEquivalent;

  const newActivity = new Activity({
    name,
    metabolicEquivalent,
  });

  newActivity.save()
         .then(() => res.json('Activity added!'))
         .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
