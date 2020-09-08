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
import {connect} from 'react-redux';
import AddNew from '../Screens/AddNew';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const NwStack = createStackNavigator();

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'AddNew') {
            iconName = focused ? 'add-outline' : 'add';
          }
          return <Ionicons name={iconName} color={color} size={size} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'forestgreen',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 15,
          fontFamily: 'rubik',
          fontWeight: 'bold',
        },
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="News"
        component={NwScreen}
        options={{
          tabBarLabel: 'Новости',
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapComponent}
        options={{
          tabBarLabel: 'Карта',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Профиль',
        }}
      />
      <Tab.Screen
        name="AddNew"
        component={AddNew}
        options={{tabBarLabel: 'Добавить'}}
      />
    </Tab.Navigator>
  );
}

function NwScreen() {
  return (
    <>
      <NwStack.Screen name="List" component={News} />
      <NwStack.Screen name="Single" component={CardFull} />
    </>
  );
}

//TODO Add icons and text to tabs
class MyNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.props.isLoading === true ? (
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
          ) : !this.props.loggedIn ? (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.idLoading,
    loggedIn: state.loggedIn,
  };
};

export default connect(
  mapStateToProps,
  null,
)(MyNavigator);
