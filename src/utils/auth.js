const AUTH_KEY = 'smartmart_auth';

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function setAuthenticated(value) {
  if (value) {
    localStorage.setItem(AUTH_KEY, 'true');
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
}
