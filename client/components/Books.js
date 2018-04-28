import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
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
      bookToAdd: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.handleSocket = this.handleSocket.bind(this);
    this.dismissRec = this.dismissRec.bind(this);
    this.handleDetailsPress = this.handleDetailsPress.bind(this);
    this.handleSocket();
  }

  componentDidMount() {
    const user = this.props.navigation.state.params.user;

    axios.get(`${ipAddress}/api/recommendations/books`)
    .then(res => res.data)
    .then(books => {
      this.setState({books, user});
    })
    .catch(err => console.log(err));
  }

  static navigationOptions = {
    title: 'Welcome'
  }

  handleChange(book) {
    this.setState({bookToAdd: book});
  }

  handleSubmit() {
    let bookToAdd = {
      category: 'books',
      title: this.state.bookToAdd,
      notes: 'some notes!'
    }
    let postData = this.state.socketData.category ? this.state.socketData : bookToAdd;
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
        bookToAdd: ''
      })
    })
    .catch(err => console.log(err));
  }

  handleSocket() {
    socket.on('newRec', (socketData) => {
      this.setState({socketData})
    })
  }

  dismissRec() {
    this.setState({
      socketData: {}
    })
  }

  handleDetailsPress(bookRec) {
    const { navigate } = this.props.navigation;
    navigate('bookInfo', {bookRec})
  }

  deleteBook(bookRecToDelete) {
    const id = bookRecToDelete.bookRec.id;
    axios.delete(`${ipAddress}/api/recommendations/${id}`)
    .then(res => res.data)
    .then(() => {
      const currentBooks = this.state.books
      let updatedBooks = []
      for(let i = 0; i < currentBooks.length; i++) {
        if(currentBooks[i].id !== id) {
          updatedBooks.push(currentBooks[i])
        }
      }
      this.setState({books: updatedBooks})
    })
    .catch(err => console.log(err))
  }

  render() {
    const booksList = this.state.books;
    let title;
    let fullName;
    if(this.state.socketData.title) {
      title = this.state.socketData.title;
      fullName = this.state.socketData.sender.fullName;
    }

    return (
      <View style={booksStyles.container}>
        <Text>Books To read</Text>
        {
          this.state.socketData.title ?
          <View>
            <Text>You received a new book recommendation from {fullName}!</Text>
            <Text>Book Title: {this.state.socketData.title}</Text>
            {
              this.state.socketData.notes ?
              <Text>Notes: {this.state.socketData.notes}</Text>
              : null
            }
            <Button
              onPress={this.handleSubmit}
              title="Add recommendation to my list"
            />
            <Button
              onPress={this.dismissRec}
              title="Don't add to my list"
            />
          </View>
          : null
        }
        <TextInput
          onChangeText={this.handleChange}
          value={this.state.bookToAdd}
          placeholder="Add book to my list"
        />
        <Button
          onPress={this.handleSubmit}
          title="Add book"
        />
        {
          booksList.map((bookRec) => {
            return (
              <View key={bookRec.id}>
                <Text>{bookRec.item.title}</Text>
                <Button onPress={() => this.handleDetailsPress({bookRec})} title="See more details" />
                <Button onPress={() => this.deleteBook({bookRec})} title="Delete"/>
              </View>
            )
          })
        }
      </View>
    )
  }
}
