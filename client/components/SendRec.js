import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Picker } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
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
    axios.get(`${ipAddress}/api/users/${userEmail}`)
    .then(res => {
      if(res.data.email) {
        //axios.post
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
      <View style={sendRecStyles.container}>
        <Text>Send recommendation</Text>
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
          onChangeText={this.handleNotesChange}
          value={this.state.notes}
          placeholder="Notes"
        />
        <Button onPress={this.handleSubmit} title="Send"/>
      </View>
    )
  }
}


//         <FormLabel>Category</FormLabel>
//         <FormInput onChangeText={this.handleCategoryChange} />
//         <FormLabel>Title</FormLabel>
//         <FormInput onChangeText={this.handleTitleChange} />
//         <FormLabel>Notes</FormLabel>
//         <FormInput onChangeText={this.handleNotesChange}/>

// // <FormValidationMessage>This field is required</FormValidationMessage>
