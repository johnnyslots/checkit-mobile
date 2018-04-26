import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import myListsStyles from '../styles/myLists';

const MyLists = ({navigation}) => (
  <View style={myListsStyles.container}>
    <Text>My Lists</Text>
    <Button onPress={() => navigation.navigate('Books')} title="Books"/>
    <Button onPress={() => navigation.navigate('Movies')} title="Movies"/>
    <Button onPress={() => navigation.navigate('TVShows')} title="TV Shows"/>
  </View>
)

export default MyLists;
