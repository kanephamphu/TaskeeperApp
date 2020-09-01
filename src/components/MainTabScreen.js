import React from 'react';
import {
    Text,View,TouchableOpacity,StyleSheet,TextInput
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';  
import Home from './Home';
import News from './News';
import Map from './Map';
import Bell from './Bell';
import Menu from './Menu';
import Homeuser from './HomeUser';
import history from './HistoryJob';
import test from './test';
import Detail from './Detail';
import update from './ChangeProfileUser';
import ProfileUser from './ProfileUser2';
import taskpage from './TaskPage';
import {createStackNavigator} from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons'; 
import Listrecommend from './Listrecommend';
const HomeStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
    initialRouteName="Home"
    activeColor="#ffff"
    inactiveColor='#ffff'
   
  >
     <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: <Text style={{ fontSize: 15, color: 'black',fontWeight:'bold'}}> Home </Text>,
        tabBarColor:'#ffff',
        tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" size={24} color="#009387" />
        ),
      }}
    />
      <Tab.Screen
      name="News"
      component={News}
      options={{
        tabBarLabel: <Text style={{ fontSize: 15, color: 'black',fontWeight:'bold'}}> News </Text>,
        tabBarColor:'#ffff',
      
        tabBarIcon: ({ color }) => (
            <FontAwesome5 name="newspaper" size={24} color="#009387" />
        ),
      }}
    />
     <Tab.Screen
      name="Map"
      component={MapStackScreen}
      options={{
        tabBarLabel: <Text style={{ fontSize: 15, color: 'black',fontWeight:'bold'}}> Map </Text>,
        tabBarColor:'#ffff',
        tabBarIcon: ({ color }) => (
            <FontAwesome5 name="map-marked-alt" size={24} color="#009387" />
        ),
      }}
    />
     <Tab.Screen
      name="test"
      component={test}
      options={{
        tabBarLabel: <Text style={{ fontSize: 15, color: 'black',fontWeight:'bold'}}> Notice </Text>,
        tabBarColor:'#ffff',
        tabBarIcon: ({ color }) => (
            <Ionicons  name="md-notifications" size={24} color="#009387" />
        ),
      }}
    />
     <Tab.Screen
      name="Menu"
      component={MoreStackScreen}
      options={{
        tabBarLabel: <Text style={{ fontSize: 15, color: 'black',fontWeight:'bold'}}>Menu</Text>,
        tabBarColor:'#ffff',
        tabBarIcon: ({ color }) => (
          <Ionicons name="ios-menu" size={24} color="#009387" />
        
        ),
      }}
    />
  </Tab.Navigator>
)
export default MainTabScreen;
const styles = StyleSheet.create({
  searching:{
    backgroundColor:'white',
    borderRadius:4,
    borderWidth:1,
    color:'black',
    ...Platform.select({
      ios: {
        width:310,
        height:35
      },
      android: {
        width:310,
        height:35
      },
      default: {
        // other platforms, web for example
      }
    })
  },
})
const HomeStackScreen = ({navigation}) => {
  
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
         
          elevation: 0, // Android
        },
      
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
       <HomeStack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
       <HomeStack.Screen
        name="Listrecommend"
        component={Listrecommend}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};
const MapStackScreen = ({navigation}) => {
  
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
         
          elevation: 0, // Android
        },
      
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Map"
        component={Map}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};
const MoreStackScreen = ({navigation}) => {
  
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
         
          elevation: 0, // Android
        },
      
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Menu"
        component={Menu}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ProfileUser"
        component={ProfileUser}
        options={{headerShown: false}}
      />
       <HomeStack.Screen
        name="Homeuser"
        component={Homeuser}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="update"
        component={update}
        options={{headerShown: false}}
      />
       <HomeStack.Screen
        name="history"
        component={history}
        options={{headerShown: false}}
      />
       <HomeStack.Screen
        name="taskpage"
        component={taskpage}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};
