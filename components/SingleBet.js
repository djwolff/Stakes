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
class SingleBet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bet: {},
      my_bet=false
    };
    this.closeControlPanel = this.closeControlPanel.bind(this);
    this.openControlPanel = this.openControlPanel.bind(this);
  }
  static navigationOptions = {
    header: null,
    title: 'Pending Bets',
  };

  componentWillMount(){
    AsyncStorage.getItem('user')
    .then(function(user){
      axios({
        url:'https://stakes.herokuapp.com/viewOneBet/'+req.params.id,
        method: 'post'
      })
      .then(function(bet){
        if(bet.bettor === user.id){
          this.setState({my_bet:true});
        }
        this.setState({bet:bet});
      })
    }
  })
}
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
resolve = () => {
  Alert.alert(
    'Who won?!',
    [
      {text: this.state.bet.bettor, onPress: () => this.winner(this.state.bet.bettor)},
      {text: this.state.bet.bettee, onPress: () => this.winner(this.state.bet.bettor)},
      {text: Cancel, onPress: () => {}}
    ],
    {cancelable: false}
  )
}
winner = (winner) => {
  axios({
    url:'https://stakes.herokuapp.com/viewOneBet/'+req.params.id,
    method: 'post',
    data:{

    }
  })
  .then(function(bet){
    if(bet.bettor === user.id){
      this.setState({my_bet:true});
    }
}
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
    }}}
    tweenHandler={(ratio) => {
      return {
        drawer: { shadowRadius: Math.min(ratio*5*5, 5) },
        main: { opacity:(2-ratio)/2 },
      }
    }}
    >
    <Header name={this.state.bet.wager} openControlPanel={this.openControlPanel.bind(this)} closeControlPanel={this.closeControlPanel.bind(this)} navigatecreate={this.navigateCreate.bind(this)}/>
    <Text style={styles.allText}>Bettor: {this.state.bet.bettor}</Text>
    <Text style={styles.allText}>Bettee: {this.state.bet.bettee}</Text>
    <Text style={styles.allText}>Content: {this.state.bet.content}</Text>
    <Text style={styles.allText}>Wager: {this.state.bet.wager}</Text>
    {this.state.my_bet &&
      <Icon.Button style={[styles.button]} name="Close the Bet" onPress={() => {this.resolve()} }>
        <Text style={{fontFamily: 'Arial', fontSize: 20, padding: 5}}>Close the Bet</Text>
      </Icon.Button>}
    </Drawer>
    </View>
  )
}
}

export default SingleBet;

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    margin: 0,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 5
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
  allText: {
    fontFamily: 'Avenir'
  }
});
