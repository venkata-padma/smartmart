const AUTH_KEY = 'smartmart_auth';
const USER_KEY = 'smartmart_user';

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

// The signed-in identity, e.g. { name, email }. `name` is only known if the
// person signed up (or previously edited their profile) through this app —
// logging in only ever supplies an email, so `name` may be absent.
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}

// Friendly fallback display name derived from an email's local-part, used
// whenever we only know someone's email (e.g. they logged in without ever
// signing up through this app, so no real name was ever captured).
export function displayNameFromEmail(email) {
  const local = (email || '').split('@')[0] || '';
  const words = local
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1));
  return words.join(' ') || 'Shopper';
}
