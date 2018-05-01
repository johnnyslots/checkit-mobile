import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Button, FormLabel, FormInput, List, ListItem } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import { StackNavigator } from 'react-navigation';
import booksStyles from '../styles/books';
import axios from 'axios';
import socket from '../socket';
import ipAddress from '../utils';

export default class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      socketData: {},
      user: {},
      bookToAdd: '',
      notes: '',
      showAlert: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSocket = this.handleSocket.bind(this);
    this.handleDetailsPress = this.handleDetailsPress.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.handleIncomingRecConfirmation = this.handleIncomingRecConfirmation.bind(this);
  }

  componentDidMount() {
    const user = this.props.navigation.state.params.user;
    const userId = user.id;

    axios.get(`${ipAddress}/api/recommendations/books/${userId}`)
    .then(res => res.data)
    .then(books => {
      this.setState({books, user});
      this.handleSocket();
    })
    .catch(err => console.log(err));
  }

  static navigationOptions = {
    title: 'Welcome'
  }

  handleChange(book) {
    this.setState({bookToAdd: book});
  }

  handleNotesChange(notes) {
    this.setState({notes});
  }

  handleSubmit() {
    const postData = {
      category: 'books',
      title: this.state.bookToAdd,
      notes: this.state.notes
    }
    const user = this.state.user;

    axios.post(`${ipAddress}/api/recommendations`, {postData, user})
    .then(res => res.data)
    .then(updatedRecs => {
      const updatedBooks = updatedRecs.filter(rec => {
        return rec.item.category === 'books'
      })
      this.setState({
        books: updatedBooks,
        socketData: {},
        bookToAdd: '',
        notes: ''
      })
    })
    .catch(err => console.log(err));
  }

  handleSocket() {
    socket.on('newRec', (socketData) => {
      if(socketData.email === this.state.user.email) {
        this.setState({socketData, showAlert: true})
      }
    })
  }


  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  handleIncomingRecConfirmation() {
    const user = this.state.user;
    const { navigate } = this.props.navigation;
    navigate('PendingRecs', {user})
    this.hideAlert();
  }

  handleDetailsPress(bookRec) {
    const { navigate } = this.props.navigation;
    const user = this.state.user;
    navigate('BookInfo', {bookRec, user})
  }

  render() {
    const booksList = this.state.books;
    const {showAlert} = this.state;

    let title;
    let fullName;
    if(this.state.socketData.title) {
      title = this.state.socketData.title;
      fullName = this.state.socketData.sender.fullName;
    }
    const newRecAlert = `You received a new recommendation from ${fullName}!`

    return (
      <View style={booksStyles.container}>
        <Text style={booksStyles.header}>Books</Text>

        {
          showAlert ?
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title={newRecAlert}
              message="Do you want to see more details?"
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="Not now"
              confirmText="More details"
              confirmButtonColor="#aaa"
              cancelButtonColor='#aaa'
              onCancelPressed={() => {
                this.hideAlert();
              }}
              onConfirmPressed={() => {
                this.handleIncomingRecConfirmation();
              }}
            />
          :
          <View>
            <View style={booksStyles.inputContainer}>
              <FormInput
                inputStyle={booksStyles.addBookInput}
                onChangeText={this.handleChange}
                value={this.state.bookToAdd}
                placeholder="Add book to my list"
              />
              <FormInput
                inputStyle={booksStyles.addBookInput}
                onChangeText={this.handleNotesChange}
                value={this.state.notes}
                placeholder="Notes"
              />
            </View>
            <Button
              buttonStyle={booksStyles.button} textStyle={booksStyles.buttonText} raised
              onPress={this.handleSubmit}
              title="Add book"
            />
              <List containerStyle={booksStyles.list}>
            {
                booksList.map((bookRec) => {
                  return (
                    <View key={bookRec.id}>
                      <ListItem containerStyle={booksStyles.listContainer} title={bookRec.item.title} titleStyle={booksStyles.title} onPress={() => this.handleDetailsPress({bookRec})} />
                    </View>
                  )
                })
            }
             </List>
          </View>
        }
      </View>
    )
  }
}
