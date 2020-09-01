import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Animated,TextInput,FlatList,Image,ScrollView, Dimensions,LinearGradient,SafeAreaView} from 'react-native'
import jwt_decode from 'jwt-decode'
import io from 'socket.io-client/dist/socket.io'
import girl from '../images/abc.png';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Collapsible from 'react-native-collapsible';
import AsyncStorage from '@react-native-community/async-storage';
const {height,width} =Dimensions.get('window');
class test extends Component{
    constructor(props){
        super(props);
        this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
      
        this.state={
            collapsed:true,
        }
    }
    toggleExpanded =() =>{
        this.setState({collapsed:!this.state.collapsed})
    }
    render(){
        return(
           <View>
               <TouchableOpacity onPress={this.toggleExpanded}>
                   <View style={{marginTop:50}}>
                        <Text>
                            minh nha
                        </Text>
                   </View>
               </TouchableOpacity>
               <Collapsible collapsed={this.state.collapsed}>
                   <Animated.View >
                       <Text style={{lineHeight:15}}>
                          sadfsadfasdfsadfasdfasdfasdfsadfsadfasdfasdfsdafasdfsdafasdfưerwqerwqerweqrqwerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrsadfffffffffffffffffffffffffffffffffffffffffffffrteerttttttttttttttttttttttttttttttttttttttttt
                         
                       </Text>
                   </Animated.View>
               </Collapsible>
           </View>
           
        )
    }
}


export default test;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#faf9f9',
    },
   
})
