import React from 'react';
import Header from './Header';

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

global.__DEV__ = false

//Screens
class CreateBetScreen extends React.Component {
  static navigationOptions = {
      header: null,
  };
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

  submit() {

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
            <Header name="What's at stake?" openControlPanel={this.openControlPanel.bind(this)} closeControlPanel={this.closeControlPanel.bind(this)} navigatecreate={this.navigateCreate.bind(this)}/>
            <View styles={styles.container}>
                <Text> {this.state.username} bets {this.state.betee} {this.state.bet} for {this.state.wager}</Text>
                <Picker
                  selectedValue={this.state.betee}
                  onValueChange={(itemValue, itemIndex) => this.setState({betee: itemValue})}>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>
                <TextInput>
                  multiline = {true}
                  numberOfLines = {6}
                  onChangeText={(text) => this.setState({bet: text})}
                  value={this.state.bet}
                </TextInput>
                <TextInput>
                  multiline = {true}
                  numberOfLines = {3}
                  onChangeText={(text) => this.setState({wager: text})}
                  value={this.state.wager}
                </TextInput>
                <TouchableOpacity onPress={ () => {this.submit()} } style={[styles.button, styles.buttonGreen]}>
                  <Text style={styles.buttonLabel}>Submit</Text>
                </TouchableOpacity>
            </View>
          </Drawer>
        </View>
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
