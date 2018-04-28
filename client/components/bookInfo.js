import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import bookInfoStyles from '../styles/bookInfo';

const bookInfo = ({navigation}) => {
  const info = navigation.state.params.bookRec;
  const bookRec = info.bookRec;
  const dateSplit = info.bookRec.createdAt.slice(0, 10).split('-');
  const months = {'01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December'}
  const recommendedAt = `${months[dateSplit[1]]} ${dateSplit[2]}, ${dateSplit[0]}`

  return (
  <View style={bookInfoStyles.container}>
    <Text>{bookRec.item.title}</Text>
    {
      bookRec.from ?
      <Text>Recommended by {bookRec.from.fullName} on {recommendedAt}</Text>
      : <Text>Recommended by me on {recommendedAt}</Text>
    }
    <Text>Notes: {bookRec.notes}</Text>
  </View>
  )
}

export default bookInfo;
