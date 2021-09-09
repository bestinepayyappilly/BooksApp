import React, {useContext} from 'react';
import {StyleSheet, Text, View, Button, StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import Cart from './Cart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import ItemPage from './ItemPage';
import {BookContext} from '../App';
import {Badge} from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavBar = () => {
  const {items} = useContext(BookContext);
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: '#000',
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Ionicons name="home" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({color}) => (
            <View>
              {Object.keys(items).length !== 0 ? (
                <Badge
                  containerStyle={{position: 'absolute', right: -6, top: -5}}
                  badgeStyle={{
                    backgroundColor: 'orange',
                  }}
                />
              ) : null}
              <Ionicons name="cart" size={25} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={AppNavBar} />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'modal', headerTitle: ''}}>
        <Stack.Screen name="ItemPage" component={ItemPage} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const Authenticated = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <HomeStack />
    </NavigationContainer>
  );
};

export default Authenticated;

const styles = StyleSheet.create({});
