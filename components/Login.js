import React from 'react';
import {
  AsyncStorage,
  RefreshControl,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  Image,
  ImagePickerIOS
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { MapView, Location, Permissions, Font } from 'expo';

global.__DEV__ = false

//Screens
class LoginScreen extends React.Component {
  static navigationOptions = {
      title: 'Login',
  };
  state = {
    fontLoaded: false,
  };

  press() {
    this.props.navigation.navigate('LoginPage')
  }

  register() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View>
          <View style={styles.container}>
            <Text style={styles.textBig}>Login to Stakes!</Text>
            <TouchableOpacity onPress={ () => {this.press()} } style={[styles.button, styles.buttonGreen]}>
              <Text style={styles.buttonLabel}>Tap to Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
              <Text style={styles.buttonLabel}>Tap to Register</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}

export default LoginScreen;

//Styles
const styles = StyleSheet.create({
  container: {
    fontFamily: 'Avenir',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#0074D9',
  },
  buttonGreen: {
    backgroundColor: '#2ECC40'
  },
  buttonLabel: {
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  }
});
