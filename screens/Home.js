import React from 'react';

import auth from '@react-native-firebase/auth';
import {StyleSheet, Text, View, Button, ScrollView} from 'react-native';

const Home = () => {
  const user = auth().currentUser;
  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        flex: 1,
        padding: 20,
      }}
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <Text style={{fontSize: 25, fontWeight: '700'}}>
        Hi, {user.displayName}
      </Text>
      <View>
        <Button title="Sign out" onPress={() => auth().signOut()} />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
