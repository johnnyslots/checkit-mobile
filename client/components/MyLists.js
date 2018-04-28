import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import myListsStyles from '../styles/myLists';

const MyLists = ({navigation}) => {
  const user = navigation.state.params.user;

  return (
  <View style={myListsStyles.container}>
    <Text>My Lists</Text>
    <Button onPress={() => navigation.navigate('Books', {user})} title="Books"/>
    <Button onPress={() => navigation.navigate('Movies')} title="Movies"/>
    <Button onPress={() => navigation.navigate('Podcasts')} title="Podcasts"/>
    <Button onPress={() => navigation.navigate('TVShows')} title="TV Shows"/>
  </View>
  )
}

export default MyLists;
