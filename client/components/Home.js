import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import homeStyles from '../styles/home';

const Home = ({navigation}) => {
  const user = {} || navigation.state.params.user;
  return (
  <View style={homeStyles.container}>
    <Text>CheckIt</Text>
    <Button onPress={() => navigation.navigate('MyLists', {user})} title="My lists"/>
    <Button onPress={() => navigation.navigate('PendingRecs', {user})} title="My pending recommendations"/>
    <Button onPress={() => navigation.navigate('SendRec', {user})} title="Send recommendation"/>
    <Button onPress={() => navigation.navigate('RequestRec', {user})} title="Request recommendation"/>
  </View>
  )
}

export default Home;
