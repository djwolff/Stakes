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
import { MapView, Location, Permissions, Font, Facebook } from 'expo';
import axios from 'axios'

global.__DEV__ = false

function logIn() {
  AsyncStorage.getItem('user')
  .then(function(user){
    console.log('********THIS',user)
    if(user){
      Alert.alert(
        `Hey ${JSON.parse(user).name}!`,
        'You already logged in!'
      )
    }
    else{
      newUser()
      .then(function(user){
        console.log('THIS IS THE USER HERE**************',user.data);
        AsyncStorage.setItem('user',JSON.stringify({
          name: user.data.name,
          id: user.data._id
        }))
        Alert.alert(
          'Logged in!',
          `Hi ${user.data.name}!`,
        );
      })
    }
  })
}


//Screens
class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    fontLoaded: false,
  };

  press() {
    this.props.navigation.navigate('LoginPage')
  }

  register() {
    logIn()
    console.log('im outisde of login')
    // this.props.navigation.navigate('App')
  }

  render() {
    return (
      <View>
      <Header/>
      <View style={styles.container}>
      <Text style={styles.textBig}>Login to Stakes!</Text>
      <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
      <Text style={styles.buttonLabel}>Tap to Register with Facebook</Text>
      </TouchableOpacity>
      </View>
      </View>
    )
  }
}

export default LoginScreen;

//Styles
const styles = StyleSheet.create({
  container: {
    fontFamily: 'Avenir',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#0074D9',
  },
  buttonGreen: {
    backgroundColor: '#2ECC40'
  },
  buttonLabel: {
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  }
});

function newUser(){
  return new Promise(function(resolve, reject){
    Facebook.logInWithReadPermissionsAsync("507277226286173", {
      permissions: [ 'public_profile', 'user_birthday' ]
    })
    .then(function(response){
      console.log(response)
      if(response.type ==='success'){
        console.log('successful facebook login')
        fetch(`https://graph.facebook.com/me?access_token=${response.token}`)
        .then(function(resp){
          return resp.json();
        })
        .then(function(data) {
          axios({
            url: 'https://stakes.herokuapp.com/register',
            method: 'post',
            data:{
              facebookId: data.id,
              access_token: response.token,
              friends_list: [],
              name: data.name
            }
          })
          .then(function(user){
            console.log('*********I AM HERE NOW*********')
            console.log(user)
            resolve(user);
          })
          .catch((err)=>{
            console.log(err)
          })
        })
      }else{
        reject('login failed or canceled');
      }
    })
    .catch(function(err){
      reject(err)
    })
  })
}
