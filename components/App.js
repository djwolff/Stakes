import React from 'react';
import LoginScreen from './Login';
import CreateBetScreen from './CreateBet';
import PendingBetScreen from './PendingBet';
import DrawerMenuScreen from './DrawerMenu';
import Header from './Header';
import Drawer from 'react-native-drawer';
import axios from 'axios';
import Hamburger from 'react-native-hamburger';
import SingleBetScreen from './SingleBet';
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

let allFeedArray = [];
let myFeedArray = [];

//Screens
class App extends React.Component {
  constructor(props){
    super(props);
    this.closeControlPanel = this.closeControlPanel.bind(this);
    this.openControlPanel = this.openControlPanel.bind(this);
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
        dataSource: ds.cloneWithRows([])
    }
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

  componentWillMount() {
      console.log('inside componentdidmount!')
      AsyncStorage.getItem('user')
      .then(result => {
        var parsedResult = JSON.parse(result);
        // var name = parsedResult.name;
        // var id = parsedResult.id;
        if (parsedResult) {
          this.props.navigation.setParams({
              handleCreateBet: this.createBet.bind(this),
              handleOpenControlPanel: this.openControlPanel.bind(this)
          })
          const ds = new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
          });
          fetch('https://stakes.herokuapp.com/feed', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
          })
          .then((resp) => resp.json())
          .then((allFeed) => {
              fetch('https://stakes.herokuapp.com/myBets', {
                  method: 'POST',
                  headers: {
                    "Content-Type": "application/json"
                  },
              })
              .then((resp) => resp.json())
              .then((myFeed) => {
                  myFeedArray = myFeed;
                  allFeedArray = allFeed;
                  this.setState({
                      dataSource: ds.cloneWithRows(allFeedArray)
                  })
              })
              .catch(console.log)
          })
          .catch(console.log)
        }
        else {
          console.log('user not logged in')
          this.props.navigation.navigate('Login')
        }
      })
      // const ds = new ListView.DataSource({
      //     rowHasChanged: (r1, r2) => r1 !== r2
      // });
      // fetch('https://stakes.herokuapp.com/feed', {
      //     method: 'POST',
      //     headers: {
      //       "Content-Type": "application/json"
      //     },
      // })
      // .then((resp) => resp.json())
      // .then((respJson) => {
      //     console.log(respJson);
      //     this.setState({
      //         dataSource: ds.cloneWithRows(respJson)
      //     })
      // })
      // .catch(console.log)
  }

  createBet() {
    this.props.navigation.navigate('CreateBet');
  }

  login() {
    this.props.navigation.navigate('Login');
  }

  pendingBet() {
    this.props.navigation.navigate('PendingBet');
  }
  singleBet(id) {
    this.props.navigation.navigate('SingleBet', {id: id});
  }

  myFeedClick = () => {
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.setState({
        dataSource: ds.cloneWithRows(myFeedArray)
    })
  }

  allFeedClick = () => {
      const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.setState({
          dataSource: ds.cloneWithRows(allFeedArray)
      })
  }

  render() {
      console.log('DATA SOURCE', this.state.dataSource);
    return (
      <View style={styles.container}>
          <Drawer
                type="overlay"
                content={<DrawerMenuScreen handleClose={() => this.closeControlPanel()}/>}
                ref = {(ref) => this._drawer = ref}
                side="left"
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                panOpenMask={0.2}
                styles={{drawer: {
                            paddingTop: 20,
                            shadowColor: '#000000',
                            shadowOpacity: 0.8,
                            shadowRadius: 3,
                            backgroundColor: '#3D516B',
                            height: '100%',
                            color: '#FFFFFF'
                        }}}
                tweenHandler={(ratio) => {
                    return {
                      drawer: { shadowRadius: Math.min(ratio*5*5, 5) },
                      main: { opacity:(2-ratio)/2 },
                    }
                }}
            >
          <Header name="Login" openControlPanel={this.openControlPanel.bind(this)} closeControlPanel={this.closeControlPanel.bind(this)}/>
          <TouchableOpacity onPress={ () => {this.login()} } style={[styles.button, styles.buttonGreen]}>
            <Text style={styles.buttonLabel}>Tap to Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => {this.pendingBet()} } style={[styles.button, styles.buttonGreen]}>
            <Text style={styles.buttonLabel}>Tap to see Pending Bets</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.myFeedClick()}>
            <Text>
              MY FEED
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.allFeedClick()}>
            <Text>
              GLOBAL FEED
            </Text>
          </TouchableOpacity>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
                <TouchableOpacity style={styles.eachBet} onPress={ () =>{this.singleBet(rowData._id)}}>
                    <Text style={styles.allText}>Bettor: {rowData.bettor}</Text>
                    <Text style={styles.allText}>Bettee: {rowData.bettee}</Text>
                    <Text style={styles.allText}>Content: {rowData.content}</Text>
                    <Text style={styles.allText}>Wager: {rowData.wager}</Text>
                </TouchableOpacity>}
            />
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
  SingleBet: {
    navigationOptions:{
      header: null
    },
    screen: SingleBetScreen,
  }
}, {initialRouteName: 'App'}
);


//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: '#f1f1f1'
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
    backgroundColor: '#4ED2B6'
  },
  buttonLabel: {
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  eachBet: {
      alignSelf: 'stretch',
      padding: 10,
      margin: 5,
      borderRadius: 5,
      backgroundColor: 'white',
      border: '0.5px solid'
  },
  allText: {
      fontFamily: 'Avenir'
  }
});
