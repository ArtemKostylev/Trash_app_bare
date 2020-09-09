// Root reducer. Consists of 3 parts: action definitions, reducer itself, action functions

import {tokenExpired, tokenRefreshExpired} from '../Scripts/Helpers';
import AsyncStorage from '@react-native-community/async-storage'
// Action definitions
// Async api calls
// User actions
const GET_USER_TOKEN = 'GET_USER_TOKEN';
const GET_USER_TOKEN_SUCCESS = 'GET_USER_TOKEN_SUCCESS';
const GET_USER_TOKEN_FAIL = 'GET_USER_TOKEN_FAIL';

const GET_USER_DATA = 'GET_USER_DATA';
const GET_USER_DATA_SCCESS = 'GET_USER_DATA_SCCESS';
const GET_USER_DATA_FAIL = 'GET_USER_DATA_FAIL';

const FETCH_POSTS = 'FETCH_POSTS';
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL';

const REFRESH_USER_TOKEN = 'REFRESH_USER_TOKEN';
const REFRESH_USER_TOKEN_SUCCESS = 'REFRESH_USER_TOKEN_SUCCESS';
const REFRESH_USER_TOKEN_FAIL = 'REFRESH_USER_TOKEN_FAIL';

const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
const UPDATE_USER_DATA_FAIL = 'UPDATE_USER_DATA_FAIL';
const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS';

const CREATE_USER = 'CREATE_USER';
const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
const CREATE_USER_FAIL = 'CREATE_USER_FAIL';

const DELETE_POST = 'CREATE_POST';
const DELETE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
const DELETE_POST_FAIL = 'CREATE_POST_FAIL';

// Sync actions
const USER_SIGN_IN = 'USER_SIGN_IN';
const USER_SIGN_OUT = 'USER_SIGN_OUT';
const CLEAR_TOKEN = 'CLEAR_TOKEN';
const TOGGLE_LOADING = 'TOGGLE_LOADING';
const RESTORE_POSTS = 'RESTORE_POSTS';

// Initial state
const initial_state = {
  loading: false,
  isLoading: false,
  token: null,
  loggedIn: false,
  user: {},
  status: null,
  posts: [],
  error: null,
  region: {
    latitude: 64.542931,
    longitude: 40.537113,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  },
};

// Reducer
export default function rootReducer(state = initial_state, action) {
  switch (action.type) {
    // sync api calls
    case GET_USER_TOKEN:
      return {...state, loading: true};
    case GET_USER_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.data.token,
        status: action.payload.status,
      };
    case GET_USER_TOKEN_FAIL:
      return {
        ...state,
        loading: false,
        status: 0,
        error: 'Error while requesting auth token',
      };

    case GET_USER_DATA:
      return {...state};
    case GET_USER_DATA_SCCESS:
      return {...state, user: action.payload.data};
    case GET_USER_DATA_FAIL:
      return {...state, error: 'Error while getting user data'};

    case FETCH_POSTS:
      return {...state, loading: true};
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        posts: action.payload.data,
      };
    case FETCH_POSTS_FAIL:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        error: 'Error while updating user data',
      };

    case REFRESH_USER_TOKEN:
      return {...state, loading: true};
    case REFRESH_USER_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: {signature: action.payload.data.token, received: Date.now()},
      };
    case REFRESH_USER_TOKEN_FAIL:
      return {...state, loading: false, error: 'errorText'};
    // sync actions

    case UPDATE_USER_DATA:
      return {...state, loading: true};
    case UPDATE_USER_DATA_SUCCESS:
      return {...state, user: action.payload.data};
    case UPDATE_USER_DATA_FAIL:
      return {...state, error: 'Error while updating user data'};

    case DELETE_POST:
      return {...state, loading: true};
    case DELETE_POST_SUCCESS:
      return {...state, loading: false, status: action.payload.status};
    case DELETE_POST_FAIL:
      return {...state, loading: false, status: 0, error: action.error};

    case CREATE_USER:
      return {...state, loading: true};
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data.user,
        token: action.payload.data.token,
        loggedIn: true,
      };
    case CREATE_USER_FAIL:
      return {...state, loading: true, error: action.payload.error};
    case USER_SIGN_IN:
      return {...state, loggedIn: true};
    case USER_SIGN_OUT: {
      AsyncStorage.removeItem('persist:root');
      return {...state, loggedIn: false};
    }
    case RESTORE_POSTS:
      return {...state, posts: action.posts};
    case TOGGLE_LOADING:
      return {...state, isLoading: action.loading};
    case CLEAR_TOKEN:
      return {...state, token: initial_state.token, signedIn: false};
    // default action
    default:
      return state;
  }
}

//async api calls

//user actions
export function getToken() {
  return {
    type: 'GET_USER_TOKEN',
  };
}

export function fetchToken(phone_number, password) {
  return {
    types: ['GET_USER_TOKEN', 'GET_USER_TOKEN_SUCCESS', 'GET_USER_TOKEN_FAIL'],
    payload: {
      request: {
        method: 'post',
        url: '/api/obtain-auth-token/',
        data: {
          phone_number: phone_number,
          password: password,
        },
      },
    },
  };
}

export function toggleLoading(loading) {
  return {
    type: 'TOGGLE_LOADING',
    loading: loading,
  };
}

export function refreshToken(token) {
  return {
    types: [
      'REFRESH_USER_TOKEN',
      'REFRESH_USER_TOKEN_SUCCESS',
      'REFRESH_USER_TOKEN_FAIL',
    ],
    payload: {
      request: {
        method: 'post',
        url: '/api/refresh-auth-token/',
        data: {
          token: token,
        },
      },
    },
  };
}

export function getUserData(token, pk) {
  return {
    types: ['GET_USER_DATA', 'GET_USER_DATA_SCCESS', 'GET_USER_DATA_FAIL'],
    payload: {
      request: {
        method: 'get',
        url: '/api/user/',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          pk: pk,
        },
      },
    },
  };
}

export function saveUserData(token, user) {
  return {
    types: ['SAVE_USER_DATA', 'SAVE_USER_DATA_SCCESS', 'SAVE_USER_DATA_FAIL'],
    payload: {
      request: {
        method: 'put',
        url: '/api/user/',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ...user,
        },
      },
    },
  };
}

export function fetchPosts(token) {
  return {
    types: ['FETCH_POSTS', 'FETCH_POSTS_SUCCESS', 'FETCH_POSTS_FAIL'],
    payload: {
      request: {
        method: 'get',
        url: '/api/post/',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  };
}

export function getPostsFromCache(posts) {
  return {
    type: 'RESTORE_POSTS',
    posts: posts,
  };
}

//sync actions
export function signOut() {
  return {type: 'USER_SIGN_OUT'};
}

export function signIn() {
  console.log('sign in');
  return {type: 'USER_SIGN_IN'};
}

export function clearToken() {
  return {
    type: 'CLEAR_TOKEN',
  };
}

//async actions

export function tokenWrapper(action, params, token) {
  return async function(dispatch, getState) {
    if (token === null) {
      token = getState().token;
    }
    var date = token.received;

    if (tokenRefreshExpired(date)) {
      return AsyncStorage.removeItem('JWTToken').then(() => {
        dispatch(clearToken());
        return new Promise(function(resolve, reject) {
          resolve(false);
        });
      });
    }

    if (tokenExpired(date)) {
      console.log(action);
      await dispatch(refreshToken(token.signature));
      await dispatch(action([...params]));
      return Promise.resolve(true);
    }

    dispatch(action([...params]));
    return Promise.resolve(true);
  };
}

export function deletePost(token, id) {
  return {
    types: ['DELETE_POST', 'DELETE_POST_SUCCESS', 'DELETE_POST_FAIL'],
    payload: {
      request: {
        method: 'delete',
        url: '/api/post/',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          pk: id,
        },
      },
    },
  };
}

export function register(data) {
  return {
    types: ['CREATE_USER', 'CREATE_USER_SUCCESS', 'CREATE_USER_FAIL'],
    payload: {
      request: {
        method: 'post',
        url: '/api/create-user/',
        data: {
          phone_number: data.username,
          password: data.password,
          first_name: data.name,
          last_name: data.surname,
        },
      },
    },
  };
}
