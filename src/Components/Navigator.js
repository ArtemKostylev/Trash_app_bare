import React, {Component} from 'react';

import News from '../Screens/News';
import Profile from '../Screens/Profile';
import Login from '../Screens/Login';
import SplashScreen from '../Screens/SplashScreen';
import CardFull from '../Screens/CardFull';
import MapComponent from '../Screens/Map';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

//TODO Add icons and text to tabs
class Navigator extends Component {
  render() {
    return (
      <NavigationContainer>
        {this.props.isLoading === true ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : this.props.token === '' ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <Stack.Screen name="Home" component={Home} />
        )}
      </NavigationContainer>
    );
  }
}

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Map"
        component={MapComponent}
        options={{
          tabBarLabel: 'Карта',
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Navigator;
