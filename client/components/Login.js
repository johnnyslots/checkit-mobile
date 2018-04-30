import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import loginStyles from '../styles/login';
import axios from 'axios';
import ipAddress from '../utils';

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
    title: 'Welcome'
  }

  handleEmailChange(email) {
    this.setState({email})
  }

  handlePasswordChange(password) {
    this.setState({password})
  }

  handleSubmit() {
    axios.post(`${ipAddress}/auth/login`, this.state)
    .then(res => res.data)
    .then(user => {
      const { navigate } = this.props.navigation;
      navigate('Home', {user})
    })
    .catch(err => {
      console.log(err)
      this.setState({
        email: '',
        password: '',
        incorrect: true
      })
    })

  }

render() {

    return (
      <View>
        <Text style={loginStyles.header}>CheckIt</Text>
        <View style={loginStyles.inputContainer}>
          <FormInput
            onChangeText={this.handleEmailChange}
            value={this.state.email}
            placeholder="Email"
          />
          <FormInput
            inputStyle={loginStyles.input}
            onChangeText={this.handlePasswordChange}
            value={this.state.password}
            placeholder="Password"
          />
        </View>
        {
          this.state.incorrect ?
          <View>
            <Text>Incorrect email or password</Text>
          </View>
          : null
        }
        <Button
          buttonStyle={loginStyles.button}
          title="Login"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}
