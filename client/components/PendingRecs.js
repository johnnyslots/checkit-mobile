import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import pendingRecsStyles from '../styles/pendingRecs';
import axios from 'axios';
// import socket from '../socket';
import ipAddress, { months } from '../utils';

export default class PendingRecs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingRecs: [],
      user: {}
    }

    this.addRec = this.addRec.bind(this)
    this.deleteRec = this.deleteRec.bind(this)
  }

  componentDidMount() {
    const user = this.props.navigation.state.params.user;
    const userId = user.id;

    axios.get(`${ipAddress}/api/recommendations/pending/${userId}`)
    .then(res => res.data)
    .then(pendingRecs => {
      this.setState({pendingRecs, user});
    })
    .catch(err => console.log(err));
  }

  addRec(recToAdd) {
    const recId = recToAdd.rec.id
    axios.put(`${ipAddress}/api/recommendations/pending/${recId}`)
    .then(res => res.data)
    .then(() => {
      const currentPendingRecs = this.state.pendingRecs
      let updatedPendingRecs = []
      for(let i = 0; i < currentPendingRecs.length; i++) {
        if(currentPendingRecs[i].id !== recId) {
          updatedPendingRecs.push(currentPendingRecs[i])
        }
      }
      this.setState({pendingRecs: updatedPendingRecs})
    })
    .catch(err => console.log(err));
  }

  deleteRec(recToDelete) {
    const recId = recToDelete.rec.id
    axios.delete(`${ipAddress}/api/recommendations/${recId}`)
    .then(res => res.data)
    .then(() => {
      const currentPendingRecs = this.state.pendingRecs
      let updatedPendingRecs = []
      for(let i = 0; i < currentPendingRecs.length; i++) {
        if(currentPendingRecs[i].id !== recId) {
          updatedPendingRecs.push(currentPendingRecs[i])
        }
      }
      this.setState({pendingRecs: updatedPendingRecs})
    })
    .catch(err => console.log(err));
  }

  render () {
    const pending = this.state.pendingRecs;
    const recommendedAt = pending.length && pending.map(rec => {
      const dateSplit = rec.createdAt.slice(0, 10).split('-');
      return `${months[dateSplit[1]]} ${dateSplit[2]}, ${dateSplit[0]}`
    })

    return (
      <View style={pendingRecsStyles.container}>
        <Text>My Pending Recommendations</Text>
        {
          pending.length && pending.map((rec, i) => {
            return (
              <View key={rec.id}>
                <Text>From: {rec.from.fullName} </Text>
                <Text>On: {recommendedAt[i]}</Text>
                <Text>Category: {rec.item.category} </Text>
                <Text>Title: {rec.item.title} </Text>
                <Text>Notes: {rec.notes} </Text>
                <Button onPress={() => this.addRec({rec})} title="Add recommendation to my list"/>
                <Button onPress={() => this.deleteRec({rec})} title="Dismiss recommendation"/>
              </View>
            )
          })
        }
      </View>
    )
  }
}
