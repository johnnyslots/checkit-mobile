import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import homeStyles from '../styles/home';

const Home = ({navigation}) => {
  const user = navigation.state.params.user;

  const pages = ['MyLists', 'PendingRecs', 'SendRec', 'RequestRec'];
  const pageTitles = ['My lists', 'Pending recommendations', 'Send recommendation', 'Request recommendation']

  return (
  <View>
    <Text style={homeStyles.header}>CheckIt</Text>
    <View>
      {
        pages.map((page, i) => {
          return (
            <View  key={i}>
              <Button buttonStyle={homeStyles.button} raised large onPress={() => navigation.navigate(page, {user})} title={pageTitles[i]}/>
            </View>
          )

        })
      }
     </View>
  </View>
  )
}

export default Home;
