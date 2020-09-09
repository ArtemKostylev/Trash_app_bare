import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../Assets/waste.png')} style={styles.image} />
        <Text style={styles.header}>Мусору.нет</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 30,
    height: 200,
    width: 200,
  },
  header: {
    fontFamily: 'rubik-light',
    marginTop: 30,
    fontSize: 30,
  },
});
