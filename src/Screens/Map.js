import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

import {Marker, AnimatedRegion, Animated} from 'react-native-maps';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';
import Geocoder from 'react-native-geocoding';
import {connect} from 'react-redux';
import {fetchPosts} from '../Scripts/reducer';
import {baseURL} from '../../App';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

class MapComponent extends Component {
  constructor(props) {
    super(props);
    const initialRegion = this.props.initialRegion;
    this.onPress = this.onPress.bind(this);
    this.onSnapToItem = this.onSnapToItem.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this.onCardPress = this.onCardPress.bind(this);
    this.state = {
      region: new AnimatedRegion({
        latitude: parseFloat(initialRegion.latitude),
        longitude: parseFloat(initialRegion.longitude),
        latitudeDelta: initialRegion.latitudeDelta,
        longitudeDelta: initialRegion.longitudeDelta,
      }),
      currentIndex: 0,
      item: this.props.posts[0] === undefined ? this.props.posts[0] : null,
      modalShown: false,
    };
  }

  componentDidMount() {
    Geocoder.init('AIzaSyD_OTKqeqysKfFsLTyLpubBEsFIPQEfztQ', {language: 'ru'});
    this.props.fetchPosts(this.props.token).then(() => {
      const {region} = this.state;
      const {latitude, longitude} = this.props.posts[0];

      region
        .timing({
          latitude: latitude,
          longitude: longitude,
        })
        .start();
    });
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

  onCardPress(item) {
    this.setState({
      modalShown: true,
      item: item,
    });
  }

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.renderItem}>
        <TouchableOpacity
          onPress={() => this.onCardPress(item)}
          style={{height: '100%', width: '100%'}}>
          <Text style={styles.renderItemHeader}>{item.address}</Text>
          <Text style={{marginTop: 10, color: 'gray'}}>{item.text}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  modal = () => {
    if (this.state.item === undefined) {
      return (
        <View
          style={{
            alignItems: 'flex-start',
            backgroundColor: 'white',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Image
            source={{uri: baseURL + this.state.item.image}}
            style={{width: '100%', height: 300}}
          />
          <Text style={styles.cardTitle}>{`Адрес: ${
            this.state.item.address
          }`}</Text>
          <Text
            style={
              styles.date
            }>{`Опубликовано ${this.state.item.created.substring(
            10,
            0,
          )} в ${this.state.item.created.substring(19, 11)}`}</Text>
          <Text style={styles.text}>{this.state.item.text}</Text>
        </View>
      );
    } else {
      return <> </>;
    }
  };

  render() {
    const renderItem = (
      <>
        <Modal
          isVisible={this.state.modalShown}
          onBackdropPress={() => this.setState({modalShown: false})}>
          {this.modal}
        </Modal>
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
            renderItem={this._renderItem}
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
    backgroundColor: 'white',
    borderRadius: 5,
    height: 200,
    padding: 10,
    marginLeft: 2,
    marginRight: 2,
    position: 'absolute',
    bottom: 10,
    width: '95%',
  },
  renderItemHeader: {
    marginTop: 25,
    fontSize: 25,
    fontWeight: '400',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  cardTitle: {
    fontSize: 20,
    fontFamily: 'rubik',
    fontWeight: '700',
  },
  date: {
    fontSize: 15,
    color: 'gray',
    fontWeight: '200',
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
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
