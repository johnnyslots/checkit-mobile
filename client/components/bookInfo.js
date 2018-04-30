import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import { StackNavigator } from 'react-navigation';
import bookInfoStyles from '../styles/bookInfo';
import { months } from '../utils';
import axios from 'axios';
import ipAddress from '../utils';

export default class BookInfo extends Component {
  constructor(props) {
    super(props);

    this.deleteBook = this.deleteBook.bind(this);
  }

  static navigationOptions = {
    title: 'Welcome'
  }

  deleteBook(bookRecToDelete) {
    const id = bookRecToDelete.bookRec.id;
    const user = this.props.navigation.state.params.user
    axios.delete(`${ipAddress}/api/recommendations/${id}`)
    .then(res => res.data)
    .then(() => {
      const { navigate } = this.props.navigation;
      navigate('MyLists', {user})
    })
    .catch(err => console.log(err))
  }

  render() {
    const info = this.props.navigation.state.params.bookRec;
    // const info = navigation.state.params.bookRec;
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
      <Button onPress={() => this.deleteBook({bookRec})} title="Delete from my list"/>
    </View>
    )
  }
}

// export default bookInfo;

// const bookInfo = ({navigation}) => {
//   const info = navigation.state.params.bookRec;
//   const bookRec = info.bookRec;
//   const dateSplit = info.bookRec.createdAt.slice(0, 10).split('-');
//   const recommendedAt = `${months[dateSplit[1]]} ${dateSplit[2]}, ${dateSplit[0]}`;
//   const url = bookRec.item.findOnGoogle

//   return (
//   <View style={bookInfoStyles.container}>
//     <Text>{bookRec.item.title}</Text>
//     {
//       bookRec.from ?
//       <Text>Recommended by {bookRec.from.fullName} on {recommendedAt}</Text>
//       : <Text>Recommended by me on {recommendedAt}</Text>
//     }
//     <Text>Notes: {bookRec.notes}</Text>
//     <Text style={{color: 'blue'}} onPress={() => Linking.openURL(url)}>Find it on Google</Text>
//   </View>
//   )
// }

// export default bookInfo;
