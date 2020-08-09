import React, {Component} from 'react';
import {
  TouchableNativeFeedback,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {signOut} from '../Scripts/reducer';
import {connect} from 'react-redux';

//TODO rework into searchbar
class Header extends Component {
  async logout() {
    await AsyncStorage.removeItem('userToken');
    this.props.signOut();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <TouchableNativeFeedback onPress={this.logout.bind(this)} useForeground>
          <Image
            source={{uri: 'https://cdn.onlinewebfonts.com/svg/img_376300.png'}}
            style={styles.icon}
          />
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const mapDispatchToProps = {
  signOut,
};

export default connect(
  null,
  mapDispatchToProps,
)(Header);

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    margin: 16,
  },
  container: {
    flexDirection: 'row',
    flexShrink: 0,
    alignSelf: 'stretch',
    height: 56,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 3,
  },
  title: {
    fontFamily: 'rubik-light',
    fontSize: 20,
    flex: 1,
    alignSelf: 'center',
  },
});
