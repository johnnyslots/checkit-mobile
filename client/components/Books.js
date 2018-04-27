import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import booksStyles from '../styles/books';
import axios from 'axios';
import socket from '../socket';

export default class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      socketData: {},
      bookToAdd: ''
    }

    // this.socket = SocketIOClient('http://localhost:8080', {jsonp: false});
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.handleSocket = this.handleSocket.bind(this);
    this.handleSocket();
  }

  componentDidMount() {
    console.log('WORKING ON PHONE')

    axios.get('http://172.16.21.200:8080/api/recommendations/books')
    .then(res => res.data)
    .then(books => {
      this.setState({books});
    })
    .catch(err => console.log(err));
  }

  handleSocket() {
    socket.on('newRec', (socketData) => {
      console.log('DATA!!!!!', socketData)
      this.setState({socketData})
    })
  }

  handleChange(book) {
    this.setState({bookToAdd: book});
  }

  handleSubmit() {
    let bookToAdd = this.state.bookToAdd;
    axios.post('http://172.16.21.200:8080/api/recommendations', {
      category: 'books',
      title: bookToAdd,
      notes: 'some notes!'
    })
    .then(res => res.data)
    .then(updatedRecs => {
      const updatedBooks = updatedRecs.filter(rec => {
        return rec.item.category === 'books'
      })
      this.setState({
        books: updatedBooks,
        bookToAdd: ''
      })
    })
    .catch(err => console.log(err));
  }

  deleteBook(bookToDelete) {
    //axios.delete
    const booksArray = this.state.books;
    const index = booksArray.indexOf(bookToDelete.book);
    booksArray.splice(index, 1)
    this.setState({books: booksArray});
  }

  render() {
    const booksList = this.state.books;
    console.log('STATE', this.state)


    return (
      <View style={booksStyles.container}>
        <Text>Books To read</Text>
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
          this.state.socketData.title ?
          <Text>{this.state.socketData.title}</Text>
          : null
        }
        {
          booksList.map((book) => {
            return (
              <View key={book.id}>
                <Text>{book.item.title}</Text>
                <Button onPress={() => this.deleteBook({book})} title="Delete"/>
              </View>
            )
          })
        }
      </View>
    )
  }
}
