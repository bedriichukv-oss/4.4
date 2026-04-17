function validatePassword(password) {
  if (typeof password !== "string") {
    throw new TypeError("Password must be a string");
  }

  const errors = [];

  if (password.length < 12) {
    errors.push("Password must be at least 12 characters long");
  }

  if (password.length > 128) {
    errors.push("Password must be at most 128 characters long");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must include at least one lowercase letter");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must include at least one uppercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must include at least one number");
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("Password must include at least one special character");
  }

  if (/\s/.test(password)) {
    errors.push("Password must not contain whitespace");
  }

  if (/(.)\1{2,}/.test(password)) {
    errors.push("Password must not contain 3 or more repeated characters in a row");
  }

  const lower = password.toLowerCase();
  const weakPatterns = ["password", "qwerty", "letmein", "123456", "admin"];
  if (weakPatterns.some((pattern) => lower.includes(pattern))) {
    errors.push("Password contains a common weak pattern");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { validatePassword };
}
