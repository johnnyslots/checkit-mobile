import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Picker } from 'react-native';
// import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import requestRecStyles from '../styles/requestRec';
import axios from 'axios';
import ipAddress from '../utils';
import socket from '../socket';

export default class RequestRec extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      category: '',
      title: '',
      message: '',
      incorrectEmail: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const user = this.props.navigation.state.params.user;
  }

  handleEmailChange(email) {
    this.setState({email});
  }

  handleCategoryChange(category) {
    this.setState({category});
  }

  handleTitleChange(title) {
    this.setState({title});
  }

  handleMessageChange(message) {
    this.setState({message});
  }

  handleSubmit() {
    const userEmail = this.state.email
    axios.get(`${ipAddress}/api/users/${userEmail}`)
    .then(res => {
      if(res.data.email) {
        socket.emit('requestRec', this.state);
        this.setState({
          email: '',
          category: '',
          title: '',
          message: '',
          incorrectEmail: false
        })
      }
    })
    .catch(err => {
      this.setState({incorrectEmail: true})
      console.log(err)
    })
  }

  render() {

    return (
      <View style={requestRecStyles.container}>
        <Text>Request recommendation</Text>
        <TextInput
          onChangeText={this.handleEmailChange}
          value={this.state.email}
          placeholder="Send to (email)"
        />
        {
          this.state.incorrectEmail ?
          <Text>User doesn't exist</Text>
          : null
        }
        <TextInput
          onChangeText={this.handleCategoryChange}
          value={this.state.category}
          placeholder="Category"
        />
        <TextInput
          onChangeText={this.handleTitleChange}
          value={this.state.title}
          placeholder="Title"
        />
        <TextInput
          onChangeText={this.handleMessageChange}
          value={this.state.message}
          placeholder="Message"
        />
        <Button onPress={this.handleSubmit} title="Send request"/>
      </View>
    )
  }
}
