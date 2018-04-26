import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import booksStyles from '../styles/books';
import axios from 'axios';


// const books = [
//   'The Catcher in the Rye',
//   'To Kill a Mockingbird',
//   'The Great Gatsby',
//   'In Search of Lost Time',
//   'War and Peace'
// ]

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      bookToAdd: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/books')
    .then(res => res.data)
    .then(books => {
      this.setState({books});
    })
    .catch(err => console.log(err));
  }

  handleChange(book) {
    this.setState({bookToAdd: book});
  }

  handleSubmit() {
    let bookToAdd = this.state.bookToAdd;
    this.setState({
      books: [...this.state.books, bookToAdd],
      bookToAdd: ''
    })
  }

  deleteBook(bookToDelete) {
    const booksArray = this.state.books;
    const index = booksArray.indexOf(bookToDelete.book);
    booksArray.splice(index, 1)
    this.setState({books: booksArray});
  }

  render() {
    const booksList = this.state.books;
    console.log('LIST', booksList)

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
          booksList.map((book) => {
            return (
              <View key={book.id}>
                <Text>{book.title}</Text>
                <Button onPress={() => this.deleteBook({book})} title="Delete"/>
              </View>
            )
          })
        }
      </View>
    )
  }
}
