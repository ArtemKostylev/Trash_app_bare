import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import rootReducer from './src/Scripts/reducer';
import {applyMiddleware, createStore} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';

import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {composeWithDevTools} from 'redux-devtools-extension';

import Navigator from './src/Components/Navigator';
import SplashScreen from './src/Screens/SplashScreen';
export const baseURL = 'http://134.0.117.159';

console.disableYellowBox = true;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['isLoading', 'loading', 'region', 'status'],
};

const middlewareConfig = {
  interceptors: {
    request: [
      {
        success: function({getState, dispatch, getSourceAction}, req) {
          console.log(req);
          return req;
        },
      },
    ],
  },
};
const client = axios.create({
  baseURL: baseURL,
  responseType: 'json',
});

const __axiosMiddleware = axiosMiddleware(client, middlewareConfig);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(__axiosMiddleware)),
);

const persistor = persistStore(store);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={SplashScreen} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}
