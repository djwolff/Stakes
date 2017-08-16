import React from 'react';
import LoginScreen from './Login';
import CreateBetScreen from './CreateBet';
import PendingBetScreen from './PendingBet';
import DrawerMenuScreen from './DrawerMenu';
import Header from './Header';
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

  static navigationOptions = {
    header: null
  };

  closeControlPanel = () => {
     this._drawer.close()
  };
  openControlPanel = () => {
     this._drawer.open()
  };

  componentDidMount() {
      this.props.navigation.setParams({
          handleCreateBet: this.createBet.bind(this),
          handleOpenControlPanel: this.openControlPanel.bind(this)
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
      <View style={styles.container}>
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
          <Header />
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
}, {initialRouteName: 'App'}
);


//Styles
const styles = StyleSheet.create({
  container: {
    flex: '1',
    // justifyContent: 'center',
    // alignItems: 'center',
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