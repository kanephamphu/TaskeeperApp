import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet} from 'react-native';
import {Router,Scene} from 'react-native-router-flux';
import loadingscene from './src/components/Loadingscene'
import login from './src/components/Login'
import register from './src/components/Register'
import Navigator from './src/routes/homeStack'
import home from './src/components/Homepage';
import io from 'socket.io-client/dist/socket.io'
import Authentication from './src/components/Authentication/Authentication'
import Changeinfo from './src/components/Changeinfo/Changeinfo'
import Main from './src/components/Main/Main'
import Orderhistory from './src/components/OrderHistory/Orderhistory'

export default class App extends Component{
  constructor(props){
    super(props)
    this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
  }
  render(){
    return (  
      //<Navigator/>
     <Router>
        <Scene key='root'>
          <Scene key='loadingscene' component={loadingscene} initial={true} hideNavBar={true}></Scene>
          <Scene key='login' component={login} hideNavBar={true}></Scene>
          <Scene key='home' component={home} hideNavBar={true}></Scene>
          <Scene key='register' component={register} hideNavBar={true}></Scene>
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
