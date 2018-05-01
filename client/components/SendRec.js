import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Picker, Alert } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
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
      sender: {},
      recSent: false
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
    const lowerCaseCategory = category.toLowerCase();
    this.setState({category: lowerCaseCategory});
  }

  handleTitleChange(title) {
    this.setState({title});
  }

  handleNotesChange(notes) {
    this.setState({notes});
  }

  handleSubmit() {
    const userEmail = this.state.email.toLowerCase();
    const postData = this.state
    const sender = this.state.sender
    axios.get(`${ipAddress}/api/users/${userEmail}`)
    .then(res => {
      if(res.data.email) {
        return axios.post(`${ipAddress}/api/recommendations`, {postData, sender, userEmail})
        .catch(err => console.log(err))
      }
    })
    .then(() => {
      socket.emit('newRec', this.state);
      this.setState({
        email: '',
        title: '',
        notes: '',
        incorrectEmail: false,
        recSent: true
      })
    })
    .catch(err => {
      this.setState({incorrectEmail: true})
      console.log(err)
    })
  }

  render() {

    const categories = [{
      value: 'Books',
    }, {
      value: 'Movies',
    }, {
      value: 'Podcasts',
    }, {
      value: 'Movies',
    }];

    return (
      <View>
        <Text style={sendRecStyles.header}>Send recommendation</Text>
        <View style={sendRecStyles.inputContainer}>
        {
          this.state.recSent ?
          <Text style={sendRecStyles.recSent}>Your recommendation was sent!</Text>
          : null
        }
          <Dropdown
            label='Category'
            data={categories}
            containerStyle={sendRecStyles.input}
            onChangeText={this.handleCategoryChange}
          />
          <TextField
            containerStyle={sendRecStyles.input}
            onChangeText={this.handleEmailChange}
            value={this.state.email}
            label="Send to (email)"
          />
          {
            this.state.incorrectEmail ?
            <Text>User doesn't exist</Text>
            : null
          }
          <TextField
            containerStyle={sendRecStyles.input}
            onChangeText={this.handleTitleChange}
            value={this.state.title}
            label="Title"
          />
          <TextField
            containerStyle={sendRecStyles.input}
            onChangeText={this.handleNotesChange}
            value={this.state.notes}
            label="Notes"
          />
        </View>
        <Button buttonStyle={sendRecStyles.button} onPress={this.handleSubmit} title="Send"/>
      </View>
    )
  }
}
