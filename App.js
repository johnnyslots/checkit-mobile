import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './client/components/Login';
import Home from './client/components/Home';
import MyLists from './client/components/MyLists';
import Books from './client/components/Books';
import SendRec from './client/components/SendRec';
import bookInfo from './client/components/bookInfo';

const RootNavigator = StackNavigator({
  Main: {
      screen: Login,
      navigationOptions: {
        headerTitle: 'Login',
      }
  },
  Home: {
      screen: Home,
      navigationOptions: {
        headerTitle: 'Home',
      }
  },
  MyLists: {
    screen: MyLists,
    navigationOptions: {
      headerTitle: 'My Lists'
    }
  },
  Books: {
    screen: Books,
    navigationOptions: {
      headerTitle: 'Books'
    }
  },
  bookInfo: {
    screen: bookInfo,
    navigationOptions: {
      headerTitle: 'Book Info'
    }
  },
  SendRec: {
    screen: SendRec,
    navigationOptions: {
      headerTitle: 'Send recommendation'
    }
  }
});

export default RootNavigator

