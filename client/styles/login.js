import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
  header: {
    textAlign: 'center',
    textAlignVertical: "center",
    fontWeight: 'bold',
    paddingTop: '40%',
    paddingBottom: '20%',
    fontSize: 40
  },
  inputContainer: {
    marginBottom: '5%'
  },
  input: {
    marginTop: '5%'
  },
  button: {
    backgroundColor: '#2C4E91',
    margin: '2%',
    justifyContent: 'center',
    borderRadius: 10,
    height: 70,
    paddingTop: '1%'
  }
})

export default loginStyles;
