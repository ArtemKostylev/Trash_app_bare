import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';

/*add click, change style, add icon, change size if text bigger than $n$ - change appearance*/
class CardContainer extends Component {
  stepInto = item => {
    return null;
  };

  renderCards(item) {
    return (
      <TouchableOpacity onPress={() => this.stepInto(item)}>
        <View>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.address}>{item.address}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
          <Image
            style={{flex: 1, height: 200, width: 200}}
            source={{uri: 'baseURL' + item.image}}
          />
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return <View>{this.renderCards(this.props.data)}</View>;
  }
}

export default connect(
  null,
  null,
)(CardContainer);

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  headerText: {
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
  },
  address: {
    fontSize: 20,
  },
  time: {
    fontSize: 10,
  },
  text: {
    fontSize: 15,
  },
});
