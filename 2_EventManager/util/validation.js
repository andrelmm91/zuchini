const dateCheck = require("date-and-time");

function isValidText(value) {
  return value && value.trim().length > 0;
}

function isValidDate(value) {
  const date = new Date(value);
  return value && date !== "Invalid Date";
}

function isValidImageUrl(value) {
  return value && value.startsWith("http");
}

function isValidNumber(value) {
  return value && !isNaN(value);
}

function isValidTime(value) {
  const status = dateCheck.isValid(value, "HH:mm");
  return value && status;
}

exports.isValidText = isValidText;
exports.isValidDate = isValidDate;
exports.isValidImageUrl = isValidImageUrl;
exports.isValidNumber = isValidNumber;
exports.isValidTime = isValidTime;
