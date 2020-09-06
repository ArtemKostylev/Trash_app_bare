import React, {Component} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {TouchableNativeFeedback, TextInput} from 'react-native-gesture-handler';
import KeyboardShift from '../Components/KeyboardShift';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Button extends Component {
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
      <TouchableNativeFeedback
        style={this.props.containerStyle}
        onPress={this.props.onPress}>
        {this.props.buttonText === undefined ? this.image : this.text}
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

  openMap() {
    return ()
  }

  //TODO add icons to the left
  renderItems() {
    return (
      <View style={styles.container}>
        <Button
          containerStyle={styles.picker__container}
          iconName={'images-outline'}
          iconSize={60}
          iconColor={'forestgreen'}
        />
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
        <Button
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
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    minHeight: 40,
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
  },
  text_input_unfocused: {
    marginTop: 10,
    fontSize: 20,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    backgroundColor: 'gainsboro',
  },
  text_input_focused: {
    marginTop: 10,
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'forestgreen',
  },
  button__container: {
    minWidth: 300,
  },
});

export default AddNew;
