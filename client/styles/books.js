import { StyleSheet } from 'react-native';

const booksStyles = StyleSheet.create({
  // container: {
  //     flex: 1,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     backgroundColor: '#E6DE9C',
  // }
  header: {
    textAlign: 'center',
    textAlignVertical: "center",
    fontWeight: 'bold',
    paddingTop: '20%',
    paddingBottom: '10%',
    fontSize: 40
  },
  addBookInput: {
    textAlignVertical: "center",
    borderBottomColor: 'black',
  },
  title: {

  },
  button: {
    backgroundColor: '#2C4E91',
    // margin: '2%',
    marginBottom: '5%',
    marginTop: '3%',
    justifyContent: 'center',
    borderRadius: 10,
    height: 20,
    paddingBottom: '10%'
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: "center",
    paddingBottom: '8%'
  }
})

export default booksStyles;
