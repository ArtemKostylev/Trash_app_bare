import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Image, Text} from 'react-native';

class CardFull extends Component {
  constructor(props) {
    super(props);
    this.data = props.navigation.removeCurrentCardstate.params.data;
  }

  state = {
    loading: true,
  };

  render() {
    return (
      <View>
        <Image style={styles.main_image} />
        <View>
          <Text style={styles.title} />
          <Text style={styles.time} />
        </View>
        <View>
          <Text style={styles.main_text} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(CardFull);

var styles = StyleSheet.create({
  main_image: {},
  title: {},
  time: {},
  main_text: {},
});
