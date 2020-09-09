import React, {Component} from 'react';

import Profile from '../Screens/Profile';
import Login from '../Screens/Login';
import MapComponent from '../Screens/Map';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';
import AddNew from '../Screens/AddNew';
import Register from '../Screens/Register';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const AuthStack = createStackNavigator();

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
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Профиль',
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
        name="AddNew"
        component={AddNew}
        options={{tabBarLabel: 'Добавить'}}
      />
    </Tab.Navigator>
  );
}

function Auth() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}

class MyNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {!this.props.loggedIn ? (
            <Stack.Screen
              name="Auth"
              component={Auth}
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
