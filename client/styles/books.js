import { StyleSheet } from 'react-native';

const booksStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: '20%',
    paddingBottom: '10%',
    fontSize: 40
  },
  addBookInput: {
    paddingLeft: '5%',
    textAlignVertical: "center",
    borderBottomColor: 'black'
  },
  title: {
    paddingLeft: '5%'
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
  },
  listContainer: {
    marginRight: '3%'
  }
})

export default booksStyles;
