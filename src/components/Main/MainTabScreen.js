import React from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, TextInput
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 
import Home from '../Home/Home';
import searchtask from '../Home/Homesearch/SearchTask'
import searchuser from '../Home/Homesearch/SearchUser';
import MesagePerson from '../Message/MesagePerson'
import Map from '../Map/Map';
import Menu from '../Menu/Menu';
import HomePayment from '../Menu/mainPayment/HomePayment'
import history from '../Menu/HistoryJob';
import test from '../test';
import Detail from '../Home/Detail';
import update from '../Menu/ChangeProfileUser';
import ProfileUser from '../HomeUser';
import taskpage from '../Menu/TaskPage';
import HomeApply from '../Menu/mainApply/HomeApply';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import Listrecommend from '../Home/Listrecommend';
import Search from '../Home/Search';
import Listfollower from '../Menu/ListFollower'
import Savetask from '../Menu/mainSave/Savetask';
import Notice from '../Notice/Notice'
import Message from '../Message/Message'
import SearchMessage from '../Home/SearchMessage'
import FlatListdata from '../Home/Listdata/FlatListdata'
import HomeSearch from '../Home/Homesearch/Homesearch'
import Posttask from '../PostTask';
import Update from '../ChangeProfileUser';
import Updateprofile from '../Updateprofile/Updateprofile';
import Education from '../Updateprofile/Education';
import Homeupdate from '../Updateprofile/Homeupdate';
import Profilefriend from '../Home/Profilefriend/Profilefriend';
import historyjobfriend from '../Home/Profilefriend/Historyjobfriend';
import Detailprofile from '../Home/Profilefriend/Detailprofile'
import Ewallet from '../Menu/eWallet/Ewallet';
import Connectbank from '../Menu/eWallet/Connectbank';
import Addnewcard from '../Menu/eWallet/Addnewcard';
import Transfer from '../Menu/eWallet/Transfers'
import Setamount from '../Menu/eWallet/Setamount';
import Bankkinglink from '../Menu/eWallet/Bankkinglink'
import mmm from '../Manage/test'
import Jobs from '../Manage/Jobs';
import HomeManageCandidate from '../Manage/HomeManageCandidate';
import DetailCandidates from '../Manage/DetailCandidates';
import HomeManageJobs from '../Manage/HomeManageJobs';
import HistoryJobs from '../Manage/HistoryJobs';
import RenderItem from '../Manage/RenderItem';
import io from 'socket.io-client/dist/socket.io'
import AsyncStorage from '@react-native-community/async-storage';
import {socket} from "../../Socket.io/socket.io";
const HomeStack = createStackNavigator();
var e;
const Tab = createMaterialBottomTabNavigator();
export default class MainTabScreen extends React.Component{
  constructor(props){
    super(props)
    e=this;
    this.state={
      numbernotice:''
    }
    this.redNotification=this.redNotification.bind(this)
    socket.on("sv-get-total-unread-notification",function(data){
        e.setState({
          numbernotice:data.data
        })
        
    })
  }

  componentDidMount = async () => {
    
   this.redNotification()
 
  }

   redNotification= async () =>{
    const token = await AsyncStorage.getItem('token');
    const unread={
      secret_key:token
    }
    socket.emit("cl-get-total-unread-notification",unread);
    console.log(unread)
  }
  render(){
    return (    
      <Tab.Navigator
      initialRouteName="Home"
      activeColor="#2d7474"
      inactiveColor="#add2c9"
      /*screenOptions={({ route }) => ({
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
      })}*/
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarColor: '#faf9f9',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ManageStackScreen"
        component={ManageStackScreen}
        options={{
          tabBarLabel: "Manage",
          tabBarColor: '#faf9f9',
          tabBarIcon: ({ color }) => (
            <Fontisto name="persons" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Map"
        component={MapStackScreen}
        options={{
          tabBarLabel: "Map",
          tabBarColor: '#faf9f9',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="map-marked-alt" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NoticeStackScreen"
        component={NoticeStackScreen}
        options={{
          tabBarLabel: "Notice",
          tabBarColor: '#faf9f9',
          tabBarIcon: ({ color }) => (

            <View style={{position:'relative'}}>
              <Ionicons name="ios-notifications" size={28} color={color} />
              {this.state.numbernotice=='0'?null:
              <View style={{width:13,height:13,borderRadius:100,backgroundColor:'red',
              position: 'absolute',top:0,right:0,justifyContent: 'center',alignItems: 'center'}}>
                <Text style={{color:'white',fontSize:11}}>{this.state.numbernotice}</Text>
              </View> 
              }
             
            </View>
      
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MoreStackScreen}
        options={{
          tabBarLabel: "Menu",
          tabBarColor: '#faf9f9',
          tabBarIcon: ({ color }) => (
            <Entypo name="menu" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  searching: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    color: 'black',
    ...Platform.select({
      ios: {
        width: 310,
        height: 35
      },
      android: {
        width: 310,
        height: 35
      },
      default: {
        // other platforms, web for example
      }
    })
  },
})
const HomeStackScreen = ({ navigation }) => {

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
        options={{ headerShown: false }}


      />
      <HomeStack.Screen
        name="HomeSearch"
        component={HomeSearch}
        options={{ headerShown: false }}


      />
        <HomeStack.Screen
        name="Detailprofile"
        component={Detailprofile}
        options={{ headerShown: false }}


      />
       <HomeStack.Screen
        name="historyfriend"
        component={historyjobfriend}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="MessageHome"
        component={Message}
        options={{ headerShown: false }}
      />
       <HomeStack.Screen
        name="Profilefriend"
        component={Profilefriend}
        options={{ headerShown: false }}
      />
       <HomeStack.Screen
        name="MesagePersonHome"
        component={MesagePerson}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Detail"
        component={Detail}
        options={{ headerShown: false }}
      />
       <HomeStack.Screen
        name="Detailtoo"
        component={Detail}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="searchtask"
        component={searchtask}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="searchuser"
        component={searchuser}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="Listrecommend"
        component={Listrecommend}
        options={{ headerShown: false }}
      />
     
      <HomeStack.Screen
        name="ProfileUser"
        component={ProfileUser}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};
const MapStackScreen = ({ navigation }) => {

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
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="DetailMap"
        component={Detail}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};
const ManageStackScreen = ({ navigation }) => {

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
        name="HomeManageCandidate"
        component={HomeManageCandidate}
        options={{ headerShown: false }}
      />
       <HomeStack.Screen
        name="DetailCandidates"
        component={DetailCandidates}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="detailjobs"
        component={Detail}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Profilefriendmanage"
        component={Profilefriend}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
      name="HomeManageJobs"
      component={HomeManageJobs}
      options={{ headerShown: false }}
      />
      <HomeStack.Screen
      name="HistoryJob"
      component={HistoryJobs}
      options={{ headerShown: false }}
      />
      <HomeStack.Screen
      name="Jobs"
      component={Jobs}
      options={{ headerShown: false }}
      />
       <HomeStack.Screen
      name="RenderItem"
      component={RenderItem}
      options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
    
  );
};
const NoticeStackScreen = ({ navigation }) => {

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
        name="Notice"
        component={Notice}
        options={{ headerShown: false }}
      />
       <HomeStack.Screen
        name="Profilefriendnotice"
        component={Profilefriend}
        options={{ headerShown: false }}
      />
        <HomeStack.Screen
        name="HomeManageCandidate"
        component={HomeManageCandidate}
        options={{ headerShown: false }}
      />
       <HomeStack.Screen
        name="DetailCandidates1"
        component={DetailCandidates}
        options={{ headerShown: false }}
      />
       <HomeStack.Screen
        name="Detailnotice"
        component={Detail}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};
const MoreStackScreen = ({ navigation }) => {

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
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ProfileUser"
        component={ProfileUser}
        options={{ headerShown: false }}
      />
       <HomeStack.Screen
        name="Posttask"
        component={Posttask}
        options={{ headerShown: false }}
      />
    
       <HomeStack.Screen
        name="Detailmenu"
        component={Detail}
        options={{ headerShown: false }}
      />
       <HomeStack.Screen
        name="Ewallet"
        component={Ewallet}
        options={{ headerShown: false }}
      />
        <HomeStack.Screen
        name="Bankkinglink"
        component={Bankkinglink}
        options={{ headerShown: false }}
      />
       <HomeStack.Screen
        name="Setamount"
        component={Setamount}
        options={{ headerShown: false }}
      />
       <HomeStack.Screen
        name="Transfer"
        component={Transfer}
        options={{ headerShown: false }}
      />
       <HomeStack.Screen
        name="Addnewcard"
        component={Addnewcard}
        options={{ headerShown: false }}
      />
       <HomeStack.Screen
        name="Connectbank"
        component={Connectbank}
        options={{ headerShown: false }}
      />
       <HomeStack.Screen
        name="Update"
        component={Update}
        options={{ headerShown: false }}
      />
      
       <HomeStack.Screen
        name="Updateprofile"
        component={Updateprofile}
        options={{ headerShown: false }}
      />
       <HomeStack.Screen
        name="Homeupdate"
        component={Homeupdate}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Education"
        component={Education}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="HomeApply"
        component={HomeApply}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="HomePayment"
        component={HomePayment}
        options={{ headerShown: false }}
      />
        <HomeStack.Screen
        name="Listfollower"
        component={Listfollower}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="update"
        component={update}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Savetask"
        component={Savetask}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="history"
        component={history}
        options={{ headerShown: false }}
      />
       <HomeStack.Screen
        name="Profilefriendmenu"
        component={Profilefriend}
        options={{ headerShown: false }}
      />
     
      <HomeStack.Screen
        name="taskpage"
        component={taskpage}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="SearchMessage"
        component={SearchMessage}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};
