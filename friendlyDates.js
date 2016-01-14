function friendly(arr) {
  // create date types
  var firstDate = new Date(arr[0]);
  var secondDate = new Date(arr[1]);

  if (sameDate(firstDate, secondDate)) {
    return [fullInfo(firstDate)];
  }
  else if (sameMonthYear(firstDate, secondDate)) {
    return [noYear(firstDate), noMonthYear(secondDate)];
  }
  else if (sameYear(firstDate, secondDate) || yearInferrable(firstDate, secondDate)) {
    return [noYear(firstDate), noYear(secondDate)];
  }
  else {
    return [fullInfo(firstDate), fullInfo(secondDate)];
  }
}

function noMonthYear(date) {
  return intToDate(date.getUTCDate());
}

function sameMonthYear(firstDate, secondDate) {
  var noYearDiff = (firstDate.getUTCFullYear() - secondDate.getUTCFullYear()) == 0;
  var noMonthDiff = (firstDate.getUTCMonth() - secondDate.getUTCMonth()) == 0;

  return noMonthDiff && noYearDiff;
}

function yearInferrable(firstDate, secondDate) {
  var oneYearDiff = (secondDate.getUTCFullYear() - firstDate.getUTCFullYear()) == 1;
  var secondMonthFirst = (firstDate.getUTCMonth() - secondDate.getUTCMonth()) > 0;
  var secondDateFirst = (secondDate.getUTCDate() - firstDate.getUTCDate()) > 0;

  return oneYearDiff && (secondMonthFirst || secondDateFirst);
}

function copy(date) {
  return new Date(date.toUTCString());
}

function noYear(date) {
  return fullInfo(date).replace(/, \d{4}$/,'');
}

function sameYear(firstDate, secondDate) {
  var yearDiff = firstDate.getUTCFullYear() - secondDate.getUTCFullYear();
  return yearDiff == 0;
}

function sameDate(firstDate, secondDate) {
  return (firstDate - secondDate) == 0;
}

function fullInfo(date) {
  var year = date.getUTCFullYear();
  var month = intToMonth(date.getUTCMonth());
  var date = intToDate(date.getUTCDate());

  return addCommas([month, date, year].join(' '));
}

function addCommas(date) {
  var commasIn = date.replace('rd ', 'rd, ');
  commasIn = commasIn.replace('th ', 'th, ');
  commasIn = commasIn.replace('st ', 'st, ');
  return commasIn;
}

function intToMonth(monthNum) {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'];

  return months[monthNum];
}

function intToDate(dateNum) {
  var suffix = '';

  if (Math.floor(dateNum / 10) === 1) {
    return String(dateNum) + 'th';
  }

  var dateNumAsString = String(dateNum);

  var mathInfo = dateNumAsString.match(/\d$/);

  switch (mathInfo[0]) {
    case '1':
      suffix = 'st';
      break;
    case '2':
      suffix = 'nd';
      break;
    case '3':
      suffix = 'rd';
      break;
    default:
      suffix = 'th';
  }

  return dateNumAsString + suffix;
}
