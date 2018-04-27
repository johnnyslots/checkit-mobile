import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import loginStyles from '../styles/login';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      incorrect: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = {
    title: 'Welcome',
  }

  handleEmailChange(email) {
    this.setState({email})
  }

  handlePasswordChange(password) {
    this.setState({password})
  }

  handleSubmit() {

    axios.post('http://172.16.21.200:8080/auth/login', this.state)
    .then(res => res.data)
    .then(user => {
      const { navigate } = this.props.navigation;
      navigate('Home')
    })
    .catch(err => {
      console.log(err)
      this.setState({incorrect: true})
    })

  }

render() {

    return (
      <View style={loginStyles.container}>
        <Text>CheckIt</Text>
        <TextInput
          onChangeText={this.handleEmailChange}
          value={this.state.email}
          placeholder="Email"
        />
        <TextInput
          onChangeText={this.handlePasswordChange}
          value={this.state.password}
          placeholder="Password"
        />
        {
          this.state.incorrect ?
          <View>
            <Text>Incorrect email or password</Text>
          </View>
          : null
        }
        <Button
          title="Login"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

// const Login = ({navigation}) => (
//   <View style={loginStyles.container}>
//     <Text>CheckIt</Text>
//     <Text>Login</Text>
//     <Button onPress={() => navigation.navigate('Home')} title="Login"/>
//   </View>
// )

// export default Login;
