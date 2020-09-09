/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Header from '../Components/Header.js';
import {connect} from 'react-redux';
import {deletePost, fetchPosts, signOut} from '../Scripts/reducer.js';
import {baseURL} from '../../App.js';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.state = {
      ...this.props.user,
      edit: false,
      saving: false,
      nameFocused: false,
      surnameFocused: false,
    };
  }

  async delete(id) {
    await this.props.deletePost(this.props.token, id);
    this.props.fetchPosts(this.props.token);
  }

  logout() {
    //this.props.navigation.reset({index: 0, routes: [{name: 'Auth'}]});
    this.props.signOut();
  }

  header() {
    return (
      <View style={styles.header_container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <TouchableOpacity onPress={this.logout.bind(this)} useForeground>
          <Image
            source={{uri: 'https://cdn.onlinewebfonts.com/svg/img_376300.png'}}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderItem(item) {
    return (
      <View
        style={{
          alignItems: 'flex-start',
          backgroundColor: 'white',
          justifyContent: 'center',
          borderRadius: 5,
          marginBottom: 20,
          elevation: 2,
        }}>
        <Image
          source={{uri: baseURL + item.image}}
          style={{width: '100%', height: 200}}
        />
        <Text style={styles.cardTitle}>{`Адрес: ${item.address}`}</Text>
        <Text style={styles.date}>{`Опубликовано ${item.created.substring(
          10,
          0,
        )} в ${item.created.substring(19, 11)}`}</Text>
        <Text style={styles.text}>{item.text}</Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.delete(item.id)}
            title="Удалить"
            color="red"
          />
        </View>
      </View>
    );
  }

  render() {
    var renderProp = (
      <>
        {this.header()}
        <View style={styles.info}>
          <Text style={styles.input_title}>Имя</Text>
          <TextInput
            editable={false}
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
            editable={false}
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
          <Text style={styles.list_title}>Ваши посты</Text>
          <View style={styles.divider} />
          <FlatList
            style={{flex: 1}}
            data={this.props.posts}
            renderItem={({item}) => {
              if (this.state.id === item.author) {
                return this.renderItem(item);
              }
            }}
            keyExtractor={item => item.id}
          />
        </View>
      </>
    );

    let animation = (
      <View style={styles.animation_background}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );

    return (
      <View style={styles.container}>
        {this.props.loading ? animation : renderProp}
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
    marginTop: 10,
  },
  list_title: {
    color: 'gray',
    fontSize: 18,
    marginTop: 10,
    alignItems: 'center',
  },
  divider: {
    backgroundColor: 'forestgreen',
    height: 2,
    marginTop: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'rubik',
    fontWeight: '600',
  },
  date: {
    fontSize: 15,
    fontWeight: '200',
    color: 'gray',
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
  icon: {
    height: 24,
    width: 24,
    margin: 16,
    marginRight: 20,
  },
  header_container: {
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
    marginLeft: 20,
    flex: 1,
    alignSelf: 'center',
  },
});

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token,
    status: state.status,
    posts: state.posts,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  deletePost: deletePost,
  fetchPosts: fetchPosts,
  signOut,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
