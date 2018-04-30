import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Picker, Alert } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import sendRecStyles from '../styles/sendRec';
import axios from 'axios';
import socket from '../socket';
import ipAddress from '../utils';

export default class SendRec extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '',
      title: '',
      notes: '',
      email: '',
      incorrectEmail: false,
      sender: {}
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({sender: this.props.navigation.state.params.user})
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

  handleNotesChange(notes) {
    this.setState({notes});
  }

  handleSubmit() {
    const userEmail = this.state.email
    const postData = this.state
    const sender = this.state.sender
    axios.get(`${ipAddress}/api/users/${userEmail}`)
    .then(res => {
      if(res.data.email) {
        axios.post(`${ipAddress}/api/recommendations`, {postData, sender, userEmail})
        .catch(err => console.log(err))
        socket.emit('newRec', this.state);
        this.setState({
          email: '',
          category: '',
          title: '',
          notes: '',
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
      <View>
        <Text style={sendRecStyles.header}>Send recommendation</Text>
        <View style={sendRecStyles.inputContainer}>
          <FormInput
            onChangeText={this.handleEmailChange}
            value={this.state.email}
            placeholder="Send to (email)"
          />
          {
            this.state.incorrectEmail ?
            <Text>User doesn't exist</Text>
            : null
          }
          <FormInput
            inputStyle={sendRecStyles.input}
            onChangeText={this.handleCategoryChange}
            value={this.state.category}
            placeholder="Category"
          />
          <FormInput
            inputStyle={sendRecStyles.input}
            onChangeText={this.handleTitleChange}
            value={this.state.title}
            placeholder="Title"
          />
          <FormInput
            inputStyle={sendRecStyles.input}
            onChangeText={this.handleNotesChange}
            value={this.state.notes}
            placeholder="Notes"
          />
        </View>
        <Button buttonStyle={sendRecStyles.button} onPress={this.handleSubmit} title="Send"/>
      </View>
    )
  }
}
