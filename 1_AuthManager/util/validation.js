function isValidEmail(value) {
  return value && value.includes("@");
}

exports.isValidEmail = isValidEmail;
