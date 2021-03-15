function calculateTotalCalorieBurn(birthday, durationInMinutes, gender, heightInInches, metabolicEquivalent, weightInPounds) {
  const ageInYears = ageFromBirthday(birthday);
  const basalMetabolicRate = calculateBasalMetabolicRate(ageInYears, gender, heightInInches, weightInPounds);
  return Math.round((basalMetabolicRate / 24) * metabolicEquivalent * (durationInMinutes / 60));
}

function calculateActiveCalorieBurn(birthday, durationInMinutes, gender, heightInInches, totalCalories, weightInPounds) {
  const ageInYears = ageFromBirthday(birthday);
  const basalMetabolicRate = calculateBasalMetabolicRate(ageInYears, gender, heightInInches, weightInPounds);
  const restingMetabolicRateCalorieBurn = calculateRestingMetabolicRateCalorieBurn(basalMetabolicRate, durationInMinutes);
  return Math.round(totalCalories - restingMetabolicRateCalorieBurn);
}
 
function calculateBasalMetabolicRate(ageInYears, gender, heightInInches, weightInPounds) {
  if (gender === "Female") {
    return 655 + (4.35 * weightInPounds) + (4.7 * heightInInches) - (4.7 * ageInYears);
  } else if (gender === "Male") {
    return 66 + (6.23 * weightInPounds) + (12.7 * heightInInches) - (6.76 * ageInYears);
  }
}

function calculateRestingMetabolicRateCalorieBurn(basalMetabolicRate, durationInMinutes) {
  return ((basalMetabolicRate * 1.1) / 24) * (durationInMinutes / 60)
}

function ageFromBirthday(birthday) {
  var diff_ms = Date.now() - birthday.getTime();
  var age_dt = new Date(diff_ms); 

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

// based on https://muffinman.io/blog/javascript-time-ago-function/
function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
  let options = {}
  if (prefomattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return `${ prefomattedDate } at ${date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})}`;
  }

  if (hideYear) {
    options = { 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true,
    };
    // January 10 10:20 AM
    return date.toLocaleString('en-US', options)
  }

  // January 10 2017 10:20 AM
  options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric',
    hour12: true,
  };
  return date.toLocaleString('en-US', options)
}

function timeAgo(dateParam) {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();


  if (seconds < 5) {
    return 'now';
  } else if (seconds < 60) {
    return `${ seconds } seconds ago`;
  } else if (seconds < 90) {
    return 'about a minute ago';
  } else if (minutes < 60) {
    return `${ minutes } minutes ago`;
  } else if (isToday) {
    return getFormattedDate(date, 'Today');
  } else if (isYesterday) {
    return getFormattedDate(date, 'Yesterday');
  } else if (isThisYear) {
    return getFormattedDate(date, false, true);
  }

  return getFormattedDate(date);
}

module.exports = {
  calculateActiveCalorieBurn,
  calculateTotalCalorieBurn,
  timeAgo
};
