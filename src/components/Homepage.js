import React,{Component} from 'react'
import {View,Text,StyleSheet,Animated,Image,ActivityIndicator,ImageBackground} from 'react-native'
import {Actions} from 'react-native-router-flux'
import jwt_decode from 'jwt-decode'
class home extends Component{
    constructor(){
        super();
        this.state={
            first_name: '',
            last_name: '',
            email:'',
            errors:{}
        }
    }
    
    render(){
        return(
            <View>
                <Text>{this.state.first_name}</Text>
                <Text>{this.state.last_name}</Text>
                <Text>{this.state.email}</Text>
            </View>
        )
    }
}
export default home;
