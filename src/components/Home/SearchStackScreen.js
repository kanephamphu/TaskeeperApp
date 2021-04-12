import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchTask from './Homesearch/SearchTask';
import SearchUser from './Homesearch/SearchUser';
import Search from '../Home/Search'
import { View } from 'react-native';
import {socket} from "../../Socket.io/socket.io";
const SearchStack = createStackNavigator();
const SearchStackScreen = ({ navigation }) => {

  return (

    <SearchStack.Navigator
      screenOptions={{

        headerStyle: {

          elevation: 0, // Android
        },

        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="SearchTask"
        component={SearchTask}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="SearchUser"
        component={SearchUser}
        options={{ headerShown: false }}
      />
    </SearchStack.Navigator>
  );
};
export default SearchStackScreen;