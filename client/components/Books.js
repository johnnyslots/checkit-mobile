import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
// import { List, ListItem } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import booksStyles from '../styles/books';


const books = [
  'The Catcher in the Rye',
  'To Kill a Mockingbird',
  'The Great Gatsby',
  'In Search of Lost Time',
  'War and Peace'
]

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
    this.setState({books});
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
    // console.log('!!!!', this.state)

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
          booksList.map((book, i) => {
            return (
              <View key={i}>
                <Text>{book}</Text>
                <Button onPress={() => this.deleteBook({book})} title="Delete"/>
              </View>
            )
          })
        }
      </View>
    )
  }
}
