import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { defaultStyles } from './style';
import { measureButtons } from '../files/data'

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// How many buttons we want to have in each row and column
const cols = 2, rows = 4;

export default class MeasureButton extends Component {



  // Component prop types
  static propTypes = {
    // Measure Object
    measure: PropTypes.array,
    // Called when user taps on measure button
    onOpen: PropTypes.func.isRequired,
  }

  render() {
    const { measure, title, onOpen } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={() => onOpen(measure, title)}>
        <View style={styles.imageContainer}>
          <Image source={require('../files/images/blank-gray-button.png')} resizeMode= 'contain' style={styles.image}>
            <Text style={styles.buttonLabel}>{title}</Text>
          </Image>
        </View>

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginBottom: 10,
    height: ((height - 40) / rows - 10) * .9,
    width: (width - 10) / (cols * 1.25) - 10,
  },
  imageContainer: {
    flex: 1,                          // take up all available space
  },
  image: {
    flexWrap: 'wrap',
    borderRadius: 10,                 // rounded corners
    height: ((height - 40) / rows - 10) * .9,
    width: (width - 10) / (cols * 1.25) - 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 23,
    ...defaultStyles.text,
    textAlign: 'center',
    maxWidth: (width - 10) / (cols * 1.25) - 30,
    maxHeight: ((height - 40) / rows - 10) * .9,
  },
});
