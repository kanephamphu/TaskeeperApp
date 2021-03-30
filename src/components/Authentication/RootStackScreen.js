import React ,{ Component } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LandingPage from "./LandingPage";
import Login from "./Login";
import Register from "./Register";
import MainTabScreen from "../Main/MainTabScreen";
import Loadingscene from './LoadingScrene'
import { TextInput, StyleSheet } from "react-native";
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import * as actions from '../../actions';
const RootStack = createStackNavigator();
class RootStackScreen extends Component {

    componentDidMount = () => {
      console.log(this.props.login);
    }
    
  render() {
    console.log(this.props.login);
    return (
      <RootStack.Navigator headerMode="none">
           <RootStack.Screen
            name="Loadingscene"
            component={Loadingscene}
            hideNavBar={true}
            options={{ headerShown: false }}
          />
        
            <RootStack.Screen
            name="Login"
            component={Login}
            hideNavBar={true}
            options={{ headerShown: false }}
          />
      
          <RootStack.Screen
          name="Taskeeper"
          component={MainTabScreen}
          hideNavBar={true}
          options={{ headerShown: false }}
        />
      
        <RootStack.Screen
          name="Register"
          component={Register}
          hideNavBar={true}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        login:state.authentication.token,
    }
  }
  const mapDispatchProps=(dispatch,props)=>{
    return {
        onLogin:(token)=>{
            dispatch(actions.onLogin(token));
        },
    }
  }
export default connect(mapStateToProps,mapDispatchProps)(RootStackScreen);
