import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import homeStyles from '../styles/home';

const Home = ({navigation}) => (
  <View style={homeStyles.container}>
    <Text>CheckIt</Text>
    <Button onPress={() => navigation.navigate('MyLists')} title="My lists"/>
    <Button onPress={() => navigation.navigate('SendRec')} title="Send recommendation"/>
  </View>
)

export default Home;
