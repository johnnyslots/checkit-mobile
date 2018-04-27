import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Picker } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import sendRecStyles from '../styles/sendRec';
import axios from 'axios';
window.navigator.userAgent = "react-native"
import SocketIOClient from 'socket.io-client';

export default class SendRec extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '',
      title: '',
      notes: ''
    }

    this.socket = SocketIOClient('http://localhost:8080', {jsonp: false});
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.socket.emit('newRec', this.state);
    this.setState({
      category: '',
      title: '',
      notes: ''
    })
  }

  render() {
    // console.log('STATE!', this.state)

    return (
      <View style={sendRecStyles.container}>
        <Text>Send recommendation</Text>
        <FormLabel>Category</FormLabel>
        <FormInput onChangeText={this.handleCategoryChange} />
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={this.handleTitleChange} />
        <FormLabel>Notes</FormLabel>
        <FormInput onChangeText={this.handleNotesChange}/>
        <Button onPress={this.handleSubmit} title="Send"/>
      </View>
    )
  }
}




// <FormValidationMessage>This field is required</FormValidationMessage>