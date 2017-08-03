// Currently the HomePage

import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Button,
  AlertIOS,
  Platform,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { connect } from 'react-redux';


import { password } from '../files/data';
import { defaultStyles } from '../components/style'
import CompanyButton from '../components/CompanyButton'
import Background from '../components/Background'
import LinearGradient from 'react-native-linear-gradient';

// Get screen Dimensions
const { width, height } = Dimensions.get('window');

// Connect to the redux event handler flow
@connect(
  state => ({
    userData: state.userData,
    loading: state.loading,
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_MEASURE_DATA'}),
  }),
)


export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  static navigationOptions = {
    title: 'LogIn',
    header: null,
  }

  // Checks that entered pin matches and if it does, navigates to companies
  pinCheck = (navRoute) => {
    // for (i = 0; i < this.props.userData.length; i++) {
    //   if (this.props.userData[i].PIN === this.state.text) {
    //     this.props.navigation.dispatch(navRoute);
    //     return;
    //   }
    // }
    if (this.state.text === password) {
      this.props.navigation.dispatch(navRoute);
      return;
    }
    alert('incorrect pin')
  }

  //Function to check and handle the finger scan response
  FingerScanAttempt = (callback) => {
      FingerprintScanner
        .isSensorAvailable()
        .then(result => {
          FingerprintScanner
          .authenticate(
            { description: 'Scan your fingerprint on the device scanner to continue',
            fallbackEnabled: true}
          )
          .then(() => {
            // this.props.handlePopupDismissed();
            // AlertIOS.alert('Authenticated successfully');
            callback();
          })
          .catch((error) => {
            // this.props.handlePopupDismissed();
            alert("Could not read fingerprint");
          });
        })
        .catch((error) => {
          alert(error.message);
        })
    }

  render() {
    const { navigate } = this.props.navigation;

    const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
    NavigationActions.navigate({ routeName: 'Companies'}),
  ]
})

    return (
      <LinearGradient
        colors={['#CCCCCC', '#054C7A', '#192f6a']}
        style={styles.container}
        >
          <Image
            source={require('../files/images/hallmark-logo.png')}
            resizeMode= 'contain'
            style={styles.logoImage}/>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            autoCorrect= {false}
            caretHidden= {true}
            keyboardType= 'numeric'
            maxLength= {4}
            placeholder= '4-Digit PIN'
            secureTextEntry= {true}
            autoFocus= {false}
          />
            <TouchableOpacity
              onPress={() => this.pinCheck(resetAction)}
              style={styles.buttons}
              >
              <View>
                <Image
                  source={require('../files/images/long-gray-button.png')}
                  resizeMode= 'contain'
                  style={styles.buttonImage}
                >
                  <Text style={styles.buttonLabel}>Submit</Text>
                </Image>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.FingerScanAttempt(() => this.props.navigation.dispatch(resetAction))}
              style={styles.buttons}
              >
              <View>
                <Image
                  source={require('../files/images/long-gray-button.png')}
                  resizeMode= 'contain' style={styles.image}
                  style={styles.buttonImage}
                >
                  <Text style={styles.buttonLabel}>Touch ID</Text>
                </Image>
              </View>
            </TouchableOpacity>
      </LinearGradient>
    );
  }
}

//styles
const styles = StyleSheet.create({
  container: {
    // paddingTop: .04*(height - 50),         // start below status bar
    flexDirection: 'column',   // arrange posters in rows
    // flexWrap: 'wrap',       // allow multiple rows
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  textInput: {
    marginTop: 0,
    height: height/10,
    width: width/2,
    backgroundColor: '#CCCCCC',
    borderRadius: 10,
    borderColor: '#054C7A',
    borderWidth: 2,
    textAlign: 'center',
  },
  logoImage: {
    marginTop: height / 7,
    height: height / 5,
  },
  buttons: {
    height: height/15,
    width: width/2,
    marginTop: height/30,
  },
  buttonImage: {
    height: height/15,
    width: width/2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 35,
    ...defaultStyles.text,
  },
});
