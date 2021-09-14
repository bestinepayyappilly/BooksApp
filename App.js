import React, {useEffect, useState, createContext} from 'react';
import Authentication from './screens/Authentication';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Authenticated from './screens/Authenticated';
import {ToastAndroid, View} from 'react-native';

//state-management-goals :)
export const BookContext = createContext();

export default function App() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(false);

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '339633451397-qpqlkbshv2v1spkjqcjq0ffdlo3qjgel.apps.googleusercontent.com',
    });
  }, []);

  //calling-google-signIn-api
  const onGoogleButtonPress = async () => {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch {
      error => {
        alert(error);
      };
    }
  };

  //checking-if-user-signed-in-or-signed-out
  auth().onAuthStateChanged(user => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  if (authenticated) {
    return (
      <BookContext.Provider value={{items, setItems}}>
        {ToastAndroid.show('Logged In!', ToastAndroid.SHORT)}
        <Authenticated />
      </BookContext.Provider>
    );
  }

  return <Authentication onGoogleButtonPress={onGoogleButtonPress} />;
}
