import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Image} from 'react-native-elements';

import {BookContext} from '../App';

//google-books-api
const Url =
  'https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=20';

const FlatListHeader = () => {
  return (
    <View style={{marginTop: 10}}>
      <Text style={{fontSize: 25, fontWeight: '700'}}>List</Text>
    </View>
  );
};

const Header = () => {
  const user = auth().currentUser;
  return (
    <View
      style={{
        backgroundColor: '#fff',
        paddingTop: 15,
        padding: 20,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 25, fontWeight: '700'}}>
          Hi, {user.displayName}!
        </Text>
        <View>
          <TouchableOpacity
            delayPressIn={0}
            style={{
              // backgroundColor: 'orange',
              padding: 5,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
            onPress={() => auth().signOut()}>
            <Text style={{fontWeight: '700', marginHorizontal: 10}}>
              Log Out
            </Text>
            <Ionicons name="exit-outline" size={25} color="orange" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatListHeader />
    </View>
  );
};

const Home = ({navigation}) => {
  const [books, setBooks] = useState([]);
  const {items, setItems} = useContext(BookContext);

  useEffect(async () => {
    //getting-books-from-api
    await axios
      .get(Url)
      .then(response => {
        setBooks(response.data.items);
      })
      .catch(e => alert(e));
  }, []);

  //flatList-renderItem
  const _renderItem = ({item}) => {
    return (
      <View
        style={{
          marginVertical: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          delayPressIn={0}
          style={{flex: 1}}
          onPress={() => navigation.navigate('ItemPage', {book: item})}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={{
                uri: item.volumeInfo.imageLinks.thumbnail,
              }}
              style={{height: 200, width: 150}}
            />
            <View style={{width: '100%'}}>
              <Text
                numberOfLines={3}
                style={{
                  fontSize: 18,
                  width: '50%',
                  fontWeight: '700',
                  margin: 10,
                  alignSelf: 'flex-start',
                }}>
                {item.volumeInfo.title}
              </Text>
              <Text style={{margin: 10, fontWeight: '700', fontSize: 15}}>
                Rs.{' '}
                {Object.keys(item.saleInfo).length === 3
                  ? item.volumeInfo.pageCount
                  : item.saleInfo.listPrice.amount}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          delayPressIn={0}
          disabled={items.every(e => e.id !== item.id) ? false : true}
          onPress={() => {
            setItems([
              ...items,
              {
                item,
                title: item.volumeInfo.title,
                price:
                  Object.keys(item.saleInfo).length === 3
                    ? item.volumeInfo.pageCount
                    : item.saleInfo.listPrice.amount,
                imageUri: item.volumeInfo.imageLinks.thumbnail,
                id: item.id,
              },
            ]);
          }}>
          <Ionicons
            name="add"
            size={40}
            color={items.every(e => e.id !== item.id) ? '#000' : 'orange'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  if (books) {
    return (
      <View style={{flex: 1}}>
        <Header />
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: '#fff',
            padding: 10,
            height: '100%',
            width: '100%',
          }}
          data={books}
          key={books.map(e => e.id)}
          renderItem={_renderItem}
        />
      </View>
    );
  }
  //if-api-is-not-received-yet
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={35} color="orange" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
