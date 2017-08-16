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
class Header extends React.Component {
  static navigationOptions = {
      header: null,
  };

  render() {
    return (
      <View>
          <View style={styles.container}>
              <Text styles={styles.text}>This is the header!!!!!</Text>
          </View>
      </View>
    )
  }
}

export default Header;

//Styles
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 50,
    width: 720,
    // alignSelf: 1,
    backgroundColor: 'skyblue'
  },
  text: {
    color: 'orange',
    fontFamily: 'Avenir',
  },
});
