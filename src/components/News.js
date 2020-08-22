import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,TextInput,FlatList,Image,ScrollView, Dimensions,LinearGradient,SafeAreaView} from 'react-native'
import jwt_decode from 'jwt-decode'
import io from 'socket.io-client/dist/socket.io'
import girl from '../images/abc.png';
import { AntDesign } from '@expo/vector-icons'; 

import AsyncStorage from '@react-native-community/async-storage';
const {height,width} =Dimensions.get('window');
class New extends Component{
    constructor(props){
        super(props);
        this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
      
        this.state={
           first_name:'',
           last_name:'',
           email:'',
           username:'',
           id:'',  
           phone:''   ,   
           secret_key:'',
           data:[{
               
               name:'Business Analyst',
               image:require('../images/fourdigit.png'),
               location:'Da Nang'
           },
            {
              
                name:'Business Analyst',
                image:require('../images/cmc.png'),
                location:'Da Nang'
            },
            {
               
                name:'Business Analyst',
                image:require('../images/nexle.png'),
                location:'Da Nang'
            },{
                
                name:'Business Analyst',
                image:require('../images/taseco.jpg'),
                location:'Da Nang'
            },
           
        ]
        }
     
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{flexDirection:'row',paddingHorizontal:20}}>     
                              <AntDesign name="search1" size={25} color="#71B7B7" style={{marginRight:10,
                                marginLeft:1,top:6}} />                            
                              <TextInput
                                  style={styles.searching}
                                  placeholder="Searching ..." 
                                  placeholderTextColor='#71B7B7'
                                  underlineColorAndroid="transparent"
                                  />  
                                                                                                                                        
                            <AntDesign name="message1" size={30} color="#71B7B7" style={styles.icon} 
                        onPress={() => alert('This is a button!')}
                        />
                    </View>
                    
                </View>
               
            </View>
               
           
        )
    }
}

export default New;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#faf9f9',
    },
  
    header:{
        flex:1,
        height:height*0.08, 
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        padding: 10,
        shadowOpacity: 0.2,
        elevation: 1,
        marginTop: Platform.OS == 'android' ? 30 : null,
        alignItems:'center',
       
    },
    icon:{
        marginLeft:10,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 1,
    },
   
    searching:{
        backgroundColor:'white',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        paddingLeft:15,
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
    text:{
        position:'absolute',
        flexDirection:'row',
        marginTop:20,
        marginLeft:20
      
        
    },
    text1:{
        position:'absolute',
        marginTop:40,
        marginLeft:10
    },
    item:{
        marginTop:10,
        flexDirection:'row',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
    },
    recommend:{
        height:height*0.3, 
        marginTop:10,
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        backgroundColor:'#71B7B7',
        borderRadius:15,
    }
})
