function validateEmail(email) {
  if (typeof email !== "string") {
    throw new TypeError("Email must be a string");
  }

  const normalizedEmail = email.trim();
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

  return emailPattern.test(normalizedEmail);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { validateEmail };
}
