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
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
        <View style={styles.header}>
          <View style={styles.borderMenu}>
            {this.props.name === "Login to Stakes!" ? <TouchableOpacity >
              <Text style={{fontSize: 28, color: 'white'}}>
              </Text>
            </TouchableOpacity>
          :
          <TouchableOpacity onPress={ () => this.props.openControlPanel()}>
            <Text style={styles.bar}>≡</Text>
          </TouchableOpacity>
          }
            <Text style={styles.title}>
              {this.props.name}
            </Text>
            {this.props.navigatecreate ? <TouchableOpacity onPress={() => this.props.navigatecreate()}>
              <Text style={{fontSize: 28, color: 'white'}}>
                +
              </Text>
            </TouchableOpacity>
          :
          <TouchableOpacity >
            <Text style={{fontSize: 28, color: 'white'}}> {' '}
            </Text>
          </TouchableOpacity>}
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
    backgroundColor: '#3D516B'
  },
  text: {
    color: 'orange',
    fontFamily: 'Avenir',
  },
  header: {
    backgroundColor: '#3D516B',
    height: 75,
    width: '100%',
    paddingTop: 10,
    display: 'flex'
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
  bar: {
    color: 'white',
    fontSize: 36,
    paddingTop: 2,
  }
});
