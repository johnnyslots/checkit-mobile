import { StyleSheet } from 'react-native';

const pendingRecsStyles = StyleSheet.create({
  container: {
    marginTop: '5%'
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: '3%',
    paddingBottom: '3%',
    fontSize: 30
  },
  backButton: {
    backgroundColor: 'grey',
    margin: '2%',
    justifyContent: 'center',
    borderRadius: 10,
    height: 15,
    paddingTop: '5%',
  },
  button: {
    backgroundColor: '#2C4E91',
    margin: '2%',
    justifyContent: 'center',
    borderRadius: 10,
    height: 15,
    paddingTop: '5%'
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: "center",
    paddingBottom: '18%'
  },
  textContainer: {
    alignItems: 'center'
  },
  text: {
    fontSize: 15,
    margin: '1%',
    marginLeft: '5%',
    marginRight: '5%'
  }
})

export default pendingRecsStyles;
