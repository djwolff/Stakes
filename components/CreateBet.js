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
class CreateBetScreen extends React.Component {
  static navigationOptions = {
      title: 'Create a Bet',
  };
  state = {
  };

  render() {
    return (
      <View styles={styles.container}>
          <Text styles={styles.text}>Create a Bet</Text>
      </View>
    )
  }
}

export default CreateBetScreen;

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontFamily: 'Avenir',
  },
});
