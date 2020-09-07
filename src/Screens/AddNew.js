import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-picker';
import KeyboardShift from '../Components/KeyboardShift';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, {Marker} from 'react-native-maps';
import {connect} from 'react-redux';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';

class MyButton extends Component {
  image = (
    <Ionicons
      name={this.props.iconName}
      size={this.props.iconSize}
      color={this.props.iconColor}
    />
  );
  text = (
    <>
      <Ionicons
        name={'checkmark-circle-outline'}
        color={'forestgreen'}
        size={30}
      />
      <Text style={this.props.buttonTextStyle}>{this.props.buttonText}</Text>
    </>
  );
  render() {
    return (
      <TouchableOpacity
        style={this.props.containerStyle}
        onPress={this.props.onPress}>
        {this.props.buttonText === undefined ? this.image : this.text}
      </TouchableOpacity>
    );
  }
}

class AddNew extends Component {
  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);
    this.openMap = this.openMap.bind(this);
    this.state = {
      marker: {
        latitude: 0,
        longitude: 0,
      },
      address: '',
      region: this.props.initialRegion,
      adressFocused: false,
      descriptionFocused: false,
      modalShown: false,
      picSource: '',
    };
  }

  componentDidMount() {
    Geocoder.init('AIzaSyD_OTKqeqysKfFsLTyLpubBEsFIPQEfztQ', {language: 'ru'});
  }
  onPickerPress() {
    const options = {
      title: 'Выберите фото',
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response.uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        this.setState({
          picSource: source,
        });
      }
    });
  }

  openMap() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    }).then(location => {
      this.setState({
        region: {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        },
        marker: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        adressFocused: true,
        modalShown: true,
      });
    });
  }

  submit() {
    //TODO create redux action to send on server
  }

  onMapPress(e) {
    var {latitudeDelta, longitudeDelta} = this.state.region;
    var coord = e.nativeEvent.coordinate;
    this.setState({
      marker: coord,
      region: {
        latitude: coord.latitude,
        longitude: coord.longitude,
        latitudeDelta,
        longitudeDelta,
      },
    });
  }

  saveAdress() {
    Geocoder.from(this.state.marker).then(json => {
      var address = json.results[0].formatted_address.split(',');
      address = address[0] + address[1];
      this.setState({address});
    });
  }

  picker = (
    <MyButton
      containerStyle={styles.picker__container}
      iconName={'images-outline'}
      iconSize={60}
      iconColor={'forestgreen'}
      onPress={() => this.onPickerPress()}
    />
  );

  photo = () => {
    return <Image source={this.state.picSource} style={{width: 200, height: 200}}/>;
  };

  renderItems() {
    return (
      <View style={styles.container}>
        <Modal
          isVisible={this.state.modalShown}
          onBackdropPress={() => this.setState({modalShown: false})}
          onModalWillHide={() => this.saveAdress()}>
          <View style={{flex: 1}}>
            <MapView
              region={this.state.region}
              style={styles.map}
              onPress={e => this.onMapPress(e)}
              showsMyLocationButton={true}>
              <Marker coordinate={this.state.marker} />
            </MapView>
            <View
              style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                bottom: 10,
                width: '100%',
              }}>
              <Button
                onPress={() => this.setState({modalShown: false})}
                title="Сохранить"
                color="forestgreen"
              />
            </View>
          </View>
        </Modal>
        {this.state.picSource === '' ? this.picker : this.photo()}
        <View style={styles.text_input_container}>
          {/* add location button */}
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TextInput
              ref={ref => (this.adress = ref)}
              placeholder="Адрес"
              onBlur={() => this.setState({adressFocused: false})}
              onFocus={() => this.setState({adressFocused: true})}
              value={this.state.address}
              onChangeText={text => this.setState({address: text})}
              style={
                this.state.adressFocused
                  ? styles.address_input_focused
                  : styles.address_input_unfocused
              }
            />
            <TouchableOpacity
              style={{position: 'absolute', right: 60, bottom: 3}}
              onPress={() => this.openMap()}>
              <Ionicons name="pin-outline" color="forestgreen" size={40} />
            </TouchableOpacity>
          </View>

          <TextInput
            ref={ref => (this.description = ref)}
            placeholder="Описание"
            multiline
            textAlignVertical={'top'}
            numberOfLines={5}
            onFocus={() => this.setState({descriptionFocused: true})}
            onBlur={() => this.setState({descriptionFocused: false})}
            style={
              this.state.descriptionFocused
                ? styles.text_input_focused
                : styles.text_input_unfocused
            }
          />
        </View>
        <MyButton
          containerStyle={styles.submit__container}
          buttonText="Готово"
          buttonTextStyle={styles.submit__text}
        />
      </View>
    );
  }

  render() {
    return <KeyboardShift renderProp={this.renderItems()} />;
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    padding: 30,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  picker__container: {
    marginBottom: 20,
    backgroundColor: 'gainsboro',
    minWidth: 150,
    alignItems: 'center',
    minHeight: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 150,
  },
  submit__container: {
    maxHeight: 20,
    flexDirection: 'row',
    flex: 0.2,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    //flexDirection: 'column',
    justifyContent: 'center',
  },
  submit__text: {
    fontFamily: 'rubik',
    fontSize: 20,
    color: 'forestgreen',
    marginLeft: 10,
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
    marginTop: 10,
    fontSize: 20,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    backgroundColor: 'gainsboro',
  },
  text_input_focused: {
    width: '70%',
    marginTop: 10,
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'forestgreen',
  },
  address_input_unfocused: {
    flex: 0.7,
    marginTop: 10,
    fontSize: 20,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    backgroundColor: 'gainsboro',
  },
  address_input_focused: {
    width: '70%',
    marginTop: 10,
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'forestgreen',
  },
  button__container: {
    minWidth: 300,
  },
});

const mapStateToProps = state => {
  return {
    initialRegion: state.region,
  };
};

export default connect(
  mapStateToProps,
  null,
)(AddNew);
