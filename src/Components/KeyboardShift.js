import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  StyleSheet,
  TextInput,
  UIManager,
} from 'react-native';

const {State: TextInputState} = TextInput;

const KEYBOARD_MARGIN = 20;

export default class KeyboardShift extends Component {
  state = {
    shift: new Animated.Value(0),
  };

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.handleKeyboardDidShow,
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.handleKeyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidHideSub.remove();
    this.keyboardDidShowSub.remove();
  }

  render() {
    const renderProp = this.props.renderProp;
    const shift = this.state.shift;
    return (
      <Animated.View
        style={[styles.container, {transform: [{translateY: shift}]}]}>
        {renderProp}
      </Animated.View>
    );
  }

  handleKeyboardDidShow = event => {
    const windowHeight = Dimensions.get('window').height;
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(
      currentlyFocusedField,
      (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap =
          windowHeight -
          keyboardHeight -
          (fieldTop + fieldHeight) -
          KEYBOARD_MARGIN;
        if (gap >= 0) {
          return;
        }

        Animated.timing(this.state.shift, {
          toValue: gap,
          duration: 100,
          useNativeDriver: true,
        }).start();
      },
    );
  };

  handleKeyboardDidHide = () => {
    Animated.timing(this.state.shift, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});
