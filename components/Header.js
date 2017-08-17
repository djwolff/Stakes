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
import Hamburger from 'react-native-hamburger';

global.__DEV__ = false

//Screens
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    }
  }
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
        <View style={styles.header}>
          <View style={styles.borderMenu}>
            <Hamburger active={this.state.menu} color="white" onPress={ () => this.props.openControlPanel() }/>
            <Text style={styles.title}>
              {this.props.name}
            </Text>
            <TouchableOpacity onPress={() => this.navigateCreate()}>
              <Text style={{fontSize: 28, color: 'white'}}>
                +
              </Text>
            </TouchableOpacity>
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
  header: {
    backgroundColor: 'steelblue',
    height: 75,
    width: '100%',
    paddingTop: 10,
    display: 'inlineBlock'
  },
  borderMenu: {
    padding: 20,
    width: '100%',
    display: 'flex',
    'flexDirection': 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 25,
  },
});
