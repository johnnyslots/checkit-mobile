import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './client/components/Home';
import MyLists from './client/components/MyLists';
import Books from './client/components/Books';

const RootNavigator = StackNavigator({
  Main: {
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
  }
});

export default RootNavigator

