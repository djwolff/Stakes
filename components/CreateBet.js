import React from 'react';
import Header from './Header';
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

global.__DEV__ = false

var names = ['Johnathan', 'Steven', 'Mika', 'David']

//Screens
class CreateBetScreen extends React.Component {
  static navigationOptions = {
      header: null,
  };
  state = {
    user: '599513d6964b1a00118bd777',
    betee: '59951445964b1a00118bd778',
    content: "can't run around naked in front of Horizons",
    wager: "3 bottles of soylent"
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
        <View>
            <Header />
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
