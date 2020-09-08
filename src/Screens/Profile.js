import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Text, Button} from 'react-native';
import Header from '../Components/Header.js';
import {connect} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import CardContainer from '../Components/CardContainer';
import { saveUserData } from '../Scripts/reducer.js';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.user,
      edit: false,
      saving: false,
      usernameFocused: false,
      nameFocused: false,
      surnameFocused: false,
    };
  }

  async save() {
    alert(0);
    var user = {
      phone_number: this.props.user.phone_number,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    };
    await this.props.saveUserData(this.props.token, user);
    alert(1);
    if (this.props.status !== 200) {
      alert('Ошибка');
    }
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
          <Text style={styles.input_title}>Имя</Text>
          <TextInput
            ref={ref => (this.name = ref)}
            placeholder="Ваше имя"
            onBlur={() => this.setState({nameFocused: false})}
            onFocus={() => this.setState({nameFocused: true})}
            value={this.state.first_name}
            onChangeText={text => this.setState({first_name: text})}
            style={
              this.state.nameFocused
                ? styles.text_input_focused
                : styles.text_input_unfocused
            }
          />
          <Text style={styles.input_title}>Фамилия</Text>
          <TextInput
            ref={ref => (this.surname = ref)}
            placeholder="Ваша фамилия"
            onBlur={() => this.setState({surnameFocused: false})}
            onFocus={() => this.setState({surnameFocused: true})}
            value={this.state.last_name}
            onChangeText={text => this.setState({last_name: text})}
            style={
              this.state.surnameFocused
                ? styles.text_input_focused
                : styles.text_input_unfocused
            }
          />
          <Button onPress={() => this.save()} title="Сохранить" />
          <FlatList
            data={this.props.posts}
            renderItem={({item}) => <CardContainer data={item} />}
            keyExtractor={item => item.id}
            refreshing={this.state.refreshing}
            onRefresh={() => this.onRefresh()}
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
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  infoField: {
    fontFamily: 'rubik-light',
    fontSize: 18,
  },
  text_input_focused: {
    marginTop: 10,
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'forestgreen',
  },
  text_input_unfocused: {
    marginTop: 10,
    fontSize: 20,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    backgroundColor: 'gainsboro',
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

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token,
    status: state.status,
  };
};

const mapDispatchToProps = {
  saveUserData: saveUserData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
