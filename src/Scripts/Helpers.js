import {TOKEN_REFRESH_EXPIRATION_TIME} from './Constants';

export const tokenExpired = date => {
  if (date <= Date.now()) {
    return true;
  } else {
    return false;
  }
};

export const tokenRefreshExpired = date => {
  date = parseInt(date) + TOKEN_REFRESH_EXPIRATION_TIME;
  if (date <= Date.now()) {
    return true;
  } else {
    return false;
  }
};
