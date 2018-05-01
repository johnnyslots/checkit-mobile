import { StyleSheet } from 'react-native';

const sendRecStyles = StyleSheet.create({
  header: {
    textAlign: 'center',
    textAlignVertical: "center",
    fontWeight: 'bold',
    paddingTop: '15%',
    paddingBottom: '10%',
    fontSize: 30
  },
  recSent: {
    marginLeft: '5%',
    marginRight: '5%',
    paddingBottom: '5%',
  },
  input: {
    marginLeft: '5%',
    marginRight: '5%'
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

export default sendRecStyles;
