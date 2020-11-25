import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import MainTabScreen from '../Main/MainTabScreen';
import {
    TextInput,
    StyleSheet
  } from 'react-native';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="LandingPage" component={LandingPage} hideNavBar={true} options={{headerShown: false}}/>
        <RootStack.Screen name="Login" component={Login} hideNavBar={true} options={{headerShown: false}}/>
        <RootStack.Screen name="Register" component={Register} hideNavBar={true} options={{headerShown: false}}/>
    </RootStack.Navigator>
);

export default RootStackScreen;