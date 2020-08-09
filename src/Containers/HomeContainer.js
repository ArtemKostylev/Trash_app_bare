import Home from '../Screens/Home';
import {fetchPosts, getPostsFromCache, tokenWrapper} from '../Scripts/reducer';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    posts: state.posts,
    token: state.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: params => {
      return dispatch(tokenWrapper(fetchPosts, params));
    },
    //getNextPage,
    getPostsFromCache: dispatch(getPostsFromCache),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
