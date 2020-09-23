import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,TextInput,FlatList,Image,ScrollView, Dimensions,LinearGradient,SafeAreaView} from 'react-native'
import jwt_decode from 'jwt-decode'
import io from 'socket.io-client/dist/socket.io'
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import AsyncStorage from '@react-native-community/async-storage';
const {height,width} =Dimensions.get('window');
class Detail extends Component{
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
               key:'1',
               name:'Business Analyst',
               image:require('../../images/fourdigit.png'),
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
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Home")}>
                         <Ionicons style={{marginTop:1,marginRight:15}} name="ios-arrow-back" size={28} color="#71B7B7" />
                    </TouchableOpacity>                                             
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
                <ScrollView>
                    <View style={{marginLeft:10,marginTop:10,width:150,borderBottomWidth:2,borderBottomColor:'#71B7B7'}}>
                       <Text style={{fontWeight:'bold',fontSize:18,color:'#71B7B7',fontStyle:'italic'}}>List Recommend</Text>
                   </View>
                    <View style={{marginTop:10}}>                      
                                {this.state.data.map(task=><Bulletin  name={task.name}
                                image={task.image}
                                location={task.location}
                                />)}               
                    </View>  
                </ScrollView>                             
                    
            </View>
               
           
        )
    }
}
const Bulletin=({key ,name,image,location})=>{
    return(
       
       
             <View style={{backgroundColor:'#71B7B7',
            
            marginHorizontal:10,
            marginVertical:10,
            borderRadius:8,
            paddingVertical:40,
            paddingHorizontal:15,
            marginTop:30,
            marginBottom:20,
            height:250,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: 'green',
            shadowOpacity: 0.1,
            elevation: 4,
        }}>
            <View style={{marginTop:-60}}> 
                <Image source={image} style={{width:80,marginTop:-10
                    ,height:80,borderRadius:50,}}></Image>
            </View>
            <View style={{flexDirection:'column',flex:1,marginLeft:10,fontWeight:'bold'}}>
                
                <Text style={{fontWeight:'bold',fontSize:25,fontStyle:'italic'}}>{name}</Text>
                <Text >{location}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.iconBulliten}  onPress={() => alert('Follow')}>
                    <AntDesign style={{marginRight:5}} name="pluscircle" size={30} color="#71B7B7" /> 
                    <Text>Follow</Text>
                </TouchableOpacity>         
                <TouchableOpacity style={styles.iconBulliten} onPress={() => alert('Apply')}>
                     <Ionicons style={{marginRight:5}} name="md-checkmark-circle" size={30} color="#71B7B7" />
                     <Text>Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBulliten} onPress={() => alert('save')}>
                    <Entypo style={{marginRight:5}} name="save" size={30} color="#71B7B7" />
                   
                    <Text>Save</Text>
                </TouchableOpacity>                                                    
            </View>
        </View>
       
        
    )
}

export default Detail;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#faf9f9',
    },
    iconBulliten:{
        flexDirection:'row',
        borderRadius:10,
        borderWidth:1,
        height:50,
        width:90,
        alignItems:'center',
        paddingLeft:5,
        marginBottom:-30,
        marginRight:45,
        backgroundColor:'#ffff',
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        borderColor:'#71B7B7'
    },
    nof:{
        backgroundColor:'#71B7B7',
        height:250,
        borderRadius:10,
        marginHorizontal:16,
        marginVertical:15
    },
    image:{
        width:width-30,
        height:height*0.4,     
    },
    texttitle:{
        marginLeft:10,marginTop:20,width:150,borderBottomWidth:2,borderBottomColor:'#71B7B7'
    },
    texttitle1:{
        marginLeft:150,marginTop:20,width:90,borderBottomWidth:2,borderBottomColor:'red'
    },
    header:{
        height:height*0.08, 
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        padding: 10,
        shadowOpacity: 0.2,
        elevation: 1,
        marginTop: Platform.OS == 'android' ? 25 : null,
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
})
