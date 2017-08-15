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
      fontLoaded: false,
  };

  async componentDidMount() {
      await Font.loadAsync({
          'sf-light': require('./SFLight.otf'),
      });
      this.setState({ fontLoaded: true });
  }

  press() {
    this.props.navigation.navigate('LoginPage')
  }

  register() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <div>
          { this.state.fontLoaded ? (
              <View style={styles.container}>
                <Text style={styles.textBig}>Login to Stakes!</Text>
                <TouchableOpacity onPress={ () => {this.press()} } style={[styles.button, styles.buttonGreen]}>
                  <Text style={styles.buttonLabel}>Tap to Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
                  <Text style={styles.buttonLabel}>Tap to Register</Text>
                </TouchableOpacity>
              </View>
          ) : null }
      </div>
    )
  }
}

//Navigator
export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
}, {initialRouteName: 'Login'});


//Styles
const styles = StyleSheet.create({
  container: {
    fontFamily: 'sf-light',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
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
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  }
});
