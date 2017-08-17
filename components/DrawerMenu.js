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
import Icon from 'react-native-vector-icons/FontAwesome';


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
          <TouchableOpacity onPress={ () => {this.props.handleClose()} } style={[styles.close]}>
            <Text style={styles.x}>X</Text>
          </TouchableOpacity>
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
          <View style={styles.options}>
            <Icon style={styles.optionText} name="bell">
              <Text>     Pending Bets</Text>
            </Icon>
            <Icon style={styles.optionText} name="group">
              <Text>     Invite a Friend</Text>
            </Icon>
            <Icon style={styles.optionText} name="cog">
              <Text>     Settings</Text>
            </Icon>
            <Icon style={styles.optionText} name="sign-out">
              <Text>     Log Out</Text>
            </Icon>
          </View>
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
  close: {
    display: 'flex',
    paddingRight: 30,
    paddingTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  x: {
    color: 'white',
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
  },
  options: {
    display: 'flex',
    paddingLeft: 15,
  },
  optionText: {
    color: 'white',
    fontSize: 23,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
