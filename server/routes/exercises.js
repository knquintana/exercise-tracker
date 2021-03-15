const ActivityService = require('../services/activity.service');
const UserService = require('../services/user.service');

const router = require('express').Router();
let Exercise = require('../models/exercise.model');

const {
  calculateTotalCalorieBurn,
  calculateActiveCalorieBurn,
} = require('../../src/helpers');

router.route('/').get((req, res) => {
  Exercise.find()
          .then(exercises => res.json(exercises))
          .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/').post(async (req, res) => {
  const username = req.body.username;
  const activityName = req.body.activityName;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  let user;
  let activity;
  try {
    user = await UserService.getUserByUsername(username);
    activity = await ActivityService.getActivityByName(activityName);
  } catch(err) {
    console.log(err);
    return res.status(500).json(`Error: ${err}`);
  }

  const totalCalories = calculateTotalCalorieBurn(
    user.birthday, duration, user.gender, user.height, activity.metabolicEquivalent, user.weight
  );
  const activeCalories = calculateActiveCalorieBurn(
    user.birthday, duration, user.gender, user.height, totalCalories, user.weight
  );

  const newExercise = new Exercise({
    username,
    activityName,
    duration,
    date,
    activeCalories,
    totalCalories
  });

  newExercise.save()
             .then(() => res.json('Exercise Added!'))
             .catch(err => res.status(400).json(`Error: ${err}`));

});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
          .then(exercise => res.json(exercise))
          .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
          .then(() => res.json('Exercise deleted.'))
          .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/:id').post(async (req, res) => {
  const username = req.body.username;
  const activityName = req.body.activityName;
  const duration = Number(req.body.duration);
  const date = Date(req.body.date);

  let user;
  let activity;
  try {
    user = await UserService.getUserByUsername(username);
    activity = await ActivityService.getActivityByName(activityName);
  } catch(err) {
    console.log(err);
    return res.status(500).json(`Error: ${err}`);
  }

  Exercise.findById(req.params.id)
          .then(exercise => {
            exercise.username = username;
            exercise.activityName = activityName;
            exercise.duration = duration;
            exercise.date = date;

            const totalCalories = calculateTotalCalorieBurn(
              user.birthday, duration, user.gender, user.height, activity.metabolicEquivalent, user.weight
            );
            const activeCalories = calculateActiveCalorieBurn(
              user.birthday, duration, user.gender, user.height, totalCalories, user.weight
            );

            exercise.totalCalories = totalCalories;
            exercise.activeCalories = activeCalories;

            exercise.save()
                    .then(() => res.json('Exercise updated!'))
                    .catch(err => res.status(400).json(`Error: ${err}`))
          })
          .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;
