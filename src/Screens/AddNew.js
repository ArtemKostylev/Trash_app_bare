import React, {Component} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {TouchableNativeFeedback, TextInput} from 'react-native-gesture-handler';
import KeyboardShift from '../Components/KeyboardShift';
class Button extends Component {
  image = <Image uri={this.props.uri} style={this.props.imageStyle} />;
  text = (
    <Text style={this.props.buttonTextStyle}>{this.props.buttonText}</Text>
  );
  render() {
    return (
      <TouchableNativeFeedback
        style={this.props.containerStyle}
        onPress={this.props.onPress}>
        {this.props.uri ? this.iamge : this.text}
      </TouchableNativeFeedback>
    );
  }
}

class AddNew extends Component {
  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);

    this.state = {
      adressFocused: false,
      descriptionFocused: false,
    };
  }

  renderItems() {
    return (
      <View style={styles.container}>
        {/* map */}
        <View style={styles.text_input_container}>
          {/* TODO add map picker + geo coder */}
          <TextInput
            ref={ref => (this.adress = ref)}
            placeholder="Адрес"
            onFocus={() => this.setState({adressFocused: true})}
            onBlur={() => this.setState({adressFocused: false})}
            style={
              this.state.adressFocused
                ? styles.text_input_focused
                : styles.text_input_unfocused
            }
          />
          <TextInput
            ref={ref => (this.description = ref)}
            placeholder="Описание"
            onFocus={() => this.setState({desciptionFocused: true})}
            onBlur={() => this.setState({descriptionFocused: false})}
            style={
              this.state.descriptionFocused
                ? styles.text_input_focused
                : styles.text_input_unfocused
            }
          />
        </View>
        <Button
          containerStyle={styles.picker__container}
          buttonText="Добавить фото"
          buttonTextStyle={styles.picker__text}
        />
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
    justifyContent: 'flex-start',
  },
  picker__container: {
    minWidth: 300,
    minHeight: 40,
    padding: 20,
    margin: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'gray',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  picker__text: {},
  text_input_container: {
    minWidth: 300,
  },
  text_input_unfocused: {
    marginTop: 10,
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
  text_input_focused: {
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  button__container: {
    minWidth: 300,
  },
});

export default AddNew;
