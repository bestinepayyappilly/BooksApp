import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Image} from 'react-native-elements';
import {BookContext} from '../App';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ItemPage = ({route, navigation}) => {
  const {book} = route.params;
  const {items, setItems} = useContext(BookContext);

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: '#fff',
          height: '100%',
          width: '100%',
          padding: 20,
        }}
        contentContainerStyle={{alignItems: 'center'}}>
        <Image
          resizeMode="contain"
          source={{uri: book.volumeInfo.imageLinks.thumbnail}}
          style={{height: 300, width: 300}}
        />
        <Text
          style={{
            marginTop: 30,
            fontWeight: '700',
            fontSize: 25,
            textAlign: 'center',
          }}>
          {book.volumeInfo.title}
        </Text>

        <Text
          style={{
            fontSize: 25,
            marginTop: 20,
            fontWeight: '700',
            color: '#696969',
          }}>
          Rs.{' '}
          {Object.keys(book.saleInfo).length === 3
            ? book.volumeInfo.pageCount
            : book.saleInfo.listPrice.amount}
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginTop: 20,
            fontWeight: '700',
            color: '#696969',
          }}>
          {book.volumeInfo.description}
        </Text>
        {items.every(e => e.id !== book.id) ? null : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Ionicons name="checkbox" size={20} color="orange" />
            <Text
              style={{
                color: 'orange',
                fontSize: 15,
                marginHorizontal: 5,
              }}>
              Item added to cart
            </Text>
          </View>
        )}

        <TouchableOpacity
          delayPressIn={0}
          disabled={items.every(e => e.id !== book.id) ? false : true}
          onPress={() => {
            setItems([
              ...items,
              {
                book,
                title: book.volumeInfo.title,
                price:
                  Object.keys(book.saleInfo).length === 3
                    ? book.volumeInfo.pageCount
                    : book.saleInfo.listPrice.amount,
                imageUri: book.volumeInfo.imageLinks.thumbnail,
                id: book.id,
              },
            ]);
          }}
          style={{
            height: 50,
            width: '80%',
            backgroundColor: '#000',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 30,
          }}>
          <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>
            Add to cart
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemPage;

const styles = StyleSheet.create({});
