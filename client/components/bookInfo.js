import React from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import { StackNavigator } from 'react-navigation';
import bookInfoStyles from '../styles/bookInfo';
import { months } from '../utils';
// import Hyperlink from 'react-native-hyperlink'

const bookInfo = ({navigation}) => {
  const info = navigation.state.params.bookRec;
  const bookRec = info.bookRec;
  const dateSplit = info.bookRec.createdAt.slice(0, 10).split('-');
  const recommendedAt = `${months[dateSplit[1]]} ${dateSplit[2]}, ${dateSplit[0]}`;
  const url = bookRec.item.findOnGoogle

  return (
  <View style={bookInfoStyles.container}>
    <Text>{bookRec.item.title}</Text>
    {
      bookRec.from ?
      <Text>Recommended by {bookRec.from.fullName} on {recommendedAt}</Text>
      : <Text>Recommended by me on {recommendedAt}</Text>
    }
    <Text>Notes: {bookRec.notes}</Text>
    <Text style={{color: 'blue'}} onPress={() => Linking.openURL(url)}>Find it on Google</Text>
  </View>
  )
}

export default bookInfo;
