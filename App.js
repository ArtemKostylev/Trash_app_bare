import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import rootReducer from './src/Scripts/reducer';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';

import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {composeWithDevTools} from 'redux-devtools-extension';

import Navigator from './src/Components/Navigator';
export const baseURL = 'http://192.168.3.7:8000';

console.disableYellowBox = true; // TODO  Warning supression remove

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['isLoading', 'loading', 'region', 'status'], //TODO clear posts on prod
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
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}
