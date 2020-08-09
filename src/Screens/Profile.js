import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import Header from '../Components/Header.js';

// class to store user data
export class User {
  //add relevant fields
  constructor(name, last_name, phone_number, city, avatar) {
    this.name = name;
    this.last_name = last_name;
    this.phone_number = phone_number;
    this.city = city;
    this.avatar = avatar;
  }
}

export class InputField extends Component {
  render() {
    return (
      <View>
        <Text style={this.props.title_style}>{this.props.title}</Text>
        <TextInput
          clearButtonMode="while-editing"
          defaultValue={this.props.default_value}
          placeholder={this.props.placeholder}
          style={this.props.input_style}
        />
        <View style={styles.divider} />
      </View>
    );
  }
}

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {edit: false, saving: false};
  }

  current_user = test_user; //getCurrentUser();

  save() {
    this.setState({saving: true});
    console.log('upload button pressed');
    this.setState({edit: false});
    this.setState({saving: false});
    //upload data on server && show alert with save result && add callback with state change
  }

  changePassword() {
    console.log('pwd button pressed');
    //show change password modal component
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigator={this.props.navigation}
          renderEdit={true}
          title="Профиль"
          edit={() => this.edit()}
        />
        <View style={styles.info}>
          <InputField
            default_value={this.current_user.name}
            title="Имя"
            placeholder="Введите ваше имя"
            input_style={styles.input_style}
            title_style={styles.input_title}
          />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  info: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  infoField: {
    fontFamily: 'rubik-light',
    fontSize: 18,
  },
  input_style: {
    fontFamily: 'rubik-light',
    fontSize: 20,
  },
  input_title: {
    color: 'gray',
    fontSize: 18,
  },
  pwdButton: {
    alignSelf: 'stretch',
    marginHorizontal: 40,
    marginVertical: 40,
  },
  pwdButtonText: {
    fontFamily: 'rubik-medium',
    fontSize: 20,
  },
  divider: {
    backgroundColor: 'black',
    height: 2,
  },
});

var test_user = new User(
  'Кама',
  'Пуля',
  '+79115248876',
  'Махачкала',
  'https://9slim.com/wp-content/uploads/2017/1medium',
);
