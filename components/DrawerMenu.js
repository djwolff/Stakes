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
import { MapView, Location, Permissions, Font } from 'expo';

global.__DEV__ = false

//Screens
class DrawerMenuScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
        <View>
            <View styles={styles.container}>
                <Text styles={styles.text}>Drawer Menu</Text>
                <TouchableOpacity onPress={ () => {this.props.handleClose()} } style={[styles.button, styles.buttonGreen]}>
                  <Text style={styles.buttonLabel}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
  }
}

export default DrawerMenuScreen;

//Styles
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Avenir',
  },
});
