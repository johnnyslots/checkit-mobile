import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './client/components/Login';
import Home from './client/components/Home';
import MyLists from './client/components/MyLists';
import Books from './client/components/Books';
import SendRec from './client/components/SendRec';
import RequestRec from './client/components/RequestRec';
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
  },
  RequestRec: {
    screen: RequestRec,
    navigationOptions: {
      headerTitle: 'Request recommendation'
    }
  }
});

export default RootNavigator

