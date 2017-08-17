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
        console.log(respJson);
        filteredSent = respJson.filter((item) => {
            return item.bettor === '59937574a6285b4cecb4f74e'; // STILL HARD CODED!!!!!!!!
        });
        filteredReceived = respJson.filter((item) => {
            return item.bettee === '59937574a6285b4cecb4f74e'; // STILL HARD CODED!!!!!!!!
        });
        this.setState({
            dataSource: ds.cloneWithRows(filteredSent)
        })
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

  clickChangeState = (string, json) => {
      const ds = dsCreation();
      this.setState({
          state: string,
          dataSource: ds.cloneWithRows(json)
      })
  }

  sentClick = () => {
    this.clickChangeState('sent', filteredSent)
  }

  receivedClick = () => {
    this.clickChangeState('received', filteredReceived)
  }

  navigateCreate = () => {
    this.props.navigation.navigate('CreateBet');
  }

  render() {
      console.log('DATA SOURCE', this.state.dataSource);
    return (
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
            height: '100%',
            color: '#FFFFFF',
            backgroundColor: '#365899',
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
                dataSource={this.state.dataSource}
                renderRow={(rowData) =>
                    <TouchableOpacity style={styles.eachBet}>
                        <Text style={styles.allText}>Bettor: {rowData.bettor}</Text>
                        <Text style={styles.allText}>Bettee: {rowData.bettee}</Text>
                        <Text style={styles.allText}>Content: {rowData.content}</Text>
                        <Text style={styles.allText}>Wager: {rowData.wager}</Text>
                    </TouchableOpacity>}
                style={styles.list}
                />
              </View>

          </Drawer>
      )
    }
  }

  export default PendingBetScreen;

  //Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f1f1f1',
      margin: 0,
      display: 'inline'
      // justifyContent: 'center',
      // alignItems: 'center',
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
    control: {
      width: '100%',
      height: 60,
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    picker: {
      borderRadius: 10,
      borderColor: '#4ED2B6',
      borderWidth: 4,
      width: '90%',
      height: '70%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    selectedDiv: {
      height: '100%',
      width: '50%',
      backgroundColor: '#4ED2B6',
      alignItems: 'center',
      justifyContent: 'center'
    },
    selectedText: {
      color: 'white',
    },
    unusedDiv: {
      height: '100%',
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    unusedText: {
      color: '#4ED2B6',
    },
    list: {
      flex: 1,
      height: '100%',
      alignSelf: 'stretch',
      backgroundColor: 'lightgrey',
      width: '100%',
      height: 60,
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
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
