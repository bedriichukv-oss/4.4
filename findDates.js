function findDates(input) {
  if (typeof input !== "string") {
    throw new TypeError("Input must be a string");
  }

  const datePattern = /\b(0?[1-9]|1[0-2])([/-])(0?[1-9]|[12][0-9]|3[01])\2(\d{2}|\d{4})\b/g;
  return input.match(datePattern) || [];
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { findDates };
}
