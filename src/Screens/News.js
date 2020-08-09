import React, {Component} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import CardContainer from '../Components/CardContainer';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {fetchPosts, getPostsFromCache} from '../Scripts/reducer';

class News extends Component {
  state = {
    refreshing: false,
    loading: true,
  };

  onRefresh() {
    this.setState({refreshing: true});
    this.props
      .fetchPosts(this.props.token)
      .then(() => this.setState({refreshing: false}));
  }

  componentWillMount() {
    //this.setState({loading: true});
    if (this.props.posts.length === 0) {
      console.log('null');
      this.props.fetchPosts(this.props.token);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Header style = {{flex: 1}}
                    navigator = {this.props.navigation}
                    title = 'Мусора.нет'
                /> */}
        <FlatList
          data={this.props.posts}
          renderItem={({item}) => <CardContainer data={item} />}
          keyExtractor={item => item.id}
          refreshing={this.state.refreshing}
          onRefresh={() => this.onRefresh()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    posts: state.posts,
  };
};

const mapDispatchToProps = {
  getPostsFromCache: getPostsFromCache,
  fetchPosts: fetchPosts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 3,
    justifyContent: 'flex-start',
  },
});
