import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {TouchableNativeFeedback} from 'react-native';
import KeyboardShift from '../Components/KeyboardShift';
import {fetchToken, signIn} from '../Scripts/reducer';
import {connect} from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.auth = this.auth.bind(this);
  }

  state = {
    phone_number: '',
    password: '',
    passwordFocused: false,
    usernameFocused: false,
  };

  async auth() {
    console.log('auth started');
    await this.props.fetchToken(
      this.state.phone_number.trim(),
      this.state.password.trim(),
    );
    if (this.props.status === 200) {
      this.props.signIn();
      //this.props.getUserData(this.state.phone_number.trim());
      this.props.navigation.navigate('app');
    } else {
      Alert.alert('Ошибка', 'Неправильно введен логин или пароль');
    }
  }

  render() {
    let animation = (
      <View style={styles.animation_background}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );

    let login_screen = (
      <View style={styles.main_container}>
        <View style={styles.text_container}>
          <Text style={styles.h1}>Добро пожаловать</Text>
          <Text style={styles.h2}>Пожалуйста, войдите в систему</Text>
        </View>
        <View style={styles.button_container}>
          <TextInput
            onChangeText={text => this.setState({phone_number: text})}
            onFocus={() => this.setState({usernameFocused: true})}
            onBlur={() => this.setState({usernameFocused: false})}
            value={this.state.phone_number}
            placeholder="Телефон"
            style={
              this.state.usernameFocused
                ? styles.text_input_focused
                : styles.text_input_unfocused
            }
          />
          <TextInput
            onChangeText={text => this.setState({password: text})}
            onFocus={() => this.setState({passwordFocused: true})}
            onBlur={() => this.setState({passwordFocused: false})}
            value={this.state.password}
            placeholder="Пароль"
            style={
              this.state.passwordFocused
                ? styles.text_input_focused
                : styles.text_input_unfocused
            }
          />
          <View style={styles.button}>
            <TouchableNativeFeedback onPress={() => this.auth()}>
              <Text style={styles.button_text}>Войти</Text>
            </TouchableNativeFeedback>
          </View>
          <Text style={styles.href}>Зарегистрироваться</Text>
        </View>
      </View>
    );

    let renderItems = null;
    switch (this.props.loading) {
      case true:
        renderItems = animation;
        break;
      case false:
        if (renderItems === login_screen) {
          renderItems = animation + login_screen;
        } else {
          renderItems = login_screen;
        }
        break;
      default:
        renderItems = login_screen;
        break;
    }
    return <KeyboardShift renderProp={renderItems} />;
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    loading: state.loading,
    error: state.error,
    status: state.status,
    user: state.user,
  };
};

const mapDispatchToProps = {
  fetchToken: fetchToken,
  signIn: signIn,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

//change href text color
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 3,
  },
  text_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  h1: {
    fontFamily: 'rubik-light',
    fontSize: 30,
  },
  h2: {
    fontFamily: 'rubik-light',
    fontSize: 16,
  },
  button_container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  href: {
    color: 'gray',
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    marginTop: 20,
  },
  button: {
    height: 30,
    marginTop: 10,
    alignItems: 'center',
  },
  button_text: {
    fontSize: 20,
    fontFamily: 'rubik-light',
  },
  animation_background: {
    backgroundColor: 'rgba(0,0,0, 0.5)',
    opacity: 60,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    justifyContent: 'center',
  },
  text_input_unfocused: {
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
  text_input_focused: {
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
});