import React from 'react';
import LoginScreen from './Login';
import CreateBetScreen from './CreateBet';
import PendingBetScreen from './PendingBet';
import DrawerMenuScreen from './DrawerMenu';
import Drawer from 'react-native-drawer';

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

function handleCreateBet() {
    this.props.navigation.navigate('Create')
}

//Screens
class App extends React.Component {

    constructor(){
        super();
        this.closeControlPanel = this.closeControlPanel.bind(this);
        this.openControlPanel = this.openControlPanel.bind(this);
    }

  static navigationOptions = ({ navigation }) => ({
      title: 'App',
      headerRight: <Button title="Create" onPress={() => {navigation.state.params.handleCreateBet()}} />
  });

  closeControlPanel = () => {
     this._drawer.close()
  };
  openControlPanel = () => {
     this._drawer.open()
  };

  componentDidMount() {
      this.props.navigation.setParams({
          handleCreateBet: this.createBet.bind(this)
      }) // Used to handle the headerRight navigation.
  }

  createBet() {
    this.props.navigation.navigate('CreateBet')
  }

  login() {
    this.props.navigation.navigate('Login')
  }

  pendingBet() {
    this.props.navigation.navigate('PendingBet')
  }

  render() {
    return (
      <View>
          <Drawer
                type="overlay"
                content={<DrawerMenuScreen handleClose={() => this.closeControlPanel()}/>}
                ref = {(ref) => this._drawer = ref}
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                // panCloseMask={0.9}
                // panOpenMask={0.9}
                closedDrawerOffset={80}
                styles={[styles.drawerStyles]}
                tweenHandler={Drawer.tweenPresets.parallax}
            >
          <Text style={styles.text}>This is cool.</Text>

          <TouchableOpacity onPress={ () => {this.login()} } style={[styles.button, styles.buttonGreen]}>
            <Text style={styles.buttonLabel}>Tap to Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => {this.pendingBet()} } style={[styles.button, styles.buttonGreen]}>
            <Text style={styles.buttonLabel}>Tap to see Pending Bets</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => {this.openControlPanel()} } style={[styles.button, styles.buttonGreen]}>
            <Text style={styles.buttonLabel}>Open Control Panel</Text>
          </TouchableOpacity>
          </Drawer>
      </View>
    )
  }
}

//Navigator
export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  App: {
    screen: App,
  },
  CreateBet: {
    screen: CreateBetScreen,
  },
  PendingBet: {
    screen: PendingBetScreen,
  },
  DrawerMenu: {
    screen: DrawerMenuScreen,
  },
}, {initialRouteName: 'App'});


//Styles
const styles = StyleSheet.create({
  drawerStyles: {
      drawer: {
          shadowColor: '#000000',
          shadowOpacity: 0.8,
          shadowRadius: 3,
          backgroundColor: '#000000'
      },
      main: {
          paddingLeft: 3
      },
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Avenir',
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
});
