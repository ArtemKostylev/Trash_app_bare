import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {register} from '../Scripts/reducer';
import KeyboardShift from '../Components/KeyboardShift';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import scorePassword from 'react-native-password-strength-meter/src/utils/score-password';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameFocused: false,
      passwordFocused: false,
      nameFocused: false,
      surnameFocused: false,
      passwordRepeatFocused: false,
      username: '',
      password: '',
      name: '',
      surname: '',
      password_repeat: '',
      errors: {
        username: false,
        name: false,
        surname: false,
        password: false,
      },
    };
  }

  checkPassword(password) {
    if (this.state.repeat_password !== password) {
      return false;
    }
    return true;
  }

  checkForm() {
    var errors = this.state.errors;
    if (this.state.username === '' || this.props.status === '304') {
      errors.username = true;
    } else {
      errors.username = false;
    }
    if (this.state.surname === '') {
      errors.surname = true;
    } else {
      errors.surname = false;
    }
    if (this.state.name === '') {
      errors.name = true;
    } else {
      errors.name = false;
    }
    if (
      this.state.password === '' ||
      this.state.passwordStrength < 10 ||
      this.state.password !== this.state.password_repeat
    ) {
      errors.password = true;
    } else {
      errors.password = false;
    }
    this.setState({errors});
    if (
      errors.username === true ||
      errors.surname === true ||
      errors.name === true ||
      errors.password === true
    ) {
      return false;
    }
    return true;
  }

  submit() {
    var data = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      surname: this.state.surname,
    };
    if (this.checkForm()) {
      this.props.register(data);
    }
  }

  renderItems() {
    var errorIcon = (
      <Ionicons
        name="alert-circle-outline"
        color="red"
        size={30}
        style={{position: 'absolute', left: 20, top: 40}}
      />
    );

    let animation = (
      <View style={styles.animation_background}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );

    var onChange = (password, score, {label, labelColor, activeBarColor}) => {
      console.log(password, score, {label, labelColor, activeBarColor});
    };

    var renderProp = (
      <>
        <Text style={styles.title}>Регистрация</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {this.state.errors.username ? errorIcon : <></>}
          <TextInput
            placeholder="Имя пользователя"
            textAlignVertical={'top'}
            onChangeText={text => this.setState({username: text})}
            onFocus={() => this.setState({usernameFocused: true})}
            onBlur={() => this.setState({usernameFocused: false})}
            style={
              this.state.usernameFocused
                ? styles.text_input_focused
                : styles.text_input_unfocused
            }
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {this.state.errors.password ? errorIcon : <></>}
          <TextInput
            placeholder="Пароль"
            textAlignVertical={'top'}
            secureTextEntry={true}
            onChangeText={text => {
              this.setState({
                password: text,
                passwordStrength: scorePassword(text, 1, 100),
              });
            }}
            onFocus={() => this.setState({passwordFocused: true})}
            onBlur={() => this.setState({passwordFocused: false})}
            style={
              this.state.passwordFocused
                ? styles.text_input_focused
                : styles.text_input_unfocused
            }
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {this.state.errors.password ? errorIcon : <></>}
          <TextInput
            placeholder="Введите пароль повторно"
            textAlignVertical={'top'}
            secureTextEntry={true}
            onChangeText={text => this.setState({password_repeat: text})}
            onFocus={() => this.setState({passwordRepeatFocused: true})}
            onBlur={() => this.setState({passwordRepeatFocused: false})}
            style={
              this.state.passwordRepeatFocused
                ? styles.text_input_focused
                : styles.text_input_unfocused
            }
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {this.state.errors.name ? errorIcon : <></>}
          <TextInput
            ref={ref => (this.description = ref)}
            placeholder="Имя"
            textAlignVertical={'top'}
            onChangeText={text => this.setState({name: text})}
            onFocus={() => this.setState({nameFocused: true})}
            onBlur={() => this.setState({nameFocused: false})}
            style={
              this.state.nameFocused
                ? styles.text_input_focused
                : styles.text_input_unfocused
            }
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {this.state.errors.surname ? errorIcon : <></>}
          <TextInput
            ref={ref => (this.description = ref)}
            placeholder="Фамилия"
            textAlignVertical={'top'}
            onChangeText={text => this.setState({surname: text})}
            onFocus={() => this.setState({surnameFocused: true})}
            onBlur={() => this.setState({surnameFocused: false})}
            style={
              this.state.surnameFocused
                ? styles.text_input_focused
                : styles.text_input_unfocused
            }
          />
        </View>
        <View style={{marginTop: 30, width: '40%'}}>
          <Button
            title={'Готово'}
            onPress={() => this.submit()}
            color={'forestgreen'}
          />
        </View>
      </>
    );

    return (
      <View style={styles.container}>
        {this.state.loading ? animation : renderProp}
      </View>
    );
  }

  render() {
    return <KeyboardShift renderProp={this.renderItems()} />;
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 30,
  },
  text_input_container: {
    minWidth: 300,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  text_input_unfocused: {
    width: '70%',
    marginTop: 30,
    fontSize: 20,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    backgroundColor: 'gainsboro',
  },
  text_input_focused: {
    width: '70%',
    marginTop: 30,
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'forestgreen',
  },
});

const mapStateToProps = state => {
  return {
    status: state.status,
  };
};

const mapDispatchToProps = {
  register: register,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
