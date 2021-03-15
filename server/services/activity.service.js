let Activity = require('../models/activity.model');

let getActivityByName = async (name) => {
  const activity = await Activity.findOne({
    name: name,
  });

  if (!activity) {
    throw new Error(`Activity '${name}' not found.`);
  } else {
    return activity;
  }
};

module.exports = {
  getActivityByName: getActivityByName,
}