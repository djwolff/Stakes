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
import DrawerMenuScreen from './DrawerMenu';
import { StackNavigator } from 'react-navigation';
import { MapView, Location, Permissions, Font } from 'expo';
import Drawer from 'react-native-drawer';
import Header from './Header';

global.__DEV__ = false

//Screens
class PendingBetScreen extends React.Component {
  constructor(props) {
    super(props);
    state = {
      state: 'sent',
      bets: [],
    };
    this.closeControlPanel = this.closeControlPanel.bind(this);
    this.openControlPanel = this.openControlPanel.bind(this);
  }
  static navigationOptions = {
      header: null,
      title: 'Pending Bets',
  };

  componentDidMount() {
      this.props.navigation.setParams({
          handleOpenControlPanel: this.openControlPanel.bind(this)
      }) // Used to handle the headerRight navigation.
  };

  closeControlPanel = () => {
     this._drawer.close()
  };

  openControlPanel = () => {
     this._drawer.open()
  };

  render() {
    return (
      <View styles={styles.container}>
        <Drawer
              type="overlay"
              content={<DrawerMenuScreen handleClose={() => this.closeControlPanel()}/>}
              ref = {(ref) => this._drawer = ref}
              tapToClose={true}
              openDrawerOffset={0.2} // 20% gap on the right side of drawer
              panCloseMask={1}
              panOpenMask={1}
              styles={{drawer: {
                          paddingTop: 20,
                          shadowColor: '#000000',
                          shadowOpacity: 0.8,
                          shadowRadius: 3,
                          backgroundColor: 'red',
                          height: '100%',
                          color: '#FFFFFF'
                      },
                      main: {
                          padding: 3
                      }}}
              tweenHandler={(ratio) => {
                  return {
                    drawer: { shadowRadius: Math.min(ratio*5*5, 5) },
                    main: { opacity:(2-ratio)/2 },
                  }
              }}
          >
          <View style={styles.header}>
            <TouchableOpacity onPress={ () => {this.openControlPanel()} } style={styles.borderMenu}>Menu</TouchableOpacity>
          </View>
        </Drawer>
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
  },
  header: {
    backgroundColor: '#000080',
    flex: 0.3,
    paddingTop: 10
  },
  text: {
    fontFamily: 'Avenir',
  },
  containerFull: {
    flex: 1,
    padding: 3,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  buttonGreen: {
    backgroundColor: '#2ECC40'
  },
  buttonLabel: {
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  borderMenu: {
    position: 'relative',
    paddingLeft: 1.25,
    content: "",
    position: 'absolute',
    top: 0.25,
    left: 0,
    width: 1,
    height: 0.125,
    borderTop:' 0.375 double #000',
    borderBottom: '0.125 solid #000',
  }
});
