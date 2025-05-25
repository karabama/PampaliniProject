export function isValidPhone(phone) {
  return /^09\d{9}$/.test(phone);
}

export function isValidNationalCode(code) {
  return /^\d{10}$/.test(code);
}

export function isValidPassword(password) {
  return password.length >= 6;
}
