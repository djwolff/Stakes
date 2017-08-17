import React from 'react';
import Header from './Header';

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
class CreateBetScreen extends React.Component {
  static navigationOptions = {
      header: null,
  };
  state = {
    username: 'Mika',
    betee: 'Johnathan', 
    bet: "can't run around naked in front of Horizons",
    wager: "3 bottles of soylent"
  };
  submit() {

  }

  render() {
    return (
        <View>
            <Header />
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
