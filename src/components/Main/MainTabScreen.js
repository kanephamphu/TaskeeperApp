import React from 'react';
import {
    Text,View,TouchableOpacity,StyleSheet,TextInput
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';  
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Home from '../Home/Home';
import searchtask from '../Home/SearchTask'
import searchuser from '../Home/SearchUser';
import MesagePerson from '../Message/MesagePerson'
import News from '../New/News';
import Map from '../Map/Map';
import Menu from '../Menu/Menu';
import Homeuser from '../HomeUser';
import HomePayment from '../Menu/mainPayment/HomePayment'
import history from '../Menu/HistoryJob';
import test from '../test';
import Detail from '../Home/Detail';
import update from '../Menu/ChangeProfileUser';
import ProfileUser from '../ProfileUser2';
import taskpage from '../Menu/TaskPage';
import HomeApply from '../Menu/mainApply/HomeApply';
import {createStackNavigator} from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons'; 
import Listrecommend from '../Home/Listrecommend';
import Search from '../Home/Search';
import Listfollower from '../Home/Listfollower'
import Savetask from '../Menu/mainSave/Savetask'
import Notice from '../Notice/Notice'
import Message from '../Message/Message'
import SearchMessage from '../Home/SearchMessage'
const HomeStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
    initialRouteName="Home"
    activeColor="#2d7474"
    inactiveColor="#add2c9"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Notice') {
          iconName = focused
            ? 'ios-notifications'
            : 'ios-notifications-outline';
        } 

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={26} color='#2d7474'/>;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
     <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "Home" ,
        tabBarColor:'#faf9f9',
        tabBarIcon: ({ color}) => (
            <Ionicons name="ios-home" size={26} color={color} />     
        ),
      }}
    />
      <Tab.Screen
      name="News"
      component={News}
      options={{
        tabBarLabel:"New",
        tabBarColor:'#faf9f9',
        tabBarIcon: ({ color }) => (
            <FontAwesome5 name="newspaper" size={26} color={color} />
        ),
      }}
    />
     <Tab.Screen
      name="Map"
      component={MapStackScreen}
      options={{
        tabBarLabel:"Map",
        tabBarColor:'#faf9f9',
        tabBarIcon: ({ color }) => (
            <FontAwesome5 name="map-marked-alt" size={26} color={color} />
        ),
      }}
    />
     <Tab.Screen
      name="Notice"
      component={Notice}
      options={{
        tabBarLabel: "Notice",
        tabBarColor:'#faf9f9',
      }}
    />
     <Tab.Screen
      name="Menu"
      component={MoreStackScreen}
      options={{
        tabBarLabel: "Menu",
        tabBarColor:'#faf9f9',
        tabBarIcon: ({ color }) => (
          <Entypo name="menu" size={26} color={color} />
        
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
        name="searchtask"
        component={searchtask}
        options={{headerShown: false}}
      />
       <HomeStack.Screen
        name="searchuser"
        component={searchuser}
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
       <HomeStack.Screen
        name="Listfollower"
        component={Listfollower}
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
        name="HomeApply"
        component={HomeApply}
        options={{headerShown: false}}
      />
       <HomeStack.Screen
        name="HomePayment"
        component={HomePayment}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="update"
        component={update}
        options={{headerShown: false}}
      />
       <HomeStack.Screen
        name="Savetask"
        component={Savetask}
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
       <HomeStack.Screen
        name="MesageStackScreen"
        component={MesageStackScreen}
        options={{headerShown: false}}
      />
       <HomeStack.Screen
        name="SearchMessage"
        component={SearchMessage}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};
const MesageStackScreen = ({navigation}) => {
  return(
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
        name="Message"
        component={Message}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="MesagePerson"
        component={MesagePerson}
        options={{headerShown: false}}
      />
      </HomeStack.Navigator>
  )
}
