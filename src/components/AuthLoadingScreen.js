import React from 'react';
import {
  TextInput,Text,
  StyleSheet,View,ActivityIndicator
} from 'react-native';
import io from 'socket.io-client/dist/socket.io'
import AsyncStorage from '@react-native-community/async-storage';
class AuthLoadingScreen extends React.Component{
    constructor(props){
      super(props);
      this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
     

      this._loadData();
    }
    _loadData=async()=>{
      const token = AsyncStorage.getItem('token')
      this.props.navigation.navigate(token!==null?'LoadingScrene':'Taskeeper')
    }
    render(){
      return(
        <View style={styles.contaiber}>
          <ActivityIndicator/>
        </View>
      )
    }
  }
export default AuthLoadingScreen;
const styles = StyleSheet.create({
    contaiber:{
      flex:1,
      justifyContent:'center',
      alignContent:'center'
    },
   
  })