import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import bookInfoStyles from '../styles/bookInfo';



const bookInfo = ({navigation}) => {
  const info = navigation.state.params.bookRec;
  const bookRec = info.bookRec;

  return (
  <View style={bookInfoStyles.container}>
    <Text>{bookRec.item.title}</Text>
    <Text>{bookRec.notes}</Text>
  </View>
  )
}

export default bookInfo;
