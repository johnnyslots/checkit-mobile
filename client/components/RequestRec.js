import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Picker } from 'react-native';
// import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import requestRecStyles from '../styles/requestRec';
// import axios from 'axios';
import socket from '../socket';

export default class RequestRec extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <View style={requestRecStyles.container}>
        <Text>Request recommendation</Text>
        <TextInput
          // onChangeText={this.handleCategoryChange}
          // value={this.state.category}
          placeholder="Category"
        />
        <TextInput
          // onChangeText={this.handleTitleChange}
          // value={this.state.title}
          placeholder="Title"
        />
        <TextInput
          // onChangeText={this.handleNotesChange}
          // value={this.state.notes}
          placeholder="Notes"
        />
        <Button onPress={this.handleSubmit} title="Send"/>
      </View>
    )
  }
}
