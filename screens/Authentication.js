import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

const Authentication = props => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 70, fontWeight: '700'}}> Welcome</Text>
      <GoogleSigninButton
        style={{height: 50, width: '90%'}}
        onPress={props.onGoogleButtonPress}
      />
    </View>
  );
};

export default Authentication;

const styles = StyleSheet.create({});
