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
import { StackNavigator } from 'react-navigation';
import { MapView, Location, Permissions } from 'expo';

global.__DEV__ = false

//Screens
class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };

  press() {
    this.props.navigation.navigate('LoginPage')
  }

  register() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>Login to HoHoHo!</Text>
        <TouchableOpacity onPress={ () => {this.press()} } style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonLabel}>Tap to Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
          <Text style={styles.buttonLabel}>Tap to Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.register = this.register.bind(this);
  }
  static navigationOptions = {
    title: 'Register',
  };

  register() {
    var that = this;
    if(this.state.username !== '' && this.state.password !== '') {
      fetch('https://hohoho-backend.herokuapp.com/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: that.state.username,
          password: that.state.password,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        /* do something with responseJson and go back to the Login view but
        * make sure to check for responseJson.success! */
        console.log(responseJson)
        if(responseJson.success) {
          this.props.navigation.goBack();
        } else {
          alert('Already have an account')
        }
      })
      .catch((err) => {
        /* do something if there was an error with fetching */
        console.log('error:' + err)
      });
    } else {
      alert('Username or password fields cannot be empty!')
    }
  } //

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={{height: 40, borderStyle: 'solid', borderWidth: 2, borderColor: 'lightgrey', padding: 5}} placeholder="Enter your username" onChangeText={(text) => this.setState({username: text})} />
        <Text>{"\n"}</Text>
        <TextInput style={{height: 40, borderStyle: 'solid', borderWidth: 2, borderColor: 'lightgrey', padding: 5}} placeholder="Enter your password" onChangeText={(text) => this.setState({password: text})} />
        <Text>{"\n"}</Text>
        <TouchableOpacity style={styles.button} onPress={() => {this.register()}}>
          <Text style={{color: 'white', fontSize: 30}}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class LoggingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.login = this.login.bind(this);
  }
  static Options = {
    title: 'Login Page',
  };

  componentDidMount() {
    AsyncStorage.getItem('user')
    .then(result => {
      var parsedResult = JSON.parse(result);
      var username = parsedResult.username;
      var password = parsedResult.password;
      if (username && password) {
        this.setState({username: username, password: password})
        this.login()
        // .then(resp => resp.json())
        // .then(checkResponseAndGoToMainScreen);
      }
      // Don't really need an else clause, we don't do anything in this case.
    })
    .catch(err => { /* handle the error */ })
  }

  login() {
    var that = this;
    if(this.state.username !== '' && this.state.password !== '') {
      fetch('https://hohoho-backend.herokuapp.com/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: that.state.username,
          password: that.state.password,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        /* do something with responseJson and go back to the Login view but
        * make sure to check for responseJson.success! */
        console.log(responseJson)
        if(responseJson.success) {
          AsyncStorage.setItem('user', JSON.stringify({
            username: that.state.username,
            password: that.state.password
          }));
          this.props.navigation.navigate('Users');
        } else {
          that.setState({username: '', password: ''})
          alert('Invalid access');
        }
      })
      .catch((err) => {
        /* do something if there was an error with fetching */
        console.log('error:' + err)
      });
    } else {
      alert('Username or password fields cannot be empty!')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={{height: 40, borderStyle: 'solid', borderWidth: 2, borderColor: 'lightgrey', padding: 5}} placeholder="Username" onChangeText={(text) => this.setState({username: text})} />
        <Text>{"\n"}</Text>
        <TextInput style={{height: 40, borderStyle: 'solid', borderWidth: 2, borderColor: 'lightgrey', padding: 5}} placeholder="Password" onChangeText={(text) => this.setState({password: text})} />
        <Text>{"\n"}</Text>
        <TouchableOpacity style={styles.button} onPress={() => {this.login()}}>
          <Text style={{color: 'white', fontSize: 30}}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class UsersScreen extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      image: '',
    };
    // this.uploadPhoto = this.uploadPhoto.bind(this);
  }

  static navigationOptions = (props) => ({
    title: 'Users', //you put the title you want to be displayed here
    headerRight:
    <TouchableOpacity onPress={() => (props.navigation.navigate('Messages'))}>
      <Text>Messages</Text>
    </TouchableOpacity>,
  });

  // uploadPhoto() {
  //   ImagePickerIOS.openSelectDialog({}, imageUri => {
  //     this.setState({ image: imageUri });
  //   }, error => alert('File not uploaded'));
  // }

  longTouchUser(user, location) {
    // console.log(user, location);
    // this.uploadPhoto();
    // var photo = {
    //   uri: this.state.image,
    //   type: 'image/jpeg',
    //   name: user.body,
    // }
    //
    // var newbody = new FormData();
    // newbody.append('photo', photo);
    // newbody.append('title', user.body);

    fetch('https://hohoho-backend.herokuapp.com/messages', {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: JSON.stringify({
        to: user._id,
        location: {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        },
        // photo: newbody
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success) {
        Alert.alert(
          'Sucess!',
          "You have sent your Message!",
          [{text: 'Dismiss Button'}] // Button
        )
      } else {
        Alert.alert(
          'Failure!',
          'Message not sent!',
          [{text: 'Dismiss Button'}] // Button
        )
      }
    })
    .catch((err) => {
      console.log('error: ' + err)
    })
  }

  touchUser(user) {
    console.log(user);

    fetch('https://hohoho-backend.herokuapp.com/messages', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: user._id,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success) {
        Alert.alert(
          'Sucess!',
          "Your HoHoHo to " + user.username + ' has been sent.',
          [{text: 'Dismiss Button'}] // Button
        )
      } else {
        Alert.alert(
          'Failure!',
          'Message not sent!',
          [{text: 'Dismiss Button'}] // Button
        )
      }
    })
    .catch((err) => {
      console.log('error: ' + err)
    })
  }

  componentDidMount() {
    var that = this;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    fetch('https://hohoho-backend.herokuapp.com/users', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      /* do something with responseJson and go back to the Login view but
      * make sure to check for responseJson.success! */
      that.setState({dataSource: ds.cloneWithRows(responseJson.users)})
    })
    .catch((err) => {
      /* do something if there was an error with fetching */
      console.log('error:' + err)
    });
  }

  sendLocation = async(user) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      //handle failure
      alert('FAILURE')
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    console.log('location: ' + location);
    this.longTouchUser(user, location);
  }

  render() {
    return (
      <View style={styles.containerFull}>
        <ListView dataSource={this.state.dataSource} renderRow={(rowData) =>
          <TouchableOpacity style={{flex: 1, borderBottomColor: 'black', borderBottomWidth: 1, backgroundColor: '#F5FCFF', alignItems: 'center', padding: 10}} onPress={this.touchUser.bind(this, rowData)} onLongPress={this.sendLocation.bind(this, rowData)} delayLongPress={100}>
            <Text>{rowData.username}</Text>
          </TouchableOpacity>} />
        </View>
      )
    }
  }

  global.data = [];
  class MessageScreen extends React.Component {
    constructor(props) {
      super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows([]),
        refreshing: false,
      };
      this._onRefresh = this._onRefresh.bind(this);
    }
    static navigationOptions = (props) => ({
      title: 'Messages', //you put the title you want to be displayed here
    });

    _onRefresh() {
      this.setState({refreshing: true});
      this.fetchData();
      this.setState({refreshing: false});
    }

    fetchData() {
      var that = this;
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      fetch('https://hohoho-backend.herokuapp.com/messages', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        /* do something with responseJson and go back to the Login view but
        * make sure to check for responseJson.success! */
        console.log(responseJson.messages)
        that.setState({dataSource: ds.cloneWithRows(responseJson.messages)})
      })
      .catch((err) => {
        /* do something if there was an error with fetching */
        alert('Some error: ' + err)
      });
    }

    componentDidMount() {
      setInterval(this._onRefresh, 10000)
    }

    singleMap(rowData) {
      data = rowData;
      this.props.navigation.navigate('SingleMap');
    }

    render() {
      return (
        <View style={styles.containerFull}>
          <ListView refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />}
            dataSource={this.state.dataSource} renderRow={(rowData) =>
              <View style={{flex: 1, borderBottomColor: 'black', borderBottomWidth: 1, backgroundColor: '#F5FCFF', alignItems: 'center', padding: 10}} >
                <Text>From: {rowData.from.username}</Text>
                <Text>To: {rowData.to.username}</Text>
                <Text>Message: {rowData.body}</Text>
                <Text>When: {rowData.timestamp}</Text>
                <View style={{flexDirection: 'row'}}>
                  {rowData.location && rowData.location.longitude ?
                    <TouchableOpacity style={{flex: 1}} onPress={this.singleMap.bind(this, rowData)}>
                      <MapView
                        style={{width: 200, height: 200}}
                        showsUserLocation={true}
                        scrollEnabled={false}
                        region={{
                          latitude: rowData.location.latitude,
                          longitude: rowData.location.longitude,
                          longitudeDelta: 1,
                          latitudeDelta: 1,
                        }}>
                          <MapView.Marker
                            coordinate= {{
                              latitude: rowData.location.latitude,
                              longitude: rowData.location.longitude
                            }} />
                        </MapView>
                      </TouchableOpacity>
                      : <Text>Location: None</Text>
                    }
                    {rowData.photo ?
                      <Image source={{uri: rowData.photo}} style={{width: 200, height: 200}}/>
                      : <Text>Photo: None</Text>
                    }
                </View>
              </View>}
            />
          </View>
        )
      }
    }

      class MapScreen extends React.Component {
        constructor(props) {
          super(props)
        }
        static navigationOptions = (props) => ({
          title: 'Single Map'
        })

        render() {
          return (
            <View style={{flex: 1, padding: 10}}>
              <MapView
                style={{width: '100%', height: '100%'}}
                showsUserLocation={true}
                scrollEnabled={true}
                region={{
                  latitude: data.location.latitude,
                  longitude: data.location.longitude,
                  longitudeDelta: 1,
                  latitudeDelta: 1,
                }}>
                  <MapView.Marker
                    coordinate= {{
                      latitude: data.location.latitude,
                      longitude: data.location.longitude
                    }} />
                </MapView>
            </View>
          )
        }

      }






      //Navigator
      export default StackNavigator({
        Login: {
          screen: LoginScreen,
        },
        Register: {
          screen: RegisterScreen,
        },
        LoginPage: {
          screen: LoggingScreen,
        },
        Users: {
          screen: UsersScreen,
        },
        Messages: {
          screen: MessageScreen,
        },
        SingleMap: {
          screen: MapScreen,
        }
      }, {initialRouteName: 'Login'});


      //Styles
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 3,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF',
        },
        containerFull: {
          flex: 1,
          padding: 3,
          alignItems: 'stretch',
          backgroundColor: '#F5FCFF',
        },
        welcome: {
          fontSize: 20,
          textAlign: 'center',
          margin: 10,
        },
        instructions: {
          textAlign: 'center',
          color: '#333333',
          marginBottom: 5,
        },
        textBig: {
          fontSize: 36,
          textAlign: 'center',
          margin: 10,
        },
        button: {
          alignSelf: 'stretch',
          paddingTop: 10,
          paddingBottom: 10,
          marginTop: 10,
          marginLeft: 5,
          marginRight: 5,
          borderRadius: 5,
          backgroundColor: '#FF585B',
          justifyContent: 'center',
          alignItems: 'center',
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
          textAlign: 'center',
          fontSize: 16,
          color: 'white'
        }
      });
