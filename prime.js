function isPrime(value) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new TypeError("Input must be a positive integer");
  }

  if (value === 1) {
    return false;
  }

  if (value === 2) {
    return true;
  }

  if (value % 2 === 0) {
    return false;
  }

  const limit = Math.floor(Math.sqrt(value));
  for (let i = 3; i <= limit; i += 2) {
    if (value % i === 0) {
      return false;
    }
  }

  return true;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { isPrime };
}
