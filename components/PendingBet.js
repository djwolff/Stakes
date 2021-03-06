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

let filteredSent = [];
let filteredReceived = [];

dsCreation = () => {
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });
    return ds
}

//Screens
class PendingBetScreen extends React.Component {
  constructor(props) {
    super(props);
    const ds = dsCreation();
    this.state = {
      state: 'sent',
      bets: [],
      menu: false,
      dataSource: ds.cloneWithRows([])
    };

    fetch('https://stakes.herokuapp.com/myPendingBets', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
    })
    .then((resp) => resp.json())
    .then((respJson) => {
        console.log('new response from server', respJson);
        AsyncStorage.getItem('user')
        .then((userData) => {
            console.log('userdata', userData);
            console.log('id', JSON.parse(userData).id);
            filteredSent = respJson.filter((item) => {
                return item.bettor === JSON.parse(userData).id;
            });
            filteredReceived = respJson.filter((item) => {
                return item.bettee === JSON.parse(userData).id;
            });
            this.setState({
                dataSource: ds.cloneWithRows(filteredSent)
            })
        });
    })
    .catch(console.log)

    this.closeControlPanel = this.closeControlPanel.bind(this);
    this.openControlPanel = this.openControlPanel.bind(this);
    this.sentClick = this.sentClick.bind(this);
    this.receivedClick = this.receivedClick.bind(this);
    this.navigateCreate = this.navigateCreate.bind(this);
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
    this._drawer.close();
    this.setState({menu: false})
  };

  openControlPanel = () => {
    this._drawer.open();
    this.setState({menu: true})
  };

  clickChangeState = (string, array) => {
      console.log('click change state', string, array);
      const ds = dsCreation();
      this.setState({
          state: string,
          dataSource: ds.cloneWithRows(array)
      })
  }

  sentClick = () => {
    this.clickChangeState('sent', filteredSent);
  }

  receivedClick = () => {
    this.clickChangeState('received', filteredReceived);
  }

  navigateCreate = () => {
    this.props.navigation.navigate('CreateBet');
  }

  acceptBet = (betId) => {
    fetch('https://stakes.herokuapp.com/updatePendingBets', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          betId: betId,
      }),
    })
    .then((resp) => resp.json())
    .then((updatedBet) => {
        console.log('updated bet!', updatedBet);
        const newArray = [];
        console.log('old filtered received', filteredReceived);
        filteredReceived = filteredReceived.filter((bet) => {
            console.log(bet._id, updatedBet._id);
            console.log(bet._id !== updatedBet._id);
            return bet._id !== updatedBet._id; // STILL HARD CODED!!!!!!!!
        });
        console.log('new filtered received', filteredReceived);
        this.clickChangeState(this.state.state, filteredReceived);
    })
  }

  render() {
    return (
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
      <View styles={styles.container}>
            <Header name="Pending Bets" openControlPanel={this.openControlPanel.bind(this)} closeControlPanel={this.closeControlPanel.bind(this)} navigatecreate={this.navigateCreate.bind(this)}/>

            <View style={styles.control}>
              <View style={styles.picker}>
                <TouchableOpacity style={this.state.state === 'sent' ? styles.selectedDiv : styles.unusedDiv} onPress={() => this.sentClick()}>
                  <Text style={this.state.state === 'sent' ? styles.selectedText : styles.unusedText}>
                    SENT
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.state === 'received' ? styles.selectedDiv : styles.unusedDiv} onPress={() => this.receivedClick()}>
                  <Text style={this.state.state === 'received' ? styles.selectedText : styles.unusedText}>
                    RECEIVED
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

              <ListView
                style={styles.list}
                dataSource={this.state.dataSource}
                renderRow={(rowData) =>
                    <TouchableOpacity style={styles.eachBet}>
                        <Text style={styles.allText}>Bettor: {rowData.bettor}</Text>
                        <Text style={styles.allText}>Bettee: {rowData.bettee}</Text>
                        <Text style={styles.allText}>Content: {rowData.content}</Text>
                        <Text style={styles.allText}>Wager: {rowData.wager}</Text>
                        {
                            this.state.state === 'received' ?
                            <TouchableOpacity style={styles.button} onPress={() => this.acceptBet(rowData._id)}>
                              <Text>
                                ACCEPT THE BET
                              </Text>
                            </TouchableOpacity> :
                            null
                        }
                    </TouchableOpacity>
                }
              />
        </View>
        </Drawer>
      )
    }
  }

  export default PendingBetScreen;

  //Styles
  const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   backgroundColor: '#f1f1f1',
    //   margin: 0,
    //   display: 'inline'
    //   // justifyContent: 'center',
    //   // alignItems: 'center',
    // },
    // text: {
    //   fontFamily: 'Avenir',
    // },
    // containerFull: {
    //   flex: 1,
    //   padding: 3,
    //   alignItems: 'stretch',
    //   backgroundColor: '#F5FCFF',
    // },
    // control: {
    //   width: '100%',
    //   height: 60,
    //   backgroundColor: 'white',
    //   display: 'flex',
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   justifyContent: 'center'
    // },
    // picker: {
    //   borderRadius: 10,
    //   borderColor: '#4ED2B6',
    //   borderWidth: 4,
    //   width: '90%',
    //   height: '70%',
    //   display: 'flex',
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   justifyContent: 'space-between'
    // },
    // selectedDiv: {
    //   height: '100%',
    //   width: '50%',
    //   backgroundColor: '#4ED2B6',
    //   alignItems: 'center',
    //   justifyContent: 'center'
    // },
    // selectedText: {
    //   color: 'white',
    // },
    // unusedDiv: {
    //   height: '100%',
    //   width: '50%',
    //   alignItems: 'center',
    //   justifyContent: 'center'
    // },
    // unusedText: {
    //   color: '#4ED2B6',
    // },
    // list: {
    //   flex: 1,
    //   height: '100%',
    //   alignSelf: 'stretch',
    //   backgroundColor: 'lightgrey',
    //   width: '100%',
    //   height: 60,
    //   backgroundColor: 'white',
    //   display: 'flex',
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   justifyContent: 'center'
    // },
    // eachBet: {
    //     alignSelf: 'stretch',
    //     padding: 10,
    //     margin: 5,
    //     borderRadius: 5,
    //     backgroundColor: 'white',
    //     border: '0.5px solid'
    // },
    // allText: {
    //     fontFamily: 'Avenir'
    // }
  });
