import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {toggleLoading} from '../Scripts/reducer';
import {restoreUserToken, tokenWrapper} from '../Scripts/reducer';
import {connect} from 'react-redux';

import Ping from 'react-native-ping';

class SplashScreen extends Component {
  // Debug config
  // TODO change to prod config on testing

  async connection_test() {
    //TODO use on prod
    /* try {
      const ms = await Ping.start(baseURL, {timeout: 2000});
      console.log(ms);
      return true;
    } catch (error) {
      console.log('special code', error.code, error.message);
      this.props.error = true;
      return false;
    } */
    return true;
  }

  async componentDidMount() {
    try {
      const server_active = await this.connection_test();
      if (server_active === false) {
        //error
      } else {
        if (this.props.token !== null) {
          this.props.toggleLoading(false);
        } else {
          this.props.toggleLoading(false);
        }
      }
    } catch (e) {
      console.log('Error while restoring user token: ', e);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../Assets/waste.png')} style={styles.image} />
        <Text style={styles.header}>Мусору.нет</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = {
  toggleLoading: toggleLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreen);

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
