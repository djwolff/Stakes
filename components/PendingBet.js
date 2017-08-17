import React from 'react';
import Header from './Header';

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
class PendingBetScreen extends React.Component {
  static navigationOptions = {
      header: null,
  };
  state = {
  };

  render() {
    return (
        <View>
            <Header />
            <View styles={styles.container}>
                <Text styles={styles.text}>Pending Bet</Text>
            </View>
        </View>
    )
  }
}

export default PendingBetScreen;

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
