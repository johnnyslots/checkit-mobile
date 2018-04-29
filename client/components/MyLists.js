import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import myListsStyles from '../styles/myLists';

const MyLists = ({navigation}) => {
  const user = navigation.state.params.user;

  return (
  <View >
    <Text style={myListsStyles.header}>My Lists</Text>
    <Button buttonStyle={myListsStyles.button} onPress={() => navigation.navigate('Books', {user})} title="Books"/>
    <Button buttonStyle={myListsStyles.button} onPress={() => navigation.navigate('Movies')} title="Movies"/>
    <Button buttonStyle={myListsStyles.button} onPress={() => navigation.navigate('Podcasts')} title="Podcasts"/>
    <Button buttonStyle={myListsStyles.button} onPress={() => navigation.navigate('TVShows')} title="TV Shows"/>
  </View>
  )
}

export default MyLists;
