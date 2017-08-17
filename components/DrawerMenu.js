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
    header: null,
    title: 'Menu',
  };

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.profile}>
            <View style={styles.headerprofile}>
              <Image
                style={{width: 100, height: 100}}
                source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
              />
            </View>
            <View style={styles.headerprofile}>
              <Text style={styles.name}>Mika</Text>
              <Text style={styles.name}>Reyes</Text>
            </View>
          </View>
          <Text styles={styles.text}>Drawer Menu</Text>
          <TouchableOpacity onPress={ () => {this.props.handleClose()} } style={[styles.button, styles.buttonGreen]}>
            <Text style={styles.buttonLabel}>Close</Text>
          </TouchableOpacity>
        </View>
    )
  }
}

export default DrawerMenuScreen;

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  profile: {
    height: 140,
    width: '100%',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  headerprofile: {
    display: 'flex',
    padding: 10,
    paddingLeft: 15,
    float: 'left',
  },
  name: {
    fontFamily: 'Avenir',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text: {
    fontFamily: 'Avenir',
  },
  container: {
    backgroundColor: '#3D516B'
  }
});
