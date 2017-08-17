import React from 'react';
import Header from './Header';
import DrawerMenuScreen from './DrawerMenu';
import axios from 'axios';
import {
  AsyncStorage,
  RefreshControl,
  StyleSheet,
  View,
  Text,
  Picker,
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
import Drawer from 'react-native-drawer';

global.__DEV__ = false

var names = ['Johnathan', 'Steven', 'Mika', 'David']

//Screens
class CreateBetScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Mika',
      betee: 'Johnathan',
      bet: "can't run around naked in front of Horizons",
      wager: "3 bottles of soylent"
    };
    this.closeControlPanel = this.closeControlPanel.bind(this);
    this.openControlPanel = this.openControlPanel.bind(this);
  };

  static navigationOptions = {
      header: null,
      title: 'Create a bet!'
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

  submit() {
    console.log('this is the damn state', this.state)
    axios.post('https://stakes.herokuapp.com/createBet', {
      wager: this.state.wager,
      content: this.state.content,
      bettor: this.state.user,
      betee: this.state.betee
    })
    .then(function(response) {
      console.log('this is response:', response)
      this.props.navigation.navigate('App')
    })
    .catch(function(err) {
      console.log('error is', err)
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
            <View>
              <Header name="What's at stake?" openControlPanel={this.openControlPanel.bind(this)} closeControlPanel={this.closeControlPanel.bind(this)}/>
              <View styles={styles.container}>
                  <Text> {this.state.user} bets {this.state.betee} {this.state.content} for {this.state.wager}</Text>
                  <Picker
                    selectedValue={this.state.betee}
                    onValueChange={(itemValue, itemIndex) => this.setState({betee: itemValue})}>
                    {names.map((name) => {
                      return <Picker.Item label={name} value={name} />
                    })}
                  </Picker>
                  <TextInput
                    style={{borderWidth: 0.5}}
                    multiline = {true}
                    numberOfLines = {6}
                    onChangeText={(text) => this.setState({content: text})}
                    value={this.state.content}>
                  </TextInput>
                  <TextInput
                    style={{borderWidth: 0.5}}
                    multiline = {true}
                    numberOfLines = {3}
                    onChangeText={(text) => this.setState({wager: text})}
                    value={this.state.wager}>
                  </TextInput>
                  <TouchableOpacity onPress={ () => {this.submit()} } style={[styles.button, styles.buttonGreen]}>
                    <Text style={styles.buttonLabel}>Submit</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </Drawer>
    )
  }
}

export default CreateBetScreen;

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontFamily: 'Avenir',
  },
});
