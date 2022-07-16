import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeComponent from './components/HomeComponent';
import ProductsComponent from './components/ProductsComponent';
import BankComponent from './components/BankComponent';

import Colors from '../../globalStyles/colors';

const Tab = createBottomTabNavigator();

const Main = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Produtos') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Banco') {
            iconName = focused ? 'cash' : 'cash-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.color.primary,
        tabBarInactiveTintColor: 'gray',
      })}
      initialRouteName="Home">
      <Tab.Screen name="Produtos" component={ProductsComponent} />
      <Tab.Screen name="Home" component={HomeComponent} />
      <Tab.Screen name="Banco" component={BankComponent} />
    </Tab.Navigator>
  );
};

export default Main;
