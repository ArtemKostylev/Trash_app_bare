import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import MapView, {Marker, AnimatedRegion, Animated} from 'react-native-maps';

import Carousel from 'react-native-snap-carousel';
import Geocoder from 'react-native-geocoding';
import {connect} from 'react-redux';
import {fetchPosts} from '../Scripts/reducer';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

function _renderItem({item, index}) {
  return (
    <View style={styles.renderItem}>
      <Text style={styles.renderItemHeader}>{item.address}</Text>
      <Text>{item.text}</Text>
    </View>
  );
}

class MapComponent extends Component {
  constructor(props) {
    super(props);
    const initialRegion = this.props.initialRegion;
    this.onPress = this.onPress.bind(this);
    this.onSnapToItem = this.onSnapToItem.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.state = {
      region: new AnimatedRegion({
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
        latitudeDelta: initialRegion.latitudeDelta,
        longitudeDelta: initialRegion.longitudeDelta,
      }),
      currentIndex: 0,
    };
  }

  componentDidMount() {
    Geocoder.init('AIzaSyD_OTKqeqysKfFsLTyLpubBEsFIPQEfztQ', {language: 'ru'});
    this.props.fetchPosts(this.props.token);
  }

  onSnapToItem(index) {
    const {region} = this.state;
    const {latitude, longitude} = this.props.posts[index];

    region
      .timing({
        latitude: latitude,
        longitude: longitude,
      })
      .start();
  }

  onPress(index) {
    this.carousel.snapToItem(index);
  }

  onRegionChange(region) {
    this.setState({region});
  }

  render() {
    const renderItem = (
      <>
        <Animated
          style={styles.map}
          region={this.state.region}
          zoomControlEnabled={false}
          scrollEnabled={true}
          ref={ref => (this.map = ref)}>
          {this.props.posts.map(marker => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: parseFloat(marker.latitude),
                longitude: parseFloat(marker.longitude),
              }}
              title={marker.text}
              onPress={(coordinate, position) => {
                this.onPress(this.props.posts.indexOf(marker));
              }}
            />
          ))}
        </Animated>
        <View style={{height: 200}}>
          <Carousel
            layout={'default'}
            ref={ref => (this.carousel = ref)}
            data={this.props.posts}
            sliderWidth={SLIDER_WIDTH}
            sliderHeight={ITEM_HEIGHT}
            itemWidth={ITEM_WIDTH}
            itemHeight={ITEM_HEIGHT}
            renderItem={_renderItem}
            onSnapToItem={this.onSnapToItem}
          />
        </View>
      </>
    );

    let animation = (
      <View style={styles.animation_background}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );

    console.log(this.props.loading);

    return (
      <View style={styles.container}>
        {this.props.loading ? animation : renderItem}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  renderItem: {
    backgroundColor: 'gray',
    borderRadius: 5,
    height: 200,
    padding: 50,
    marginLeft: 2,
    marginRight: 2,
    position: 'absolute',
    bottom: 10,
  },
  renderItemHeader: {
    fontSize: 25,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    initialRegion: state.region,
    posts: state.posts,
    token: state.token,
    loading: state.loading,
  };
};
const mapDispatchToProps = {
  fetchPosts: fetchPosts,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapComponent);
