import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class ErrorScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.error_message}>
          Отсутствует подключение к серверу
        </Text>
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
  error_message: {
    fontFamily: 'rubik-light',
    fontSize: 30,
  },
});
