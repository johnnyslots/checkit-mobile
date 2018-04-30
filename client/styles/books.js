import { StyleSheet } from 'react-native';

const booksStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    // textAlignVertical: "center",
    fontWeight: 'bold',
    paddingTop: '20%',
    paddingBottom: '10%',
    fontSize: 40
  },
  inputContainer: {
    // paddingLeft: '5%',
    // paddingRight: '5%',
    // backgroundColor: 'red'
  },
  addBookInput: {
    paddingLeft: '5%',
    // paddingRight: '10%',
    textAlignVertical: "center",
    borderBottomColor: 'black'
  },
  title: {
    paddingLeft: '3%'
  },
  button: {
    backgroundColor: '#2C4E91',
    margin: '3%',
    justifyContent: 'center',
    borderRadius: 10,
    height: 20,
    paddingBottom: '10%'
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: "center",
    paddingBottom: '8%'
  },
  list: {
    marginBottom: 20,
  }
})

export default booksStyles;
