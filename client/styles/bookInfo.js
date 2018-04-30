import { StyleSheet } from 'react-native';

const bookInfoStyles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
  header: {
    textAlign: 'center',
    textAlignVertical: "center",
    fontWeight: 'bold',
    paddingTop: '20%',
    paddingBottom: '20%',
    fontSize: 40
  },
  button: {
    backgroundColor: '#2C4E91',
    margin: '2%',
    justifyContent: 'center',
    borderRadius: 10,
    height: 70,
    paddingTop: '5%'
  },
  text: {
    fontSize: 20,
    margin: '2%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  hyperLink: {
    color: 'blue',
    fontSize: 20,
    margin: '5%'
  }
})

export default bookInfoStyles;
