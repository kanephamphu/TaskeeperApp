import React from 'react';
import {
  TextInput,Text,
  StyleSheet
} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import MainTabScreen from './src/components/Main/MainTabScreen';
import LandingPage from './src/components/Authentication/LandingPage';
import Login from './src/components/Authentication/Login';
import Register from './src/components/Authentication/Register';
import LoadingScrene from "./src/components/Authentication/LoadingScrene";
import io from 'socket.io-client/dist/socket.io'
import { View } from 'react-native-animatable';

var e;
const Stack = createStackNavigator();
export default class App extends React.Component{
  constructor(props){
    super(props)
    e=this;
    this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
  }
  render(){
    return (  
      <NavigationContainer>    
        <Stack.Navigator>
          <Stack.Screen name="LoadingScrene" component={LoadingScrene} hideNavBar={true} options={{headerShown: false}}/>
          <Stack.Screen name="LandingPage" component={LandingPage} hideNavBar={true} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={Login} hideNavBar={false} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={Register} hideNavBar={true} options={{headerShown: false}}/>
          <Stack.Screen name="Taskeeper" component={MainTabScreen}  options={{headerShown: false}}/>  
      </Stack.Navigator>     
      </NavigationContainer>
    );
  }
}

  const styles = StyleSheet.create({
    searching:{
      backgroundColor:'white',
      borderRadius:4,
     
      borderWidth:1,
      color:'black',
      ...Platform.select({
        ios: {
          width:250,
          height:35
        },
        android: {
          width:300,
          height:35
        },
        default: {
          // other platforms, web for example
        }
      })
    },
  })