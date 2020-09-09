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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameFocused: false,
      passwordFocused: false,
      nameFocused: false,
      surnameFocused: false,
      username: '',
      password: '',
      name: '',
      surname: '',
    };
  }

  submit() {
    var data = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      surname: this.state.surname,
    };
    this.props.register(data);
  }

  renderItems() {
    var errorIcon = (
      <Ionicons
        name="alert-circle-outline"
        color="red"
        size={30}
        style={{position: 'absolute', left: 20, top: 20}}
      />
    );

    let animation = (
      <View style={styles.animation_background}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );

    var renderProp = (
      <>
        <Text style={styles.title}>Регистрация</Text>
        <TextInput
          ref={ref => (this.description = ref)}
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
        <TextInput
          ref={ref => (this.description = ref)}
          placeholder="Пароль"
          textAlignVertical={'top'}
          onChangeText={text => this.setState({password: text})}
          onFocus={() => this.setState({passwordFocused: true})}
          onBlur={() => this.setState({passwordFocused: false})}
          style={
            this.state.passwordFocused
              ? styles.text_input_focused
              : styles.text_input_unfocused
          }
        />
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
        <Button
          title={'Готово'}
          onPress={() => this.submit()}
          color={'forestgreen'}
        />
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
