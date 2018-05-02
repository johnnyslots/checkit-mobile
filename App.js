import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './client/components/Login';
import Home from './client/components/Home';
import MyLists from './client/components/MyLists';
import Books from './client/components/Books';
import SendRec from './client/components/SendRec';
import RequestRec from './client/components/RequestRec';
import PendingRecs from './client/components/PendingRecs';
import BookInfo from './client/components/BookInfo';

const RootNavigator = StackNavigator({
  Main: {
      screen: Login,
      navigationOptions: {
        header: false,
      }
  },
  Home: {
      screen: Home,
      navigationOptions: {
        header: false,
      }
  },
  MyLists: {
    screen: MyLists,
    navigationOptions: {
      headerTitle: 'My Lists'
    }
  },
  PendingRecs: {
    screen: PendingRecs,
    navigationOptions: {
      headerTitle: 'My pending recommendation'
    }
  },
  Books: {
    screen: Books,
    navigationOptions: {
      headerTitle: 'Books'
    }
  },
  BookInfo: {
    screen: BookInfo,
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

