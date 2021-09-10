import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {BookContext} from '../App';
import {Image} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

const Cart = ({navigation}) => {
  const user = auth().currentUser;
  const {items, setItems} = useContext(BookContext);
  const [total, setTotal] = useState(0);
  const [Book, setBook] = useState({});

  useEffect(() => {
    setCart(items);
    {
      let cost = items.map(e => Number(e.price));
      if (items.length > 0) {
        const reducer = (accumulator, curr) => accumulator + curr;
        let totalCost = cost.reduce(reducer);
        setTotal(totalCost);
        setBook(items.map(e => [{id: e.id, title: e.title}]));
      }
      null;
    }
    console.log(items);
  }, [items]);

  const [cart, setCart] = useState([]);

  const removeFromCart = ({item}) => {
    let hardCopy = [...items];
    hardCopy = hardCopy.filter(e => e.id !== item.id);

    setCart(hardCopy);
    setItems(hardCopy);
  };

  const Header = () => {
    return (
      <View
        style={{
          marginTop: 20,
          height: 100,
          width: '100%',
          justifyContent: 'space-between',
          padding: 15,
          backgroundColor: '#fff',
        }}>
        <Text style={{fontSize: 25, fontWeight: '700'}}>Shopping Cart</Text>
        <Text style={{textAlign: 'right', fontWeight: '700', fontSize: 15}}>
          Amount
        </Text>
      </View>
    );
  };

  if (Object.keys(cart).length === 0) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <Text>Hmmm!...Looking Empty Here</Text>
      </View>
    );
  }
  {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Header />
        <FlatList
          data={cart}
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: '#fff',
            padding: 10,
            height: '100%',
            width: '100%',
            paddingBottom: 30,
          }}
          key={items.id}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  marginVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Image
                      resizeMode="contain"
                      source={{
                        uri: item.imageUri,
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
                        {item.title}
                      </Text>
                      <TouchableOpacity
                        delayPressIn={0}
                        style={{padding: 10}}
                        onPress={() => {
                          removeFromCart({item});
                        }}>
                        <Ionicons
                          name="trash-outline"
                          size={25}
                          color={'#000'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <Text
                  style={{
                    alignSelf: 'flex-start',
                    margin: 10,
                    fontWeight: '700',
                    fontSize: 18,
                    color: '#696969',
                  }}>
                  Rs. {item.price}
                </Text>
              </View>
            );
          }}
        />
        <View
          style={{
            height: 200,
            width: '100%',
            borderTopStartRadius: 15,
            borderTopEndRadius: 15,
            backgroundColor: '#D3D3D3',
            padding: 20,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: '700',
              textAlign: 'left',
              alignSelf: 'flex-start',
            }}>
            Num of Books : {cart.length}
          </Text>
          <Text style={{fontSize: 25, fontWeight: '700'}}>
            Total Price : {total}
          </Text>
          <TouchableOpacity
            onPress={async () => {
              const article = {
                name: user.displayName,
                total: total,
                books: Book,
              };
              const response = await axios
                .post(' https://api.tago.care/assignment/', article)
                .catch(e => alert(e));
              ToastAndroid.show(
                'The Books have been successfully Ordered!!',
                ToastAndroid.SHORT,
              );
              console.log(response);
            }}
            style={{
              height: 56,
              width: '80%',
              backgroundColor: '#000',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
              alignSelf: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default Cart;

const styles = StyleSheet.create({});
